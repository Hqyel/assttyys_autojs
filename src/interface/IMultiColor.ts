export interface IMultiFindColorsOrigin {
	[key: string]: {
		region: [number, number, number, number, number, number, number];
		similar?: number;
		desc: [number, number,
			[number, number, number, number][]
		][];
	}
}

export interface IMultiFindColors {
	[key: string]: {
		region: [number, number, number, number, number, number, number];
		similar?: number;
		desc: [
			[number, number, number, number][]
		][];
	}
}

export type IMultiDetectColorDescOrigin = [
	number,
	number,
	[number, number, number, number][]
];

export type IMultiDetectColorDesc = [number, number, number, number][];

export interface IMultiDetectColorsOrigin {
	[key: string]: {
		// similar?: number;  目前暂时用不上
		// 同一界面的不同皮肤或主题使用variants按“或”关系补充。
		desc: IMultiDetectColorDescOrigin;
		variants?: IMultiDetectColorDescOrigin[];
	}
}

export interface IMultiDetectColors {
	[key: string]: {
		// similar?: number;  目前暂时用不上
		// variants保留各部位独立主题的运行时比色数据。
		desc: IMultiDetectColorDesc;
		variants?: IMultiDetectColorDesc[];
	}
}
