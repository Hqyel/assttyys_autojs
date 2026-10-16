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
const operators = Array.from({ length: 13 }, () => ({ oper: [] }));
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

// 穹宇垂帘必须选择自己的图标特征，不能复用霞染游鱼取色。
const curtain = fixture(true, [
  { x: 1015, y: 487 }, { x: 1015, y: 159 }, { x: 1015, y: 323 }
]);
curtain.oper = operation => operation.operator[0].desc ===
  '式神录_预设已展开_穹宇垂帘';
curtain.findMultiColorEx = key => {
  assert.equal(key, '式神录_队伍应用按钮_穹宇垂帘');
  return [{ x: 1015, y: 487 }, { x: 1015, y: 159 }, { x: 1015, y: 323 }];
};
assert.equal(getOperation(curtain, operators, 1)[1], 321);
assert.equal(curtain.swipes.length, 4);
const opening = new exportsObject.Func510().operator[11];
assert.equal(opening.desc, '式神录_预设未展开_穹宇垂帘');
assert.ok(opening.oper[0][3] >= 386, 'must not hit the search button');
console.log('PASS: curtain profile and shifted preset entry');

// 契光水境是四行布局，沿用每行坐标，不能进入164像素滚动分支。
const mirrorInstance = new exportsObject.Func510();
const mirror = fixture(false);
for (let i = 0; i < 4; i++) {
  const result = getOperation(mirror, mirrorInstance.operator, i);
  assert.equal(result, mirrorInstance.operator[8].oper[i]);
  const x = 994;
  const y = [165, 315, 466, 616][i];
  assert.ok(result[3] <= x && x <= result[5]);
  assert.ok(result[4] <= y && y <= result[6]);
}
assert.equal(mirror.swipes.length, 0);
const mirrorEntry = mirrorInstance.operator[12];
assert.equal(mirrorEntry.desc, '式神录_预设未展开_契光水境');
assert.ok(mirrorEntry.oper[0][3] >= 363);
const offeringSource = fs.readFileSync(path.join(root,
  'src/common/funcList/302_奉纳御魂.ts'), 'utf8');
const offeringExports = {};
vm.runInNewContext(ts.transpileModule(offeringSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText, { exports: offeringExports, console });
const detailEntry = new offeringExports.Func302().operator[20];
assert.equal(detailEntry.desc, '式神录_详情未展开_契光水境');
assert.ok(detailEntry.oper[0][3] >= 1240);
assert.ok(detailEntry.oper[0][5] <= 1257);
console.log('PASS: mirror rows 1-4, shifted preset and detail entries');
