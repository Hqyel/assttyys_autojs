import { Script } from '@/system/script';
import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator } from '@/interface/IFunc';
// const normal = -1; //定义常量
const left = 0;
const center = 1;
// const right = 2;

export class Func020 implements IFuncOrigin {
	id = 20;
	name = '百鬼夜行_随机散豆';
	desc = '在百鬼夜行的界面，随机自由散豆';
	config = [{
		desc: '',
		config: [{
			name: 'mode',
			desc: '模式，快速模式用于清票，开始后以最快速度进行撒豆',
			type: 'list',
			data: ['快速模式', '普通模式', '目标检测'],
			default: '普通模式',
			value: null,
		}, {
			name: 'capScreen',
			desc: '是否开启截图，仅普通模式下起作用，每8秒截一张图(dev)',
			type: 'switch',
			default: false,
		}]
	}];
	operator: IFuncOperatorOrigin[] = [{
		desc: [1280, 720,
			[
				[left, 45, 42, 0xf5e5a3],
				[center, 242, 657, 0xf3b969],
				[center, 640, 65, 0x1C1321],
				[center, 598, 31, 0x201723],
				[center, 458, 583, 0x4f1e2c],
				[center, 371, 657, 0xffcf7a],
				[center, 392, 660, 0x422d2a],
				[center, 429, 658, 0x38272f]
			]
		],
		oper: [
			[center, 1280, 720, 388, 646, 413, 667, 1],
			[center, 1280, 720, 617, 643, 652, 675, 1]
		]
	}, {
		desc: [1280, 720,
			[
				[left, 45, 42, 0xf5e5a3],
				[center, 242, 657, 0xf3b969],
				[center, 640, 65, 0x1C1321],
				[center, 598, 31, 0x201723],
				[center, 458, 583, 0x4f1e2c]
			]
		],
		oper: [
			[center, 1280, 720, 90, 270, 1252, 528, 10]
		]
	}, {
		desc: [1280, 720,
			[
				[left, 45, 42, 0xf5e5a3],
				[center, 242, 657, 0xf3b969],
				[center, 640, 65, 0x1C1321],
				[center, 598, 31, 0x201723],
				[center, 458, 583, 0x4f1e2c]
			]
		],
		oper: [
			[center, 1280, 720, 90, 270, 1252, 528, 500]
		]
	}];
	operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
		const thisconf = thisScript.scheme.config['20'];

		if (thisconf && thisconf.mode === '目标检测') {
			// if (thisScript.oper({
			// 	id: 20,
			// 	name: '百鬼夜行_随机散豆_拖10豆',
			// 	operator: [{
			// 		desc: thisOperator[0].desc
			// 	}]
			// })) {
			// 	thisScript.regionSwipe(thisOperator[0].oper[0], thisOperator[0].oper[1], [100, 300], 200);
			// 	return true;
			// }
			if (thisScript.oper({
				id: 20,
				name: '百鬼夜行_随机散豆_目标检测',
				operator: [{
					desc: thisOperator[1].desc
				}]
			})) {
				const ajImg = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(thisScript.helperBridge.helper.GetBitmap());
				thisScript.ncnnBgyx.detect(ajImg);
				return true;
			}
		}
		if (thisconf && thisconf.mode === '快速模式') {
			if (thisScript.oper({
				id: 20,
				name: '百鬼夜行_随机散豆_拖10豆',
				operator: [{
					desc: thisOperator[0].desc
				}]
			})) {
				thisScript.regionSwipe(thisOperator[0].oper[0], thisOperator[0].oper[1], [100, 300], 200);
				return true;
			}
			return thisScript.oper({
				id: 20,
				name: '百鬼夜行_随机散豆',
				operator: [thisOperator[1]]
			});
		}
		if (thisScript.oper({
			id: 20,
			name: '百鬼夜行_随机散豆',
			operator: [{ desc: thisOperator[2].desc }]
		})) {
			if (thisconf && thisconf.capScreen) {
				// 截图
				if (typeof thisScript.global.bgyxLastCapture === 'undefined') {
					thisScript.global.bgyxLastCapture = 0;
				}
				// 当前时间 - 上次截图时间 > 8 秒 则截图
				const now = new Date().getTime();
				if (now - thisScript.global.bgyxLastCapture > 8000) {
					thisScript.global.bgyxLastCapture = now;

					const ajImg = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(thisScript.helperBridge.helper.GetBitmap());
					const path = `/sdcard/assttyys/bgyxImg/${now}.png`;
					files.ensureDir(path);
					ajImg.saveTo(path);
					ajImg.recycle();
				}
			}
			thisScript.regionClick(thisOperator[2].oper);
			return true;
		}
	}
}
