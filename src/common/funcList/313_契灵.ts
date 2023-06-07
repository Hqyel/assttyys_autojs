import { IFuncOrigin, IFuncOperatorOrigin, IFuncOperator, IFuncConfigOrigin } from '@/interface/IFunc';
import { Script } from '@/system/script';
const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func313 implements IFuncOrigin {
  id = 313;
  name = '契灵';
  desc: '循环追踪，无追踪后石头召唤，无石头则持续探查(游戏里预设需设置成：火灵阵容放在第四组第一个，小黑第二个，镇墓兽第三个，茨球第四个。探查阵容放在第五组第一个)';
  operator: IFuncOperatorOrigin[] = [{//0   契灵界面
    desc: [
      1280, 720,
      [
        [left, 44, 38, 0xf5e6a5],
        [left, 133, 36, 0xf5f1e0],
        [left, 177, 36, 0xf6f2e1],
        [left, 222, 38, 0xf4f0df],
        [left, 276, 34, 0xedc958],
        [right, 1191, 485, 0x755bc7],
      ]
    ]
  }, {//1 追踪
    desc: [
      1280, 720,
      [
        [right, 1180, 478, 0xa69fcf],
        [right, 1192, 487, 0x6d6bc1],
        [right, 1165, 612, 0xfef4e6],
        [right, 1210, 608, 0xfdf3e5],
        [right, 1156, 634, 0xfef4e6],
        [right, 1174, 638, 0xfef4e6],
        [right, 1192, 631, 0xfdf3e5],
        [right, 1211, 630, 0xfef4e6],
      ]
    ],
    oper: [
      [center, 1280, 720, 1148, 602, 1225, 664, 4000],
      // [center, 1280, 720, 18, 472, 79, 501, 3000],
    ]
  }, {//2  探查
    desc: [
      1280, 720,
      [
        [right, 1155, 605, 0xfef4e6],
        [right, 1181, 598, 0xfef4e6],
        [right, 1197, 613, 0xfef4e6],
        [right, 1202, 600, 0xfef4e6],
        [right, 1161, 642, 0xe4652b],
        [right, 1171, 650, 0xe85f29],
        [right, 1189, 648, 0xfdf3e5],
      ]
    ],
    oper: [
      [center, 1280, 720, 1139, 586, 1223, 668, 2000],
    ]
  }, {//3  契灵式神录 
    oper: [
      [center, 1280, 720, 944, 568, 982, 600, 1000],//契灵式神录 
      [center, 1280, 720, 15, 1000, -1, -1, -1],//找色后加范围
      [center, 1280, 720, 1160, 475, 1198, 502, 500],//石头召唤
      [center, 1280, 720, 609, 122, 670, 170, 1000],//连线一号
      [center, 1280, 720, 809, 263, 881, 318, 1000],//连线二号
      [center, 1280, 720, 729, 509, 801, 564, 1000],//连线三号
    ]
  }, {//4  契灵挑战
    desc: [
      1280, 720,
      [
        [center, 846, 645, 0xd9caa1],
        [center, 870, 633, 0xeadfae],
        [center, 867, 663, 0xc4aa88],
        [center, 861, 648, 0x533332],
        [right, 1174, 641, 0xff8f2f],
        [right, 1197, 606, 0xfef4e6],
      ]
    ],
    oper: [
      [center, 1280, 720, 1154, 594, 1235, 665, 1000],
    ]
  }, {//5   结契失败
    desc: [
      1280, 720,
      [
        [center, 512, 297, 0xbbbbbb],
        [center, 610, 277, 0xbbbbbb],
        [center, 684, 295, 0xb0b0b0],
        [center, 785, 296, 0xc0c0c0],
        [right, 1204, 590, 0x875015],
        [right, 1206, 627, 0x6c5220],
      ]
    ],
    oper: [
      [center, 1280, 720, 444, 552, 814, 701, 1000],
    ]
  }, {//6  结契成功
    desc: [
      1280, 720,
      [
        [center, 844, 44, 0x664d29],
        [center, 862, 46, 0xe5ce89],
        [center, 872, 45, 0xe5ce89],
        [center, 892, 51, 0xe4cd88],
        [center, 898, 52, 0xd9c280],
        [center, 877, 60, 0xe5ce89],
      ]
    ],
    oper: [
      [center, 1280, 720, 173, 534, 615, 691, 1000],
      [center, 1280, 720, 173, 534, 615, 691, 1000],
    ]
  }, {//7  棋盘
    desc: [
      1280, 720,
      [
        [left, 42, 346, 0x926d32],
        [center, 408, 263, 0x976f32],
        [center, 485, 337, 0x2e1b19],
        [center, 862, 337, 0x2e1b19],
        [center, 850, 270, 0x663f20],
        [right, 1057, 337, 0x2e1b19],
        [right, 1173, 286, 0x882c26],
      ]
    ],
    oper: [
      [center, 1280, 720, 312, 378, 385, 454, 1000],
    ]
  }, {//8 结契成功
    desc: [
      1280, 720,
      [
        [center, 513, 237, 0xe1de9f],
        [center, 600, 231, 0xd6cd7b],
        [center, 688, 235, 0xdcd98e],
        [center, 791, 237, 0xe5e5b7],
      ]
    ],
    oper: [
      [center, 1280, 720, 372, 548, 846, 687, 1000],
    ]
  }, {//9  画线
    desc: [
      1280, 720,
      [
        [center, 701, 228, 0x4d3510],
        [center, 494, 371, 0x5d4618],
        [center, 722, 471, 0x554016],
        [center, 500, 197, 0xbd9a4c],
        [center, 636, 573, 0xbd9036],
        [center, 779, 197, 0xbd9949],
      ]
    ]
  }, {//10  石头召唤选镇墓兽确认
    desc: [
      1280, 720,
      [
        [center, 524, 623, 0xfee3bb],
        [center, 597, 629, 0xe4d8c3],
        [center, 669, 630, 0xd9c9b3],
        [center, 729, 630, 0xf5efdc],
        [center, 773, 626, 0xffe4c9],
        [right, 1165, 628, 0xfefcea],
        [right, 1196, 636, 0xfefcea],
      ]
    ],
    oper: [
      [center, 1280, 720, 970, 286, 1087, 435, 1000],
      [center, 1280, 720, 1151, 609, 1225, 667, 5000],
    ]
  }]
  operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
    if (thisScript.oper({
      name: '契灵界面',
      operator: [thisOperator[0]]
    }) && thisScript.oper({
      name: '追踪',
      operator: [thisOperator[1]]
    })) {
      return true;
    }

    if (thisScript.oper({
      name: '契灵界面',
      operator: [thisOperator[0]]
    }) && thisScript.oper({
      name: '探查',
      operator: [{ desc: thisOperator[2].desc }]
    })) {
      if (thisScript.global.qiling_Position) {
        thisScript.helperBridge.regionClick([thisScript.global.qiling_Position], thisScript.scheme.commonConfig.afterClickDelayRandom);
        thisScript.global.qiling_Position = null;
        return true;
      }
      let arrFind = [`契灵_火灵`, `契灵_小黑`, `契灵_镇墓兽`, `契灵_茨球`]
      for (var i = 0; i < 4; i++) {
        const p = thisScript.findMultiColor(arrFind[i])
        if (p) {
          const toClick = p;
          const toClickRegion = [
            toClick.x,
            toClick.y,
            toClick.x + thisOperator[3].oper[1][0],
            toClick.y + thisOperator[3].oper[1][0],
            thisOperator[3].oper[1][1],
          ];
          thisScript.global.qiling_Position = toClickRegion;
          break;
        }
      }
      if (i == 4) {
        thisScript.helperBridge.regionClick([thisOperator[3].oper[2]], thisScript.scheme.commonConfig.afterClickDelayRandom);
        thisScript.global.qiling_Position = thisOperator[2].oper[0];
      }
      switch (i) {
        case 0:
          thisScript.global.qiling_groupNum = 4;
          thisScript.global.qiling_defaultNum = 1;
          break;
        case 1:
          thisScript.global.qiling_groupNum = 4;
          thisScript.global.qiling_defaultNum = 2;
          break;
        case 2:
          thisScript.global.qiling_groupNum = 4;
          thisScript.global.qiling_defaultNum = 3;
          break;
        case 3:
          thisScript.global.qiling_groupNum = 4;
          thisScript.global.qiling_defaultNum = 4;
          break;
        case 4:
          thisScript.global.qiling_groupNum = 5;
          thisScript.global.qiling_defaultNum = 1;
          break;
      }
      if (thisScript.global.qiling_last === null) {
        thisScript.global.qiling_last = i;
        thisScript.helperBridge.regionClick([thisOperator[3].oper[0]], thisScript.scheme.commonConfig.afterClickDelayRandom);
      } else if (!(thisScript.global.qiling_last === i)) {
        thisScript.helperBridge.regionClick([thisOperator[3].oper[0]], thisScript.scheme.commonConfig.afterClickDelayRandom);
      }
      thisScript.global.change_shikigami_state = 'flushed'
      return true;

    }

    if (thisScript.oper({
      name: '契灵战斗',
      operator: [thisOperator[4], thisOperator[5], thisOperator[6],
      thisOperator[7], thisOperator[8],
      ]
    })) {
      return true;
    }

    if (thisScript.oper({
      name: '契灵划线',
      operator: [thisOperator[9]]
    })) {
      // gesture(1000, [[428, 283], [635, 144], [846, 294]])
      thisScript.helperBridge.regionGesture(1000, [thisOperator[3].oper[3], thisOperator[3].oper[4], thisOperator[3].oper[5]]);
      return true;
    }

    if (thisScript.oper({
      name: '石头召唤确认',
      operator: [thisOperator[10]]
    })){
      thisScript.global.qiling_last = null;
      thisScript.global.qiling_Position= null;
      return true;
    }
      return false;
  }
}