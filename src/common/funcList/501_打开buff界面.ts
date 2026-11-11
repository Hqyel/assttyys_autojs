import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator } from '@/interface/IFunc';
import { Script } from '@/system/script';

// const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func501 implements IFuncOrigin {
	id = 501;
	name = '打开BUFF界面';
	desc = '支持从探索地图、庭院、组队打开buff界面';
	config = [{
		desc: '',
		config: [{
			name: 'once',
			desc: '开关过buff后不再打开buff界面',
			type: 'switch',
			default: false
		}],
	}];
	operator: IFuncOperatorOrigin[] = [{
		// 0 旧版探索地图；不能复用含新版候选的通用地图规则。
		desc: [1280, 720,
			[
				[left, 36, 36, 0xf7e3a5],
				[left, 117, 26, 0xf7efb5],
				[right, 1164, 25, 0xd6b289],
				[right, 1223, 23, 0xd6ad86],
				[center, 508, 35, 0x731c10],
			]
		],
		oper: [
			[center, 1280, 720, 412, 32, 441, 62, 1500],
		]
	}, {
		// 1 庭院
		desc: [1280, 720,
			[
				[left, 327, 45, 0x7a5825],
				[right, 1156, 37, 0xd7b28a],
				[right, 1229, 48, 0xcfa676],
				[right, 1228, 650, 0xd6c6c3],
				[center, 337, 72, 0x765828]
			]
		],
		oper: [
			[center, 1280, 720, 359, 45, 396, 74, 1500]
		]
	}, {
		// 2 组队界面
		desc: [1280, 720,
			[
				[center, 642, 3, 0x101011],
				[left, 42, 38, 0xf7e8aa],
				[center, 641, 52, 0x080c0a],
				[center, 648, 571, 0x422c29],
				[center, 816, 54, 0xfefbe4],
			]
		],
		oper: [
			[left, 1280, 720, 35, 27, 62, 55, 600] // [center, 1280, 720, 799, 38, 828, 76, 1500] 不管是队长还是队员，先退队伍在关闭buff
		]
	}, {
		// 3 新版探索地图：加成入口已移动到左上角挑战券之前。
		desc: [1280, 720,
			[
				[left, 244, 45, 0xfce8d0],
				[left, 250, 42, 0x54524c],
				[left, 255, 53, 0x333331],
				[left, 264, 61, 0xfce8cf],
				[left, 280, 650, 0xe0b557],
				[left, 290, 650, 0xe6d3d3],
				[left, 300, 650, 0x7a0d0d],
			]
		],
		oper: [
			[left, 1280, 720, 244, 36, 264, 62, 1500],
		]
	}];
	operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
		const thisconf = thisScript.scheme.config['501'];
		if (thisconf?.once && (thisScript.runTimes['40'] > 0 || thisScript.runTimes['50'] > 0)) {
			return false;
		} else {
			if (thisScript.oper({
				name: '打开buff界面',
				operator: [thisOperator[3], ...thisOperator.slice(0, 3)]
			})) {
				return true;
			}
		}
	}
}
