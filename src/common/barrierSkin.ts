/**
 * 自己的结界皮肤设置，与鲤鱼旗皮肤独立；不提供自动识别。
 * 只应用所选皮肤的操作覆盖；默认结界继续使用业务功能原有规则。
 */
import { IFuncOperatorOrigin } from '@/interface/IFunc';
import { IMultiDetectColorDescOrigin } from '@/interface/IMultiColor';

/* eslint-disable indent */
export const BARRIER_SKIN_DEFAULT = '默认结界';

const skinNames = [
  BARRIER_SKIN_DEFAULT, '苍境云台', '高天圣域', '云旷江清'
] as const;
export type BarrierSkinName = typeof skinNames[number];
export const barrierSkinNames: string[] = [...skinNames];

/** 旧配置缺失或无效时恢复默认值，不尝试匹配其他皮肤。 */
export function NormalizeBarrierSkinName(value: unknown): BarrierSkinName {
  return skinNames.find(name => name === value) || BARRIER_SKIN_DEFAULT;
}

type BarrierOperatorOverrides = Record<number, IFuncOperatorOrigin>;

const left = 0;
const center = 1;
const right = 2;
const home: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 394, 350, 0xd1b9ab],
  [center, 659, 326, 0xe1c9bb],
  [center, 939, 350, 0xd9c1b3]
]];
const stamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...home[2],
  [right, 1155, 412, 0xd73c1c],
  [right, 1155, 439, 0x12100c]
]];
const experience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...home[2],
  [right, 1247, 404, 0x3a85ca],
  [right, 1253, 426, 0xa3c0e3]
]];
// 奖励气泡内沿，避开斗鱼/太鼓图案与变化的金色光晕。
const cardReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...home[2],
  [center, 941, 183, 0x12100c],
  [center, 910, 212, 0x12100c],
  [center, 968, 212, 0x100f0a]
]];
const training: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 654, 324, 680, 378, 1000]
];
const card: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 925, 326, 949, 380, 1000]
];

const gaotianHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 375, 453, 0x050505],
  [center, 638, 453, 0xddc5af],
  [center, 908, 456, 0xe3cdbf]
]];
const gaotianStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...gaotianHome[2],
  [right, 1010, 539, 0x972e18],
  [right, 1011, 569, 0x0f0d0a]
]];
const gaotianExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...gaotianHome[2],
  [right, 1101, 541, 0x6aa3da],
  [right, 1103, 577, 0x12100c]
]];
// 只取奖励气泡内沿，不依赖结界卡种类及金色光晕。
const gaotianReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...gaotianHome[2],
  [center, 915, 333, 0x12100c],
  [center, 886, 363, 0x12100c],
  [center, 943, 366, 0x110f0b]
]];
const gaotianTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 635, 449, 658, 517, 1000]
];
const gaotianCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 905, 453, 924, 517, 1000]
];

const yunkuangHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 318, 375, 0xdfc7b3],
  [center, 627, 375, 0xdfc7af],
  [center, 909, 375, 0xdfc7af]
]];
const yunkuangStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...yunkuangHome[2],
  [right, 1023, 456, 0xdc6626],
  [right, 1024, 475, 0x85331b]
]];
const yunkuangExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...yunkuangHome[2],
  [right, 1070, 444, 0x2b72a6],
  [right, 1079, 473, 0x9dbae2]
]];
const yunkuangReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...yunkuangHome[2],
  [center, 918, 246, 0x12100c],
  [center, 890, 277, 0x12100c],
  [center, 944, 278, 0x13110c]
]];
const yunkuangTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 624, 373, 647, 445, 1000]
];
const yunkuangCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 905, 373, 926, 445, 1000]
];

const profiles: Partial<Record<BarrierSkinName,
  Record<number, BarrierOperatorOverrides>>> = {
  '苍境云台': {
    700: {
      8: { desc: stamina, oper: [
        [right, 1280, 720, 1138, 395, 1170, 429, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: experience, oper: [
        [right, 1280, 720, 1235, 399, 1261, 435, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: home, oper: training }
    },
    701: {
      0: { desc: home, oper: [...training, ...card] },
      1: { desc: cardReward, oper: [
        [center, 1280, 720, 921, 197, 956, 232, 1000]
      ] },
      12: { desc: home, oper: training }
    },
    // 702仅增加己方入口，调用方仍保留原有好友识别路径。
    702: { 0: { desc: home, oper: training } },
    // 旧版自定义寄养方案由999进入结界，998继续育成、换卡和寄养。
    998: { 10: { desc: home, oper: [...training, ...card] } },
    503: { 11: { desc: home } }
  },
  '高天圣域': {
    700: {
      8: { desc: gaotianStamina, oper: [
        [right, 1280, 720, 997, 527, 1025, 559, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: gaotianExperience, oper: [
        [right, 1280, 720, 1089, 530, 1117, 565, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: gaotianHome, oper: gaotianTraining }
    },
    701: {
      0: { desc: gaotianHome, oper: [...gaotianTraining, ...gaotianCard] },
      1: { desc: gaotianReward, oper: [
        [center, 1280, 720, 899, 348, 928, 381, 1000]
      ] },
      12: { desc: gaotianHome, oper: gaotianTraining }
    },
    702: { 0: { desc: gaotianHome, oper: gaotianTraining } },
    998: { 10: { desc: gaotianHome,
      oper: [...gaotianTraining, ...gaotianCard] } },
    503: { 11: { desc: gaotianHome } }
  },
  '云旷江清': {
    700: {
      8: { desc: yunkuangStamina, oper: [
        [right, 1280, 720, 1009, 438, 1035, 471, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: yunkuangExperience, oper: [
        [right, 1280, 720, 1066, 438, 1087, 475, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: yunkuangHome, oper: yunkuangTraining }
    },
    701: {
      0: { desc: yunkuangHome, oper: [...yunkuangTraining, ...yunkuangCard] },
      1: { desc: yunkuangReward, oper: [
        [center, 1280, 720, 902, 258, 931, 291, 1000]
      ] },
      12: { desc: yunkuangHome, oper: yunkuangTraining }
    },
    702: { 0: { desc: yunkuangHome, oper: yunkuangTraining } },
    998: { 10: { desc: yunkuangHome,
      oper: [...yunkuangTraining, ...yunkuangCard] } },
    503: { 11: { desc: yunkuangHome } }
  }
};

/** 按名称精确取规则，不尝试其他皮肤；无覆盖时保留原操作。 */
export function GetBarrierSkinOverrides(
  value: unknown,
  funcId: number
): BarrierOperatorOverrides | null {
  return profiles[NormalizeBarrierSkinName(value)]?.[funcId] || null;
}
/* eslint-enable indent */
