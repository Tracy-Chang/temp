/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//地址
	Mock.mock(/\/address\/query/,
		{
			"resultcode":1, //1成功 0失败
			"result|1-3": [
				{
					"id": "id",
					"address": "新龙城36d三单元", //地址  50
					"phone": "10086",	//11
					"name": "李元霸"   //16
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//订单
	Mock.mock(/\/shopping\/query/,
		{
			"result": {
				"time": 1,
				"carriagePrice": 2.00, //运费
				"list|2-4": [
				  	{
					    "code|+1": 1,
					    "count|1-12": 12,
					    "detail|1-2": "百事可乐330ml听装",
					    "id": "8",
					    "price": "1.80",
					    "url": "../static/images/commodity.jpg"
				  	}
				],
				"remark|20": "备注"
			},
			"resultcode": "1",
			"resultmsg": "查询成功"
		}
	);
	//优惠券list
	Mock.mock(/\/coupon/,
		{
			"resultcode":1, //1成功 0失败
			"result|3-5": [
				{
					"id": 1,
					"type|+1": 1, 
					"useTime": "2017-09-23",
					"name": "满五减一",
					"isUse|+1": 1,
					"typeDetail": [5, 2]
				},
				{
					"id": 2,
					"type": 2, 
					"useTime": "2017-09-23",
					"name": "满五减一",
					"isUse|+1": 1,
					"typeDetail": 1
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//提交订单
	Mock.mock(/\/order\/add/,
		{
			"resultcode":1, //1成功 0失败
			"result": {
				"formId": "LS2017061571606757775"
			},
			"resultmsg":"获取成功"
		}
	);
	//del订单
	Mock.mock(/\/shopping\/delete/,
		{
			"resultcode":1, //1成功 0失败
			"result":{},
			"resultmsg":"删除成功"
		}
	);
});