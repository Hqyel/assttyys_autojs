import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator } from '@/interface/IFunc';
import { Script } from '@/system/script';
// const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func206 implements IFuncOrigin {
	id = 206;
	name = '六道萤草_宁息';
	operator: IFuncOperatorOrigin[] = [{
		// 0 已适配66 宁息
		desc: [1280, 720,
			[
				[right, 1225, 189, 0xcfe7de],
				[right, 1218, 251, 0x334f5b],
				[right, 1221, 631, 0xdacaa9],
				[left, 26, 42, 0xeaf2f2],
				[left, 252, 39, 0x583716],
				[left, 72, 634, 0x384e5c],
				[right, 1196, 632, 0xd1c1a0],
			]
		],
		oper: [
			[right, 1280, 720, 1187, 600, 1241, 670, 500], // 离开
			[center, 1280, 720, 676, 405, 842, 460, 500], // 确认
			[right, 1280, 720, 1156, 10, 1265, 69, -1], // 金币区域
			[right, 1280, 720, 645, 57, 1192, 716, -1], // 商品区域
			[right, 1280, 720, 701, 570, 1144, 644, 500], // 4-翻页开始区域
			[right, 1280, 720, 713, 110, 1131, 171, 500], // 5-翻页结束区域
			[right, 1280, 720, 545, 569, 604, 625, 1000], // 6-刷新按钮区域
			[right, 1280, 720, 680, 396, 807, 452, 1000], // 7-刷新确认区域
			[right, 1280, 720, 0, 72, 982 - 889, 72 + 460 - 419, 500], // 8-图标大小区域
		]
	}, {
		// 刷新确认
		desc: [1280, 720,
			[
				[left, 26, 42, 0x606464],
				[left, 49, 674, 0x262f33],
				[center, 595, 252, 0xcbb59e],
				[center, 578, 408, 0xdf6851],
				[center, 729, 405, 0xf4b25f],
				[right, 1237, 184, 0x545e5b],
				[center, 671, 223, 0x5e3d2d],
			]
		]
	}, {
		// 购买确认
		desc: [1280, 720,
			[
				[center, 445, 288, 0xcbb59e],
				[left, 25, 40, 0x636767],
				[left, 71, 643, 0x1a2228],
				[right, 1238, 153, 0x505953],
				[center, 834, 309, 0xcbb59e],
				[center, 771, 224, 0x6c4b3a],
				[center, 583, 425, 0xdf6851],
				[center, 810, 429, 0xf4b25f],
			]
		],
		oper: [
			[center, 1280, 720, 675, 407, 841, 457, 500]
		]
	}];
	operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
		if (thisScript.oper({
			id: 206,
			name: '六道萤草_宁息',
			operator: [{
				desc: thisOperator[0].desc,
				retest: 1000,
			}]
		})) {

			/** 调试用，截完图就删 */
			// const ajImg = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(thisScript.helperBridge.helper.GetBitmap());
			// ajImg.saveTo(`/sdcard/Pictures/${new Date().getTime()}.png`);
			// ajImg.recycle();

			const cost = { '腐草为萤': 300, '妖力化身': 300, '六道净化': 200, '萤火之光': 300 };
			let coins = 0;
			const result = thisScript.findText('.+', 0, thisOperator[0].oper[2], '包含');
			if (result.length) {
				coins = parseInt(result[0].label) || 0;
			}
			if (coins >= 200) {
				const confPriorty = thisScript.scheme.config['202'].priority || '腐草为萤,妖力化身,六道净化,萤火之光';
				const priorty = String(confPriorty).split(',') // 未达到目标的优先级
					.filter(item => cost[item] <= coins) // 钱不够的过滤
					.filter(item => (thisScript.global.d6NxFilter || []).indexOf(item) === -1); // 无法购买的过滤
				const priorty2 = ['萤火之光', '妖力化身'] // 达到目标后的优先级
					.filter(item => cost[item] <= coins) // 钱不够的过滤
					.filter(item => (thisScript.global.d6NxFilter || []).indexOf(item) === -1); // 无法购买的过滤

				let toClick = null;
				let type: string = null;
				let overCnt = 0;
				priorty.forEach(item => {
					if (thisScript.global.d6d[item][0] >= thisScript.global.d6d[item][1]) {
						overCnt++;
					}
				});

				// let result2 = ocr.findTextByOcr(thisScript.getOcr(), function () {
				// 	thisScript.keepScreen(); // 更新图片
				// 	return thisScript.helperBridge.helper.GetBitmap(); // 返回bmp
				// }, '.+', 0, thisOperator[0].oper[3], '包含');

				if (overCnt < priorty.length) {
					for (let i = 0; i < priorty.length; i++) {
						if (thisScript.global.d6d[priorty[i]][0] >= thisScript.global.d6d[priorty[i]][1]) {
							continue;
						}
						// const p = ocr.findTextByOcrResult(priorty[i], result2, '模糊', .65);
						const p = thisScript.findMultiColor(`六道萤草_宁息_${priorty[i]}`); // 用仿造的色组
						if (p) {
							// toClick = [p[0].points[0].x, p[0].points[0].y, p[0].points[2].x, p[0].points[2].y, 500];
							toClick = [p.x + thisOperator[0].oper[8][0], p.y + thisOperator[0].oper[8][1], p.x + thisOperator[0].oper[8][2], p.y + thisOperator[0].oper[8][3], thisOperator[0].oper[8][4]];
							console.log(p);
							type = priorty[i];
							break;
						}
					}
				} else {
					for (let i = 0; i < priorty2.length; i++) {
						if (thisScript.global.d6d[priorty2[i]][0] >= 5) {
							continue;
						}
						// const p = ocr.findTextByOcrResult(priorty2[i], result2, '模糊', .65);
						const p = thisScript.findMultiColor(`六道萤草_宁息_${priorty2[i]}`); // 用仿造的色组
						if (p) {
							// toClick = [p[0].points[0].x, p[0].points[0].y, p[0].points[2].x, p[0].points[2].y, 500];
							toClick = [p.x + thisOperator[0].oper[8][1], p.y + thisOperator[0].oper[8][1], p.x + thisOperator[0].oper[8][2], p.y + thisOperator[0].oper[8][3], thisOperator[0].oper[8][4]];
							console.log(p);
							type = priorty2[i];
							break;
						}
					}
				}
				if (!toClick) {
					// 没找到就执行下一个操作
					if (typeof thisScript.global.d6NextStation === 'undefined' || thisScript.global.d6NextStation === '翻页') {
						thisScript.regionBezierSwipe(thisOperator[0].oper[4], thisOperator[0].oper[5], [400, 1000], 200);
						thisScript.global.d6NextStation = '刷新';
					} else if (thisScript.global.d6NextStation === '刷新' && coins >= 300) {
						thisScript.regionClick([thisOperator[0].oper[6]]);

						// 刷新没有确认了，该逻辑作废
						// if (thisScript.compareColorLoop(thisOperator[1].desc, 800)) {
						// 	// 刷新弹出确认，没有到上限
						// 	thisScript.regionClick([thisOperator[0].oper[7]]);
						// 	// 刷新后再翻回来
						// 	thisScript.regionBezierSwipe(thisOperator[0].oper[5], thisOperator[0].oper[4], [400, 1000], 200);
						// } else {
						// 	// 刷新没退出确认，到上限了，直接退出
						// 	thisScript.regionClick([thisOperator[0].oper[0], thisOperator[0].oper[1]]);
						// }
						// 刷新或退出重置相关状态
						if (typeof thisScript.global.d6NxRefreshCnt === 'undefined') {
							thisScript.global.d6NxRefreshCnt = 0;
						}
						if (thisScript.global.d6NxRefreshCnt >= 3) {
							thisScript.regionClick([thisOperator[0].oper[0], thisOperator[0].oper[1]]);
							// 退出后重置相关状态
							thisScript.global.d6NxRefreshCnt = 0;
							thisScript.global.d6NxFilter = [];
							thisScript.global.d6NextStation = '翻页';
						} else {
							thisScript.regionBezierSwipe(thisOperator[0].oper[5], thisOperator[0].oper[4], [400, 1000], 200);
							thisScript.global.d6NxRefreshCnt++;
						}
						thisScript.global.d6NxFilter = [];
						thisScript.global.d6NextStation = '翻页';
					} else {
						thisScript.regionClick([thisOperator[0].oper[0], thisOperator[0].oper[1]]);
						// 退出后重置相关状态
						thisScript.global.d6NxRefreshCnt = 0;
						thisScript.global.d6NxFilter = [];
						thisScript.global.d6NextStation = '翻页';
					}
				} else {
					thisScript.regionClick([toClick]);
					// 购买确认，如果超时无确认则表示该商品已经被买过了，增加过滤，已经买过的也增加过滤，过滤在刷新与退出后重置
					if (thisScript.compareColorLoop(thisOperator[2].desc, 800)) {
						thisScript.regionClick([thisOperator[0].oper[1]]);
						// 已购买的buff增加过滤
						if (!thisScript.global.d6NxFilter) thisScript.global.d6NxFilter = [];
						thisScript.global.d6NxFilter.push(type);
					} else {
						// // 无法购买的增加过滤
						// if (!thisScript.global.d6NxFilter) thisScript.global.d6NxFilter = [];
						// thisScript.global.d6NxFilter.push(type);
						// thisScript.myToast(`${type}无法购买，增加过滤`);
					}
					if (thisScript.global.d6d[type][0] === 0) {
						thisScript.global.d6LoadBuff = true;
					}
					// 拿到所有buff后再装buff
					if (thisScript.global.d6LoadBuff) {
						let hasCnt = 0;
						['腐草为萤', '妖力化身', '六道净化', '萤火之光'].forEach(name => hasCnt += Math.min(thisScript.global.d6d[name][0], 1));
						if (hasCnt < 4) thisScript.global.d6LoadBuff = false;
					}
					thisScript.global.d6d[type][0]++;
					if (thisScript.global.d6LoadBuff) {
						thisScript.myToast('准备装buff');
					}
					thisScript.myToast(`当前buff：${['腐草为萤', '妖力化身', '六道净化', '萤火之光'].map(name => name + ':' + thisScript.global.d6d[name][0]).join(', ')}`);
				}
			} else {
				thisScript.myToast('钱不够用，撤退');
				thisScript.regionClick([thisOperator[0].oper[0], thisOperator[0].oper[1]]);
				// 退出后重置相关状态
				thisScript.global.d6NxRefreshCnt = 0;
				thisScript.global.d6NxFilter = [];
				thisScript.global.d6NextStation = '翻页';
			}
			return true;
		}
		return false;
	}
}