// 仓库根目录执行：node test/barrierSkinSettings.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('../node_modules/typescript');
const root = path.resolve(__dirname, '..');
function source(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}
function compile(text) {
  return ts.transpileModule(text, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  }).outputText;
}
function load(file, context = {}) {
  const exports = {};
  vm.runInNewContext(compile(source(file)), { exports, ...context });
  return exports;
}
const skin = load('src/common/barrierSkin.ts');
const expectedSkins = [
  '默认结界', '苍境云台', '高天圣域', '云旷江清', '奇想蜃城', '月海游星',
  '浮梦之乡', '四时一隅', '胧梦之庭', '见世山廊', '高天隐月'
];
assert.deepEqual(Array.from(skin.barrierSkinNames), expectedSkins);
for (const invalid of [undefined, null, '', '自动识别', '未知皮肤', 1, {}]) {
  assert.equal(skin.NormalizeBarrierSkinName(invalid), '默认结界');
}
assert.equal(skin.NormalizeBarrierSkinName('苍境云台'), '苍境云台');
assert.equal(skin.NormalizeBarrierSkinName('高天圣域'), '高天圣域');
assert.equal(skin.NormalizeBarrierSkinName('云旷江清'), '云旷江清');
assert.equal(skin.NormalizeBarrierSkinName('奇想蜃城'), '奇想蜃城');
assert.equal(skin.NormalizeBarrierSkinName('月海游星'), '月海游星');
assert.equal(skin.NormalizeBarrierSkinName('浮梦之乡'), '浮梦之乡');
assert.equal(skin.NormalizeBarrierSkinName('四时一隅'), '四时一隅');
assert.equal(skin.NormalizeBarrierSkinName('胧梦之庭'), '胧梦之庭');
assert.equal(skin.NormalizeBarrierSkinName('见世山廊'), '见世山廊');
assert.equal(skin.NormalizeBarrierSkinName('高天隐月'), '高天隐月');

function fixture(settings = {}) {
  let persisted = { ...settings };
  const callbacks = {};
  const storeCommon = {
    get: () => JSON.parse(JSON.stringify(persisted)),
    put: (_key, value) => { persisted = JSON.parse(JSON.stringify(value)); }
  };
  const storage = { name: '默认存储', getSettingsConfig: () => [] };
  const mocks = {
    '@/system': { webview: { on: name => ({
      subscribe: callback => { callbacks[name] = callback; }
    }) } },
    '@/system/Store/store': {
      storeCommon,
      storeStore: { get: (_key, fallback) => fallback },
      getStorages: () => storage,
      getStoragesList: () => [storage]
    },
    '@/common/barrierSkin': skin,
    '@/common/courtyardSkin': {
      COURTYARD_SKIN_AUTO: '自动识别',
      courtyardSkinNames: ['自动识别', '雪月华庭']
    },
    '@/common/toolAuto': { isDebugPlayerRunning: () => false },
    '@auto.pro/core': { isRoot: false },
    '@/system/Ocr/MlkitOcr': { mlkitOcr: { isInstalled: () => false } },
    '@/system/PushClient/index': { default: [] }
  };
  const settingsModule = load('src/system/webviewEvents/settings.ts', {
    require: name => mocks[name] || {},
    device: { sdkInt: 22 }, app: { autojs: { versionCode: 0 } },
    floaty: { checkPermission: () => true },
    $settings: { isEnabled: () => false },
    console: { log() {} }, toastLog() {}
  });
  settingsModule.default();
  return {
    storeCommon,
    read: () => persisted,
    list() {
      let result;
      callbacks.getSettings([null, value => { result = value; }]);
      return result;
    },
    save(value) {
      let success;
      callbacks.saveSetting([{
        type: 'assttyys_setting', stype: 'list', name: 'barrier_skin', value
      }, result => { success = result; }]);
      assert.equal(success, true);
    }
  };
}
const legacy = fixture({ courtyard_skin: '雪月华庭', custom: 'preserved' });
assert.equal(legacy.read().barrier_skin, '默认结界');
const item = legacy.list().find(value => value.name === 'barrier_skin');
assert.equal(item.stype, 'list');
assert.deepEqual(Array.from(item.data), expectedSkins);
assert.ok(item.desc.includes('非鲤鱼旗'));
legacy.save('苍境云台');
assert.equal(legacy.read().barrier_skin, '苍境云台');
assert.equal(legacy.read().courtyard_skin, '雪月华庭');
assert.equal(legacy.read().custom, 'preserved');
const restart = fixture(legacy.read());
assert.equal(restart.list().find(value => value.name === 'barrier_skin').value,
  '苍境云台');
restart.save('自动识别');
assert.equal(restart.read().barrier_skin, '默认结界');
assert.equal(fixture({ barrier_skin: '不存在' }).read().barrier_skin, '默认结界');

// 直接执行实际Script方法，隔离游戏运行环境与构造函数副作用。
const scriptSource = source('src/system/script.ts');
const ast = ts.createSourceFile('script.ts', scriptSource,
  ts.ScriptTarget.Latest, true);
const scriptClass = ast.statements.find(node =>
  ts.isClassDeclaration(node) && node.name.text === 'Script');
const getter = scriptClass.members.find(node =>
  node.name?.getText(ast) === 'getBarrierSkinName');
const directExports = {};
vm.runInNewContext(compile('export class Reader {' + getter.getText(ast) + '}'), {
  exports: directExports,
  NormalizeBarrierSkinName: skin.NormalizeBarrierSkinName,
  storeCommon: legacy.storeCommon
});
assert.equal(new directExports.Reader().getBarrierSkinName(), '苍境云台');
for (const name of expectedSkins.slice(2)) {
  legacy.save(name);
  assert.equal(new directExports.Reader().getBarrierSkinName(), name);
  assert.equal(fixture(legacy.read()).list()
    .find(value => value.name === 'barrier_skin').value, name);
}
legacy.save('默认结界');
assert.equal(new directExports.Reader().getBarrierSkinName(), '默认结界');
console.log('PASS: manual options, migration, persistence, isolation, reader');
