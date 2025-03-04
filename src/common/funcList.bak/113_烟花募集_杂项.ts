import { IFuncOrigin, IFuncOperatorOrigin, type IFuncOperator } from '@/interface/IFunc';
import type { Script } from '@/system/script';
// const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func113 implements IFuncOrigin {
	id = 113;
	name = '烟花募集_杂项';
	operator: IFuncOperatorOrigin[] = [{
		// 开始
		desc: [1280, 720,
			[
				[left, 41, 37, 0xf6e7a8],
				[right, 1176, 593, 0xe4d9c2],
				[left, 75, 483, 0xffefe9],
				[left, 74, 382, 0xffd7b0],
				[right, 1226, 40, 0xd7c4a1],
				[left, 252, 36, 0x593716],
			]
		],
		oper: [
			[right, 1280, 720, 1131, 573, 1245, 664, 1000]
		]
	}, {
		// 游戏结束，再来一次
		desc: [1280, 720,
			[
				[center, 109, 269, 0x322f63],
				[center, 439, 552, 0x515ba9],
				[center, 854, 551, 0xf6a664],
				[center, 719, 224, 0xdbf2ff],
				[center, 529, 183, 0xd1ae86],
			]
		],
		oper: [
			[center, 1280, 720, 418, 531, 598, 575, 1000]
		]
	}, {
		desc: [1280, 720,
			[
				[left, 38, 40, 0x655f45],
				[right, 1121, 100, 0xe8d4cf],
				[center, 500, 558, 0x6e69c1],
				[right, 1184, 674, 0x32261b],
				[center, 475, 105, 0x2e3377],
			]
		],
		oper: [
			[center, 1280, 720, 1108, 85, 1139, 120, 1000]
		]
	}];


	operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
		let curCnt = 0;
		const maxCount = 5;
		while (thisScript.oper({
			name: '烟花募集_开始',
			operator: [thisOperator[0]],
		})) {
			curCnt++;
			thisScript.keepScreen();
			if (curCnt >= maxCount) {
				thisScript.myToast(`连续执行${maxCount}次挑战后未开始，脚本自动停止`);
				thisScript.doPush(thisScript, { text: `[${thisScript.schemeHistory.map(item => item.schemeName).join('、')}]已停止，请查看。`, before() { thisScript.myToast('脚本即将停止，正在上传数据'); } });
				thisScript.stop();
				sleep(2000);
				return false;
			}
		}
		if (curCnt) {
			return true;
		}
		return thisScript.oper({
			name: '烟花募集_其他杂项',
			operator: [thisOperator[1], thisOperator[2]]
		});
	}
}