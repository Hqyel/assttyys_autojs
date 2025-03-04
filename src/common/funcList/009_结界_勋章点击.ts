import { Script } from '@/system/script';
import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator } from '@/interface/IFunc';

// const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func009 implements IFuncOrigin {
	id = 9;
	name = '结界_勋章点击';
	desc = '在突破界面点击勋章，可配置点击勋章的优先级';
	config = [{
		desc: '',
		config: [{
			name: 'priority',
			desc: '挑战顺序',
			type: 'list',
			data: ['呱太->4->5->3->2->1->0', '呱太->5->4->3->2->1->0', '呱太->0->1->2->3->4->5'],
			default: '呱太->4->5->3->2->1->0',
			value: null,
		}, {
			name: 'scheme_switch_enabled',
			desc: '识别到攻打第一排第一列结界则切换方案',
			type: 'switch',
			default: false,
		}, {
			name: 'next_scheme',
			desc: '下一个方案',
			type: 'scheme',
			default: '个突_9退4_退出',
		}]
	}];
	operator: IFuncOperatorOrigin[] = [{
		// 0 突破界面
		desc: '突破界面',
		oper: [
			[left, 1280, 720, 30, 10, 160, 80, 500],
			[left, 1280, 720, 80, 0, 40, 0, 500],
			[left, 1280, 720, 160, 492, 824, 54, 0], // 头像框 横轴坐标内
			[left, 1280, 720, 0, 0, 0, 0, 0],
		]
	}, {
		// 1 第一排第一列结界坐标
		desc: '突破界面',
		oper: [
			// [left, 1280, 720, 0, 0, 1279, 719, 500]
			[left, 1280, 720, 147, 146, 465, 265, 500]
		]
	}, { // 2 解锁阵容
		desc: [
			1280, 720,
			[
				[center, 818, 599, 0xbdaef2],
				[center, 853, 599, 0xbab4f4],
				[center, 830, 595, 0x886d4a],
				[center, 830, 601, 0x836847],
				[center, 852, 601, 0xb6b6ff],
				[left, 74, 168, 0xd4bb9d],
				[left, 36, 456, 0x5e606b],
			]
		],
		oper: [
			[center, 1280, 720, 821, 593, 850, 609, 1000],
		]
	}, { // 3 解锁阵容_寮突破
		desc: [
			1280, 720,
			[
				[left, 198, 617, 0xbfaef2],
				[left, 233, 616, 0xbdb2e9],
				[left, 209, 613, 0x886e4b],
				[left, 210, 621, 0x846947],
				[left, 233, 618, 0xb6b6ff],
				[right, 1214, 284, 0x5e3c27],
				[right, 1211, 405, 0x8b5221],
			]
		],
		oper: [
			[center, 1280, 720, 202, 608, 227, 628, 1000],
		]
	}, { // 4 九退四_第一个结界
		desc: [
			1280, 720,
			[
				[left, 247, 161, 0xdacdbd],
				[center, 445, 162, 0xdacdbd],
				[center, 443, 231, 0xdacdbd],
				[left, 157, 250, 0xceb9ac],
				[left, 178, 177, 0x613f21],
			]
		],
		oper: [
			[center, 1280, 720, 275, 160, 438, 251, 1000],
		]
	}];
	operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
		// 九退四_退出时只点击第一个结界保底操作
		let thisconf_0 = null;
		if (thisScript.scheme.config['0']) {
			thisconf_0 = thisScript.scheme.config['0'];
		}
		if (thisconf_0 && thisconf_0.jspd_enabled_2 && thisconf_0.jspd_times_2 === '4') {
			return thisScript.oper({
				name: '九退四_退出_保底操作',
				operator: [thisOperator[4]]
			})
		}
		if (thisScript.oper({
			name: '突破界面_判断',
			operator: [thisOperator[2], thisOperator[3]]
		})) {
			return true;
		}
		if (thisScript.oper({
			name: '突破界面_判断',
			operator: [{ desc: thisOperator[0].desc }]
		}, 0)) {
			const thisconf = thisScript.scheme.config['9']; // 获取配置
			const priority = String(thisconf.priority).split('->');
			const multiColorKey = [];
			for (const item of priority) {
				multiColorKey.push(`结界_${item}勋章`);
			}
			for (const key of multiColorKey) {
				const point = thisScript.findMultiColor(key);
				const add = thisOperator[0].oper[3];
				if (point) {
					const oper = [[
						point.x + thisOperator[0].oper[0][0] + add[0],
						point.y + thisOperator[0].oper[0][1] + add[1],
						point.x + thisOperator[0].oper[0][2] + add[2],
						point.y + thisOperator[0].oper[0][3] + add[3],
						thisOperator[0].oper[0][4]]];
					thisScript.regionClick(oper);
					// 第一排第一列结界坐标
					const fristFirstOper = thisOperator[1].oper[0] // [147, 146, 465, 265];
					if (Number(oper[0][0]) > fristFirstOper[0] && Number(oper[0][1]) > fristFirstOper[1] && Number(oper[0][2]) < fristFirstOper[2] && Number(oper[0][3]) < fristFirstOper[3]) {
						console.log('检测点击范围在第一排第一列结界内');
						if (thisconf && thisconf.scheme_switch_enabled) {
							thisScript.rerun(thisconf.next_scheme);
							sleep(3000);
							return;
						}
					}
					console.log(key);
					return true;
				}
			}
			return false;
		}
		return false;
	}
}
