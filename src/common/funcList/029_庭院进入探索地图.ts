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

		let isQiongyeCourtyard = false;
		const point = thisScript.findCourtyardPoint(() => {
			let courtyardPoint = thisScript.findMultiColor('庭院_探索灯笼');
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_茨心乐园_探索灯笼'
				);
			}
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_云景阆苑_探索灯笼'
				);
			}
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_治兵武道_探索灯笼'
				);
			}
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_望月幽庭_探索灯笼'
				);
			}
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_缘结之庭_探索灯笼'
				);
			}
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_笔墨山河_探索灯笼'
				);
			}
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_琼夜淬光_探索灯笼'
				);
				isQiongyeCourtyard = !!courtyardPoint;
			}
			if (!courtyardPoint) {
				courtyardPoint = thisScript.findMultiColor(
					'庭院_织梦莲庭_探索灯笼'
				);
			}
			if (!courtyardPoint) {
				const foxLanternPoints = thisScript.findMultiColorEx(
					'庭院_狐栖归处_功能灯笼'
				).sort((a, b) => a.x - b.x);
				courtyardPoint = foxLanternPoints[0];
			}
			return courtyardPoint;
		});
		if (!point) return false;

		const oper = isQiongyeCourtyard ? [[
			point.x + 12,
			point.y - 10,
			point.x + 24,
			point.y + 2,
			thisOperator[0].oper[0][4]
		]] : [
			[
				point.x,
				point.y,
				point.x + thisOperator[0].oper[0][2],
				point.y + thisOperator[0].oper[0][3],
				thisOperator[0].oper[0][4]
			]
		];
		thisScript.regionClick(oper);
		return true;
	}
}
