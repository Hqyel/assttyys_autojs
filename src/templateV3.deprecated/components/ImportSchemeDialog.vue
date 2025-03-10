<template>
  <div>
    <!-- 功能的参数配置 -->
    <van-popup class="configModal" v-model:show="importModal" style="width: 100%; height: 100%; background: #f4f5f7; overflow: hidden">
      <div style="position: absolute; top: 0; padding: 16px 16px 10px 16px; width: 100%; z-index: 2222; background: #f4f5f7;">选择要导入的方案</div>
      <div style="height: 100%; overflow: auto">
        <div style="padding-top: 52px; padding-bottom: 52px">
          <div v-for="(item, index) of schemeList" :key="index">
            <div
              :class="'item' + (item.export ? ' export' : '')"
              style="margin: 5px 10px; border-radius: 5px; overflow: hidden; box-shadow: rgb(234, 234, 234) 1px 1px 1px;"
              center
            >
              <div v-if="item.groupName" class="group-color" :style="'background-color: ' + getGroupColor(item.groupName)"></div>
              <div
                @click="item.export = !item.export; $forceUpdate()"
                :style="'background-color: transparent; line-height: 44px; margin-left: ' + (item.groupName ? '14px' : '0px')"
              >
                <span :style="'margin-left: ' + (!item.groupName ? '14px' : '0px')">{{ item.schemeName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="display: block; position: absolute; bottom: 0; width: 100%;">
        <van-row>
          <van-col span="12">
            <div style="margin: 5px 5px 5px 10px; border-radius:5px; overflow: hidden;box-shadow: 1px 1px 1px #eaeaea">
              <van-button type="warning" block @click="cancel">取消</van-button>
            </div>
          </van-col>
          <van-col span="12">
            <div style="margin: 5px 10px 5px 5px; border-radius:5px; overflow: hidden;box-shadow: 1px 1px 1px #eaeaea">
              <van-button type="primary" block @click="doImport">
                <i class="iconfont iconfont-baocun"></i> 导入
              </van-button>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-popup>
    <van-popup style="width: 60%; height: 60%" v-model:show="dialogShow">
      <div style="height: 100%; overflow: scroll;">
        <van-field
          v-model="exportString"
          autosize
          type="textarea"
          rows="60"
          spellcheck="false"
        />
        <van-button type="warning" size="small" style="position: absolute; right: 43px; bottom: 0" @click="pasteExportString()">粘贴</van-button>
        <van-button type="primary" size="small" style="position: absolute; right: 0; bottom: 0" @click="parseExportString()">解析</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import groupColor from '@/common/groupColors';
import commonConfigArr from '@/common/commonConfig';
import { ref, computed } from 'vue';
import { merge } from '@/common/tool';
import dfuncList from "../../common/funcListIndex";

const commonConfig = {};
for (let i = 0; i < commonConfigArr.length; i++) {
	for (let j = 0; j < commonConfigArr[i].config.length; j++) {
		const item = commonConfigArr[i].config[j];
		commonConfig[item.name] = item.default;
	}
}
const props = defineProps({
  show: Boolean,
  importCallback: Function,
})
const emit = defineEmits(['update:show']);

const schemeList = ref([]);
const exportString = ref('');
const importModal = ref(false);

const dialogShow = computed({
  get() {
    return props.show;
  },
  set(val) {
    emit('update:show', val)
  }
});

function cancel() {
  importModal.value = false
}
    
function getGroupColor(groupName) {
  // 计算hash值
  let sum = 0;
  for (let i = 0; i < groupName.length; i++) {
    sum += groupName.charCodeAt(i);
  }
  return groupColor[sum % groupColor.length];
}

async function parseExportString() {
  try {
    // 解析内容是否为scheme的数组
    const toImport = JSON.parse(exportString.value);
    // 导出数组内重名的重命名
    for (let i = 0; i < toImport.length; i++) {
      for (let j = i + 1; j < toImport.length; j++) {
        if (toImport[i].schemeName === toImport[j].schemeName) {
          toImport[j].schemeName += randomStr();
        }
      }
    }
    
    // 获取已储存的schemeList，判断重名方案后自动重命名
    const savedSchemeList = await AutoWeb.autoPromise("getSchemeList");
    for (let i = 0; i < savedSchemeList.length; i++) {
      for (let j = 0; j < toImport.length; j++) {
        if (savedSchemeList[i].schemeName === toImport[j].schemeName) {
          toImport[j].schemeName +=randomStr();
        }
      }
    }
    schemeList.value = toImport;
    importModal.value = true;
  } catch (e) {
    console.error(e);
    await AutoWeb.autoPromise('toast', '无法解析，请检查导入数据是否完整或其它问题');
  }
}

async function pasteExportString() {
  exportString.value = await AutoWeb.autoPromise('getClip');
}

async function doImport() {
  const savedSchemeList = await AutoWeb.autoPromise("getSchemeList");
  let maxId = savedSchemeList.reduce((prev, curr) => {
    return Math.max(prev, curr.id);
  }, 0);
  let toSave = schemeList.value;
  toSave = toSave.filter(item => item.export);
  toSave.forEach(itemToSave => {
    itemToSave.inner = false;
    itemToSave.id = ++maxId;
    itemToSave.commonConfig = merge({}, commonConfig, itemToSave.commonConfig || {});
    const _config = merge({}, itemToSave.config || {});
    itemToSave.list.forEach((id) => {
      for (let funcOrigin of dfuncList) {
        if (funcOrigin.id === id) {
          if (funcOrigin.config) {
            _config[id] = {};
            funcOrigin.config.forEach(configGroup => {
              configGroup.config.forEach(configItem => {
                _config[id][configItem.name] = configItem.default;
              })
            })
          }
        }
      }
    });
    itemToSave.config = merge({}, _config, itemToSave.config || {})
  });
  await AutoWeb.autoPromise('saveSchemeList', [...savedSchemeList, ...toSave]);
  await AutoWeb.autoPromise('toast', '导入成功');

  dialogShow.value = false;
  importModal.value = false;
  props.importCallback();
}

function randomStr() {
  const str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(str[parseInt(Math.random() * 654321) % str.length]);
  }
  return arr.join('');
}
</script>

<style scoped>
.item {
  position: relative;
  height: 44px;
  margin:5px 10px 5px 10px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  padding: 0px 16px 0px 0px;
  font-size: 14px;
  box-shadow: 1px 1px 1px #eaeaea;
  transition: all .1s linear;
}
.logo {
  position: absolute;
  top: 6px;
  left: 6px;
}
.logo img {
  max-width: 32px;
  max-height: 32px;
}
.item-content {
  display: block;
  margin-top: 5px;
  margin-left: 44px;
  font-size: 14px;
}
.export {
  color: #fff;
  background-color: #0066CC
}
.group-color {
  width: 6px;
  height: 100%;
  position: absolute;
  background-color: #ff00ff
}
</style>
<style>
textarea.van-field__control {
  overflow:hidden
}
</style>