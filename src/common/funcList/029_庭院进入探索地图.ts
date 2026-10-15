import { Script } from '@/system/script';
import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator } from '@/interface/IFunc';
// const normal = -1; // 定义常量
// const left = 0;
// const center = 1;
const right = 2;

export class Func029 implements IFuncOrigin {
	id = 29;
	name = '庭院进入探索地图';
	desc = '识别庭院中的探索入口并进入探索地图界面';
	operator: IFuncOperatorOrigin[] = [{
		// 庭院未打开菜单
		desc: '页面是否为庭院_菜单未展开_只支持默认庭院皮肤与默认装饰',
		oper: [
			[right, 1280, 720, 0, 0, 32, 63, 1200]
		]
	}, { // 庭院已打开菜单
		desc: '页面是否为庭院_菜单已展开_只支持默认庭院皮肤与默认装饰'
	}]
	operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
		const isCourtyard = thisScript.oper({
			name: '庭院判断',
			operator: [{
				desc: thisOperator[0].desc
			}, {
				desc: thisOperator[1].desc
			}]
		});
		if (!isCourtyard) return false;

		// 识别规则见 src/common/courtyardSkin.ts，设置中选择庭院皮肤后仅使用对应皮肤的规则
		const entry = thisScript.findCourtyardExploreEntry();
		if (!entry) return false;

		const point = entry.point;
		const offset = entry.clickOffset || [
			0,
			0,
			thisOperator[0].oper[0][2],
			thisOperator[0].oper[0][3]
		];
		thisScript.regionClick([[
			point.x + offset[0],
			point.y + offset[1],
			point.x + offset[2],
			point.y + offset[3],
			thisOperator[0].oper[0][4]
		]]);
		return true;
	}
}
