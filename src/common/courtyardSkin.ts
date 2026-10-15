/**
 * 庭院皮肤入口识别配置
 *
 * 设置中选择具体皮肤时，仅使用该皮肤的找色规则，避免不同皮肤的取色互相误识别；
 * 选择「自动识别」时按 autoExplore / autoTown 的顺序依次尝试候选皮肤的规则。
 * 新增皮肤时：在 multiFindColors 与 rules 中登记；需要自动识别时再加入自动识别顺序。
 */

export interface ICourtyardRule {
	/** multiFindColors 的 key */
	key: string;
	/** 仅使用 desc 中的这些分组（多个皮肤共用一个 key 时使用），不填表示全部分组 */
	groups?: number[];
	/** 是否开启错位匹配，不填时与 findMultiColor 默认值一致（开启） */
	misaligned?: boolean;
	/** 多个结果时取最左侧的点（使用 findMultiColorEx 查找） */
	leftmost?: boolean;
	/** 点击区域相对识别点的偏移 [x1, y1, x2, y2]，不填时使用调用方的默认区域 */
	clickOffset?: [number, number, number, number];
}

export interface ICourtyardSkin {
	name: string;
	/** 探索入口规则，按顺序尝试 */
	explore: ICourtyardRule[];
	/** 町中入口规则，按顺序尝试 */
	town: ICourtyardRule[];
	/** 町中入口可能被人物遮挡，识别失败时需横移视角重试 */
	townHiddenSwipe?: boolean;
}

export const COURTYARD_SKIN_AUTO = '自动识别';

const townDefault = '庭院_町中竖牌';

const rules = {
	'默认庭院': {
		explore: { key: '庭院_探索灯笼' },
		town: { key: townDefault, groups: [0, 1] },
	},
	'茨心乐园': {
		explore: { key: '庭院_茨心乐园_探索灯笼' },
		town: { key: townDefault, groups: [2] },
	},
	'治兵武道': {
		explore: { key: '庭院_治兵武道_探索灯笼' },
		town: { key: townDefault, groups: [3, 4] },
	},
	'望月幽庭': {
		explore: { key: '庭院_望月幽庭_探索灯笼' },
		town: { key: townDefault, groups: [5, 6] },
	},
	'缘结之庭': {
		explore: { key: '庭院_缘结之庭_探索灯笼' },
		town: { key: townDefault, groups: [7, 8] },
	},
	'笔墨山河': {
		explore: { key: '庭院_笔墨山河_探索灯笼' },
		town: { key: townDefault, groups: [9, 10, 11] },
	},
	'琼夜淬光': {
		explore: { key: '庭院_琼夜淬光_探索灯笼', clickOffset: [12, -10, 24, 2] },
		town: { key: townDefault, groups: [12, 13, 14] },
	},
	'云景阆苑': {
		explore: { key: '庭院_云景阆苑_探索灯笼' },
		town: { key: townDefault, groups: [15, 16, 17] },
	},
	'狐栖归处': {
		explore: { key: '庭院_狐栖归处_功能灯笼', leftmost: true },
		town: { key: townDefault, groups: [18, 19] },
	},
	'远海航船': {
		explore: { key: '庭院_远海航船_探索灯笼' },
		town: { key: '庭院_远海航船_町中竖牌', clickOffset: [10, -10, 15, -5] },
	},
	'织梦莲庭': {
		explore: { key: '庭院_织梦莲庭_探索灯笼' },
		town: { key: '庭院_织梦莲庭_町中竖牌' },
	},
	'暖池青苑': {
		explore: { key: '庭院_暖池青苑_探索灯笼', misaligned: false },
		town: { key: '庭院_暖池青苑_町中竖牌', misaligned: false },
	},
	'枫色秋庭': {
		explore: { key: '庭院_枫色秋庭_探索灯笼', misaligned: false, clickOffset: [-15, 20, 15, 50] },
		town: { key: '庭院_枫色秋庭_町中竖牌', misaligned: false },
	},
	'暖翠春庭': {
		explore: { key: '庭院_暖翠春庭_探索灯笼' },
		town: { key: '庭院_暖翠春庭_町中竖牌', misaligned: false },
	},
	'雪月华庭': {
		explore: {
			key: '庭院_雪月华庭_探索灯笼',
			clickOffset: [-15, -5, 15, 45],
		},
		town: { key: '庭院_雪月华庭_町中竖牌', misaligned: false },
	},
	'盛夏幽庭': {
		explore: {
			key: '庭院_盛夏幽庭_探索灯笼',
			clickOffset: [-10, -5, 20, 50],
		},
		town: { key: '庭院_盛夏幽庭_町中竖牌', misaligned: false },
	},
} satisfies Record<string, { explore: ICourtyardRule, town: ICourtyardRule }>;

export const courtyardSkinList: ICourtyardSkin[] = (Object.keys(rules) as (keyof typeof rules)[]).map(name => ({
	name,
	explore: [rules[name].explore],
	town: [rules[name].town],
	townHiddenSwipe: name === '暖池青苑',
}));

/** 自动识别时探索入口的尝试顺序 */
export const autoExplore: ICourtyardRule[] = [
	rules['默认庭院'].explore,
	rules['茨心乐园'].explore,
	rules['云景阆苑'].explore,
	rules['治兵武道'].explore,
	rules['望月幽庭'].explore,
	rules['远海航船'].explore,
	rules['缘结之庭'].explore,
	rules['笔墨山河'].explore,
	rules['琼夜淬光'].explore,
	rules['织梦莲庭'].explore,
	rules['暖池青苑'].explore,
	rules['枫色秋庭'].explore,
	rules['狐栖归处'].explore,
];

/** 自动识别时町中入口的尝试顺序，枫色秋庭竖牌优先，避免旧规则在该皮肤上误识别 */
export const autoTown: ICourtyardRule[] = [
	rules['枫色秋庭'].town,
	{ key: townDefault },
	rules['织梦莲庭'].town,
	rules['暖池青苑'].town,
	rules['远海航船'].town,
];

export const courtyardSkinNames: string[] = [COURTYARD_SKIN_AUTO, ...courtyardSkinList.map(item => item.name)];
