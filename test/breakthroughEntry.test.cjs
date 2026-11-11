// node test/breakthroughEntry.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('../node_modules/typescript');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function evaluate(source, context = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  }).outputText, {
    exports, require: () => ({}), console: { log() {} }, ...context
  });
  return exports;
}
const colors = evaluate(read('src/common/multiDetectColors.ts')).default;
const Func008 = evaluate(read('src/common/funcList/008_结界_进攻.ts'))
  .Func008;
const ast = ts.createSourceFile('script.ts', read('src/system/script.ts'),
  ts.ScriptTarget.Latest, true);
const cls = ast.statements.find(node =>
  ts.isClassDeclaration(node) && node.name.text === 'Script');
const methods = ['getMultiDetectDescList', 'oper'].map(name =>
  cls.members.find(node => node.name?.getText(ast) === name).getText(ast));

for (const [width, height] of [[1280, 720], [1600, 720], [2560, 1440]]) {
  const scale = height / 720;
  const transformX = (x, anchor) => x * scale +
    (anchor === 0 ? 0 : (width - 1280 * scale) / (anchor === 1 ? 2 : 1));
  const func = new Func008();
  const entry = func.operator[5];
  const definition = colors[entry.desc];
  assert.equal(definition.variants, undefined);
  assert.ok(definition.desc[2].length >= 6);
  const points = definition.desc[2].map(([anchor, x, y, color]) => {
    assert.equal(anchor, 0);
    assert.ok(y >= 640, 'entry must never use top resource bar points');
    return [transformX(x, anchor), y * scale, color];
  });
  const clicks = [];
  let bottomVisible = true;
  const helperBridge = {
    helper: { CompareColorEx(desc) {
      assert.equal(JSON.stringify(desc), JSON.stringify(points));
      return bottomVisible;
    } },
    regionClick(operations) { clicks.push(...operations); }
  };
  const Reader = evaluate('export class Reader {' + methods.join('\n') + '}', {
    helperBridge, drawFloaty: { instacne: null }
  }).Reader;
  const script = new Reader();
  script.multiDetectColors = { [entry.desc]: { desc: points } };
  script.scheme = {
    config: { 8: {} },
    commonConfig: { colorSimilar: 20 }
  };
  script.runTimes = {};
  const operations = entry.oper.map(([anchor, _w, _h, x1, y1, x2, y2, ms]) =>
    [transformX(x1, anchor), y1 * scale,
      transformX(x2, anchor), y2 * scale, ms]);
  func.operator[5] = { desc: entry.desc, oper: operations };

  // Execute the real breakthrough route and Script.oper click dispatch.
  assert.equal(func.operatorFunc(script, func.operator), true);
  assert.equal(clicks.length, 1);
  assert.equal(JSON.stringify(clicks[0]), JSON.stringify([
    274 * scale, 648 * scale, 296 * scale, 670 * scale, 1000
  ]));

  // A resource bar or dialog without the bottom icon must not cause a click.
  bottomVisible = false;
  clicks.length = 0;
  assert.ok(!script.oper({ operator: [func.operator[5]] }));
  assert.equal(clicks.length, 0);

  // Scheme 97 runs 501/40 before 8: the old BUFF position is now a ticket.
  const Func501 = evaluate(read(
    'src/common/funcList/501_打开buff界面.ts')).Func501;
  const Func040 = evaluate(read('src/common/funcList/040_关闭BUFF.ts'))
    .Func040;
  const openBuff = new Func501();
  const closeBuff = new Func040();
  function transformOperator(origin) {
    let desc = origin.desc;
    if (typeof desc === 'string') desc = colors[desc].desc;
    const transformed = desc[2].map(([anchor, x, y, color]) =>
      [transformX(x, anchor), y * scale, color]);
    const oper = origin.oper?.map(
      ([anchor, _w, _h, x1, y1, x2, y2, ms]) =>
        [transformX(x1, anchor), y1 * scale,
          transformX(x2, anchor), y2 * scale, ms]);
    return { desc: transformed, oper };
  }
  const openOperators = openBuff.operator.map(transformOperator);
  const closeOperators = closeBuff.operator.map(transformOperator);
  let screen = 'map';
  helperBridge.helper.CompareColorEx = desc => {
    const expected = screen === 'buff' ? closeOperators[0].desc :
      screen === 'legacy' ? openOperators[0].desc : openOperators[3].desc;
    return JSON.stringify(desc) === JSON.stringify(expected) ||
      (screen === 'map' && JSON.stringify(desc) === JSON.stringify(points));
  };
  script.scheme.config[501] = { once: true };
  script.scheme.config[40] = {};
  script.global = {};
  script.superGlobal = {};
  script.findMultiColor = () => null;
  script.regionClick = helperBridge.regionClick;
  assert.equal(openBuff.operatorFunc(script, openOperators), true);
  assert.equal(clicks.length, 1);
  assert.equal(JSON.stringify(clicks[0]), JSON.stringify([
    244 * scale, 36 * scale, 264 * scale, 62 * scale, 1500
  ]));
  screen = 'buff';
  assert.equal(closeBuff.operatorFunc(script, closeOperators), true);
  assert.equal(script.global.closed_buff, true);
  assert.equal(script.runTimes[40], 1);
  screen = 'map';
  assert.equal(openBuff.operatorFunc(script, openOperators), false);
  clicks.length = 0;
  assert.equal(func.operatorFunc(script, func.operator), true);
  assert.equal(clicks[0][1], 648 * scale);

  // Legacy maps still use their original entry, never a new-map fallback.
  script.runTimes = {};
  screen = 'legacy';
  clicks.length = 0;
  assert.equal(openBuff.operatorFunc(script, openOperators), true);
  assert.equal(JSON.stringify(clicks[0]),
    JSON.stringify(openOperators[0].oper[0]));
}
console.log('PASS: bottom entry and 501 -> 40 -> 8 flow, new/legacy maps');
