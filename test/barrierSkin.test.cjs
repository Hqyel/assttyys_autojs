// 仓库根目录执行：node test/barrierSkin.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('../node_modules/typescript');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const compile = text => ts.transpileModule(text, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;
function evaluate(text, context = {}) {
  const exports = {};
  vm.runInNewContext(compile(text), {
    exports, require: () => ({}), console: { log() {} }, ...context
  });
  return exports;
}
const skin = evaluate(read('src/common/barrierSkin.ts'));
const ast = ts.createSourceFile('script.ts', read('src/system/script.ts'),
  ts.ScriptTarget.Latest, true);
const cls = ast.statements.find(node =>
  ts.isClassDeclaration(node) && node.name.text === 'Script');
const method = cls.members.find(node =>
  node.name?.getText(ast) === 'getBarrierOperators');
const Reader = evaluate('export class Reader {' + method.getText(ast) + '}', {
  GetBarrierSkinOverrides: skin.GetBarrierSkinOverrides
}).Reader;
let selected = '默认结界';
const reader = new Reader();
reader.getBarrierSkinName = () => selected;
reader.helperBridge = {
  getHelper: () => ({ GetCmpColorArray: (_w, _h, points) =>
    points.map(([_anchor, x, y, color]) => [x, y, color]) }),
  regionClickTrans(rows) {
    // 模拟运行时原地改写数组，确保覆盖配置不会被污染。
    for (let i = 0; i < rows.length; i++) rows[i] = rows[i].slice(3);
    return rows;
  }
};
function loadFunc(id, name) {
  const exports = evaluate(read('src/common/funcList/' + id + '_' + name + '.ts'));
  return new exports['Func' + id]();
}
const funcs = {
  700: loadFunc(700, '进入结界并领取食盒'),
  701: loadFunc(701, '结界卡更换'),
  702: loadFunc(702, '式神寄养'),
  503: loadFunc(503, '返回庭院界面'),
  998: loadFunc(998, '式神寄养'),
  999: loadFunc(999, '式神育成')
};
for (const id of [700, 701, 702, 503, 998]) {
  const original = funcs[id].operator;
  const snapshot = JSON.stringify(original);
  assert.equal(reader.getBarrierOperators(id, original), original);
  selected = '苍境云台';
  const overridesBefore = JSON.stringify(skin.GetBarrierSkinOverrides(selected, id));
  const first = reader.getBarrierOperators(id, original);
  const second = reader.getBarrierOperators(id, original);
  assert.notEqual(first, original);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(JSON.stringify(original), snapshot);
  assert.equal(JSON.stringify(skin.GetBarrierSkinOverrides(selected, id)),
    overridesBefore);
  selected = '默认结界';
  assert.equal(reader.getBarrierOperators(id, original), original);
}
selected = '苍境云台';
assert.equal(reader.getBarrierOperators(995, funcs[702].operator),
  funcs[702].operator, 'friend flow must not be rewritten');
assert.equal(reader.getBarrierOperators(999, funcs[999].operator),
  funcs[999].operator, 'existing guild entry should be preserved');
assert.equal(skin.GetBarrierSkinOverrides('不存在', 700), null);
const own = reader.getBarrierOperators(700, funcs[700].operator);
const cards = reader.getBarrierOperators(701, funcs[701].operator);
assert.deepEqual(Array.from(own[10].oper[0]), [654, 324, 680, 378, 1000]);
assert.deepEqual(Array.from(cards[0].oper[1]), [925, 326, 949, 380, 1000]);
assert.deepEqual(Array.from(own[8].oper[1]), [613, 535, 665, 566, 1200]);
assert.equal(own[7], funcs[700].operator[7], 'training UI should be reused');
assert.equal(cards[3], funcs[701].operator[3], 'card dialog should be reused');
const back = reader.getBarrierOperators(503, funcs[503].operator);
assert.equal(back[11].oper, funcs[503].operator[11].oper,
  'home return coordinates should be preserved');

// 702先尝试所选皮肤的己方入口；失败后仍使用未经改写的好友操作。
for (const ownMatches of [false, true]) {
  const calls = [];
  const script = {
    getBarrierOperators: reader.getBarrierOperators.bind(reader),
    scheme: { config: { 702: {} } },
    oper(operation) {
      calls.push(operation);
      if (operation.name === '所选皮肤的己方结界_进入育成') return ownMatches;
      if (operation.name === '寄养界面中') {
        assert.equal(operation.operator[0], funcs[702].operator[13]);
        return true;
      }
      if (operation.name === '开始寄养') {
        assert.equal(operation.operator[0], funcs[702].operator[1]);
        return true;
      }
      return false;
    }
  };
  assert.equal(funcs[702].operatorFunc(script, funcs[702].operator), true);
  assert.equal(calls.length, ownMatches ? 1 : 3);
}
console.log('PASS: exact selection, default preservation, transforms, friend isolation');

// 执行实际业务入口，核对取出的确为所选皮肤操作，而非只测试配置表。
const baseScript = {
  getBarrierOperators: reader.getBarrierOperators.bind(reader),
  global: {}, scheme: { config: {} }
};
assert.equal(funcs[700].operatorFunc({
  ...baseScript,
  oper(operation) {
    if (operation.name === '是否为己方结界') return true;
    if (operation.name === '获取体力奖励') {
      assert.deepEqual(Array.from(operation.operator[0].oper[0]),
        [1138, 395, 1170, 429, 1200]);
      return true;
    }
    return false;
  }
}, funcs[700].operator), true);
let openedCard = false;
assert.equal(funcs[701].operatorFunc({
  ...baseScript,
  oper: operation => operation.name === '结界界面',
  regionClick(operations) {
    assert.deepEqual(Array.from(operations[0]), [925, 326, 949, 380, 1000]);
    openedCard = true;
  }
}, funcs[701].operator), true);
assert.equal(openedCard, true);
assert.equal(funcs[503].operatorFunc({
  ...baseScript,
  global: { back: true, back_time: 0 },
  scheme: { config: { 503: { oper_11: true } } },
  oper(operation) {
    assert.equal(operation.name, '返回庭院');
    assert.equal(operation.operator.length, 1);
    assert.equal(operation.operator[0].oper, funcs[503].operator[11].oper);
    assert.equal(JSON.stringify(operation.operator[0].desc),
      JSON.stringify(back[11].desc));
    return true;
  }
}, funcs[503].operator), true);
console.log('PASS: actual 700/701/503 entry routing');

// 用户01_寄养使用旧版999进入结界，998必须在三个阶段使用新入口。
for (const state of ['change', 'jy_flag', 'change_enchantment']) {
  const clicked = [];
  let routed = false;
  const script = {
    ...baseScript,
    global: { jy_change_shikigami: state },
    scheme: { config: { 998: {} } },
    oper(operation) {
      if (state === 'change' &&
          operation.name === '判断_是否为己方结界_点击式神育成') {
        assert.equal(JSON.stringify(operation.operator[0].desc),
          JSON.stringify(own[10].desc));
        return true;
      }
      if (state === 'change' && operation.name === '点击式神育成') {
        clicked.push(operation.operator[0].oper[0]);
        return true;
      }
      if (state === 'jy_flag' && operation.name === '检测是否为式神寄养列表') {
        assert.equal(JSON.stringify(operation.operator[0].desc),
          JSON.stringify(own[10].desc));
        assert.equal(operation.operator[1], funcs[998].operator[5]);
        assert.equal(operation.operator[2], funcs[998].operator[6]);
        clicked.push(operation.operator[0].oper[0]);
        return true;
      }
      if (state === 'change_enchantment' && operation.name === '更换结界卡') {
        assert.equal(JSON.stringify(operation.operator[0].desc),
          JSON.stringify(own[10].desc));
        clicked.push(operation.operator[0].oper[0]);
        routed = true;
        return true;
      }
      return false;
    }
  };
  assert.equal(funcs[998].operatorFunc(script, funcs[998].operator), true);
  assert.equal(clicked.length, 1);
  assert.deepEqual(Array.from(clicked[0]), state === 'change_enchantment' ?
    [925, 326, 949, 380, 1000] : [654, 324, 680, 378, 1000]);
  assert.equal(routed, state === 'change_enchantment');
}
console.log('PASS: legacy 998 change/foster/card stages and unchanged 999 entry');
