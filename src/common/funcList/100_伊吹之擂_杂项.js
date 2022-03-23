const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export default {
	id: 100,
	name: '伊吹之擂_杂项',
	desc: '开启、',
	operator: [{
		// 开启
		desc: [1280,720,
			[[left,45,40,0xf5e5a3],
			[right,1193,603,0x673028],
			[right,926,642,0xd8b786],
			[right,935,620,0x834139],
			[left,294,419,0xd7c0ae]]
		],
		oper: [
			[right, 1280, 720, 1147,600, 1207,668, 1000]
		]
	}, {
		// 结果继续
		desc: [1280,720,
			[[center,326,599,0xd59c84],
			[center,663,599,0xdca38a],
			[center,966,596,0xdba58e],
			[right,1180,606,0xc49b72],
			[left,46,42,0x9c8f68]]
		],
		oper: [
			[right, 1280, 720, 1148,610, 1195,670, 1000]
		]
	}, {
		// 结果继续2
		desc: [1280,720,
			[[left,43,41,0x9d916d],
			[center,530,43,0x8b7769],
			[center,526,144,0xf2e28f],
			[center,774,124,0x844f44]]
		],
		oper: [
			[right, 1280, 720, 179,586, 1143,659, 1000]
		]
	}, {
		// 公布最终结果
		desc: [1280,720,
			[[center,504,39,0xc29168],
			[center,779,41,0xc19163],
			[center,141,231,0xe3cfb9],
			[center,419,336,0xe3d1ba],
			[center,765,234,0xe3d1ba],
			[center,1080,232,0xe3cfb8],
			[center,1051,187,0x412826],
			[center,512,282,0x442828]]
		],
		oper: [
			[right, 1280, 720, 647,506, 1186,676, 1000]
		]
	}, {
		// 公布最终结果2
		desc: [1280,720,
			[[right,1246,90,0xaa574f],
			[right,1219,200,0x8a6060],
			[right,1194,308,0x8c6262],
			[right,1164,416,0x8c6162],
			[right,1198,593,0xebd992],
			[right,456,112,0x861614]]
		],
		oper: [
			[right, 1280, 720, 282,643, 1073,697, 1000]
		]
	}],
}