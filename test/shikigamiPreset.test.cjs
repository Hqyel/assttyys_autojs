// 仓库根目录执行：node test/shikigamiPreset.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const ts = require(path.join(root, 'node_modules/typescript'));
const source = fs.readFileSync(path.join(root,
  'src/common/funcList/510_式神录预设过滤.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;
const exportsObject = {};
vm.runInNewContext(compiled +
  '\nexports.getPresetOperation = getPresetOperation;', {
  exports: exportsObject, console
});
const getOperation = exportsObject.getPresetOperation;
const operators = Array.from({ length: 11 }, () => ({ oper: [] }));
operators[8].oper = [[1, 2, 3, 4, 500]];
function fixture(modern = true, points = [
  { x: 988, y: 500 }, { x: 988, y: 172 }, { x: 988, y: 336 }
]) {
  const script = {
    global: { change_shikigami_state: 'change_team_default_1' },
    swipes: [], clicks: [],
    helperBridge: { regionClickTrans: values => values },
    oper: () => modern,
    regionBezierSwipe(...args) { this.swipes.push(args); },
    keepScreen() {},
    findMultiColorEx: () => points,
    regionClick(values) { this.clicks.push(values); }
  };
  return script;
}
for (const [index, y] of [[0, 172], [1, 336], [2, 500]]) {
  const script = fixture();
  assert.equal(getOperation(script, operators, index)[1], y - 2);
  assert.equal(script.swipes.length, 4);
  script.global.change_shikigami_state = 'change_team_default_2';
  getOperation(script, operators, index);
  assert.equal(script.swipes.length, 4, 'second click must not scroll again');
}
const fourth = fixture(true, [
  { x: 988, y: 170 }, { x: 988, y: 334 }, { x: 988, y: 498 }
]);
assert.equal(getOperation(fourth, operators, 3)[1], 496);
assert.equal(fourth.swipes.length, 5, 'fourth row needs one extra scroll');
fourth.global.change_shikigami_state = 'second_default_2';
getOperation(fourth, operators, 3);
assert.equal(fourth.swipes.length, 5);
assert.equal(getOperation(fixture(false), operators, 0), operators[8].oper[0]);
assert.equal(getOperation(fixture(), operators, -1), null);
assert.equal(getOperation(fixture(), operators, 4), null);
assert.equal(getOperation(fixture(true, []), operators, 0), null);

// 找不到图标时不能提前推进状态，也不能点击旧坐标。
const failed = fixture(true, []);
failed.scheme = { config: { '510': {
  fastMode: true, defaultNum: '1', groupNum2: '0'
} } };
failed.oper = operation => [
  '页面为式神录', '式神录已展开 预设 侧栏', '检测霞染游鱼预设布局'
].includes(operation.name);
const instance = new exportsObject.Func510();
assert.equal(instance.operatorFunc(failed, operators), false);
assert.equal(failed.global.change_shikigami_state, 'change_team_default_1');
assert.equal(failed.clicks.length, 0);
console.log('PASS: old layout, rows 1-4, cached confirmation, failed lookup');
