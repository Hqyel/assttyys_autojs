/**
 * 自己的结界皮肤设置，与鲤鱼旗皮肤独立；不提供自动识别。
 * 只应用所选皮肤的操作覆盖；默认结界继续使用业务功能原有规则。
 */
import { IFuncOperatorOrigin } from '@/interface/IFunc';
import { IMultiDetectColorDescOrigin } from '@/interface/IMultiColor';

/* eslint-disable indent */
export const BARRIER_SKIN_DEFAULT = '默认结界';

const skinNames = [
  BARRIER_SKIN_DEFAULT, '苍境云台', '高天圣域', '云旷江清', '奇想蜃城',
  '月海游星', '浮梦之乡', '四时一隅', '胧梦之庭', '见世山廊'
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

// 牌面上沿受粉色光效干扰，育成和结界卡改取中段稳定点。
const qixiangHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 431, 458, 0xdfcabe],
  [center, 642, 482, 0xd7bfb3],
  [center, 869, 478, 0xd9c1b3]
]];
const qixiangStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...qixiangHome[2],
  [right, 923, 483, 0xdd652a],
  [right, 921, 500, 0x85331b]
]];
const qixiangExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...qixiangHome[2],
  [right, 964, 494, 0x788fb0],
  [right, 968, 504, 0x9eb9e0]
]];
const qixiangReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...qixiangHome[2],
  [center, 862, 335, 0x12100c],
  [center, 834, 362, 0x12100c],
  [center, 888, 364, 0x0f0e0a]
]];
const qixiangTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 640, 454, 661, 520, 1000]
];
const qixiangCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 853, 454, 872, 520, 1000]
];

const yuehaiHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 345, 390, 0xcfb18b],
  [center, 632, 391, 0xd3b793],
  [center, 917, 394, 0xbf9556]
]];
const yuehaiStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...yuehaiHome[2],
  [right, 1030, 474, 0xcf5f25],
  [right, 1028, 493, 0x84321b]
]];
const yuehaiExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...yuehaiHome[2],
  [right, 1077, 465, 0x6ba6de],
  [right, 1081, 485, 0x9fbde6]
]];
const yuehaiReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...yuehaiHome[2],
  [center, 930, 259, 0x12100c],
  [center, 902, 288, 0x12100c],
  [center, 958, 289, 0x110f0b]
]];
const yuehaiTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 632, 392, 654, 467, 1000]
];
const yuehaiCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 920, 395, 941, 468, 1000]
];

const fumengHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 407, 486, 0xd9bfa7],
  [center, 638, 483, 0xbd9156],
  [center, 874, 485, 0xcdaf8f]
]];
const fumengStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...fumengHome[2],
  [right, 1000, 570, 0xda5121],
  [right, 999, 589, 0x83321a]
]];
const fumengExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...fumengHome[2],
  [right, 1080, 560, 0x2b6ea2],
  [right, 1084, 583, 0xadc8ea]
]];
const fumengReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...fumengHome[2],
  [center, 884, 371, 0x12100c],
  [center, 855, 400, 0x12100c],
  [center, 910, 402, 0x110f0b]
]];
const fumengTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 639, 482, 658, 545, 1000]
];
const fumengCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 874, 484, 890, 544, 1000]
];

const shishiHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 416, 434, 0xcfb18f],
  // 左上方偶有粉色光效，取牌面右侧的稳定点。
  [center, 634, 447, 0xdfc9bb],
  [center, 830, 436, 0xe1cbbf]
]];
const shishiStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...shishiHome[2],
  [right, 946, 487, 0xdf6a2a],
  [right, 949, 501, 0x88341c]
]];
const shishiExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...shishiHome[2],
  [right, 988, 477, 0x32648c],
  [right, 992, 499, 0x93b0d5]
]];
const shishiReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...shishiHome[2],
  [center, 837, 325, 0x12100c],
  [center, 809, 354, 0x12100c],
  [center, 864, 354, 0x10100b]
]];
const shishiTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 623, 435, 639, 487, 1000]
];
const shishiCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 830, 435, 842, 488, 1000]
];

const longmengHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 389, 433, 0xddc5b3],
  [center, 643, 434, 0xdfc9b7],
  [center, 871, 435, 0xdbc3ab]
]];
const longmengStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...longmengHome[2],
  [right, 836, 504, 0xdf6a2a],
  [right, 837, 520, 0x88341d]
]];
const longmengExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...longmengHome[2],
  [right, 882, 496, 0x286697],
  [right, 885, 519, 0x6997d3]
]];
const longmengReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...longmengHome[2],
  [center, 881, 311, 0x12100c],
  [center, 853, 340, 0x12100c],
  [center, 908, 341, 0x110f0b]
]];
const longmengTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 640, 433, 659, 497, 1000]
];
// 牌面下方与食盒气泡接近，结界卡入口限定为上半部。
const longmengCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 872, 434, 889, 452, 1000]
];

const jianshiHome: IMultiDetectColorDescOrigin = [1280, 720, [
  [left, 126, 35, 0xf9efac],
  [center, 433, 318, 0xd9c1ab],
  [center, 619, 318, 0xd7bda7],
  [center, 795, 319, 0xb78962]
]];
const jianshiStamina: IMultiDetectColorDescOrigin = [1280, 720, [
  ...jianshiHome[2],
  [right, 915, 347, 0xd97327],
  [right, 915, 363, 0x82311a]
]];
const jianshiExperience: IMultiDetectColorDescOrigin = [1280, 720, [
  ...jianshiHome[2],
  [right, 960, 338, 0x25628f],
  [right, 964, 359, 0x6396d6]
]];
const jianshiReward: IMultiDetectColorDescOrigin = [1280, 720, [
  ...jianshiHome[2],
  [center, 806, 180, 0x12100c],
  [center, 778, 210, 0x12100c],
  [center, 834, 211, 0x110f0b]
]];
const jianshiTraining: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 617, 318, 629, 368, 1000]
];
const jianshiCard: IFuncOperatorOrigin['oper'] = [
  [center, 1280, 720, 795, 320, 806, 367, 1000]
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
  },
  '奇想蜃城': {
    700: {
      8: { desc: qixiangStamina, oper: [
        [right, 1280, 720, 910, 468, 934, 496, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: qixiangExperience, oper: [
        // 两个气泡重叠，点击经验气泡右侧，避开体力食盒热区。
        [right, 1280, 720, 982, 472, 994, 492, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: qixiangHome, oper: qixiangTraining }
    },
    701: {
      0: { desc: qixiangHome, oper: [...qixiangTraining, ...qixiangCard] },
      1: { desc: qixiangReward, oper: [
        [center, 1280, 720, 849, 347, 876, 380, 1000]
      ] },
      12: { desc: qixiangHome, oper: qixiangTraining }
    },
    702: { 0: { desc: qixiangHome, oper: qixiangTraining } },
    998: { 10: { desc: qixiangHome,
      oper: [...qixiangTraining, ...qixiangCard] } },
    503: { 11: { desc: qixiangHome } }
  },
  '月海游星': {
    700: {
      8: { desc: yuehaiStamina, oper: [
        [right, 1280, 720, 1015, 458, 1041, 488, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: yuehaiExperience, oper: [
        // 经验气泡取右侧热区，避免与体力食盒入口重叠。
        [right, 1280, 720, 1090, 462, 1099, 486, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: yuehaiHome, oper: yuehaiTraining }
    },
    701: {
      0: { desc: yuehaiHome, oper: [...yuehaiTraining, ...yuehaiCard] },
      1: { desc: yuehaiReward, oper: [
        [center, 1280, 720, 916, 275, 945, 308, 1000]
      ] },
      12: { desc: yuehaiHome, oper: yuehaiTraining }
    },
    702: { 0: { desc: yuehaiHome, oper: yuehaiTraining } },
    998: { 10: { desc: yuehaiHome,
      oper: [...yuehaiTraining, ...yuehaiCard] } },
    503: { 11: { desc: yuehaiHome } }
  },
  '浮梦之乡': {
    700: {
      8: { desc: fumengStamina, oper: [
        [right, 1280, 720, 987, 551, 1011, 583, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: fumengExperience, oper: [
        [right, 1280, 720, 1090, 560, 1099, 586, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: fumengHome, oper: fumengTraining }
    },
    701: {
      0: { desc: fumengHome, oper: [...fumengTraining, ...fumengCard] },
      1: { desc: fumengReward, oper: [
        [center, 1280, 720, 869, 385, 897, 417, 1000]
      ] },
      12: { desc: fumengHome, oper: fumengTraining }
    },
    702: { 0: { desc: fumengHome, oper: fumengTraining } },
    998: { 10: { desc: fumengHome,
      oper: [...fumengTraining, ...fumengCard] } },
    503: { 11: { desc: fumengHome } }
  },
  '四时一隅': {
    700: {
      8: { desc: shishiStamina, oper: [
        [right, 1280, 720, 934, 471, 957, 501, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: shishiExperience, oper: [
        // 紧凑布局的气泡相邻，经验入口取右侧独立热区。
        [right, 1280, 720, 1008, 476, 1018, 495, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: shishiHome, oper: shishiTraining }
    },
    701: {
      0: { desc: shishiHome, oper: [...shishiTraining, ...shishiCard] },
      1: { desc: shishiReward, oper: [
        [center, 1280, 720, 824, 339, 850, 372, 1000]
      ] },
      12: { desc: shishiHome, oper: shishiTraining }
    },
    702: { 0: { desc: shishiHome, oper: shishiTraining } },
    998: { 10: { desc: shishiHome,
      oper: [...shishiTraining, ...shishiCard] } },
    503: { 11: { desc: shishiHome } }
  },
  '胧梦之庭': {
    700: {
      8: { desc: longmengStamina, oper: [
        [right, 1280, 720, 825, 490, 846, 518, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: longmengExperience, oper: [
        [right, 1280, 720, 905, 498, 915, 516, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: longmengHome, oper: longmengTraining }
    },
    701: {
      0: { desc: longmengHome, oper: [...longmengTraining, ...longmengCard] },
      1: { desc: longmengReward, oper: [
        [center, 1280, 720, 867, 326, 895, 358, 1000]
      ] },
      12: { desc: longmengHome, oper: longmengTraining }
    },
    702: { 0: { desc: longmengHome, oper: longmengTraining } },
    998: { 10: { desc: longmengHome,
      oper: [...longmengTraining, ...longmengCard] } },
    503: { 11: { desc: longmengHome } }
  },
  '见世山廊': {
    700: {
      8: { desc: jianshiStamina, oper: [
        [right, 1280, 720, 904, 332, 926, 359, 1200],
        [center, 1280, 720, 613, 535, 665, 566, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200],
        [center, 1280, 720, 956, 151, 994, 179, 1200]
      ] },
      9: { desc: jianshiExperience, oper: [
        [right, 1280, 720, 978, 341, 989, 360, 1200],
        [center, 1280, 720, 611, 476, 676, 519, 1200]
      ] },
      10: { desc: jianshiHome, oper: jianshiTraining }
    },
    701: {
      0: { desc: jianshiHome, oper: [...jianshiTraining, ...jianshiCard] },
      1: { desc: jianshiReward, oper: [
        [center, 1280, 720, 793, 195, 819, 227, 1000]
      ] },
      12: { desc: jianshiHome, oper: jianshiTraining }
    },
    702: { 0: { desc: jianshiHome, oper: jianshiTraining } },
    998: { 10: { desc: jianshiHome,
      oper: [...jianshiTraining, ...jianshiCard] } },
    503: { 11: { desc: jianshiHome } }
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
