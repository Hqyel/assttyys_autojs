/**
 * 自己的结界皮肤设置，与鲤鱼旗皮肤独立；不提供自动识别。
 * 本模块仅登记选项，新增名称不代表相应取色和坐标已经适配。
 */
/* eslint-disable indent */
export const BARRIER_SKIN_DEFAULT = '默认结界';

const skinNames = [BARRIER_SKIN_DEFAULT, '苍境云台'] as const;
export type BarrierSkinName = typeof skinNames[number];
export const barrierSkinNames: string[] = [...skinNames];

/** 旧配置缺失或无效时恢复默认值，不尝试匹配其他皮肤。 */
export function NormalizeBarrierSkinName(value: unknown): BarrierSkinName {
  return skinNames.find(name => name === value) || BARRIER_SKIN_DEFAULT;
}
/* eslint-enable indent */
