/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//订单
	Mock.mock(/\/order\/queryU/,
		{
			"resultcode":1, //1成功 0失败
			"result|1-2": [
				{
					"formId": "111",
					"formTime": 1497770850934, //订单时间戳
					"nowTime": 149777234567,  //服务器当前时间
					"arriveTime": 40,
					"time": "20170520 12:20", //订单时间
					"list|1-3": [  //订单物品list
						{
							"url": 'xxx',
							"name|3-5": '可口可乐',
							"price": '1.80',
							"number": '3'
						}
					],
					"pay|1-2": true, //支付与否
					"confirm": true, //签收
					"totalPrice": 30,
					"remark|20": "备注"
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//地址list
	Mock.mock(/\/address\/query/,
		{
			"resultcode":1, //1成功 0失败
			"result|0-1": [
				{
					"id|1-3": "1",
					"address|1-3": "地址", //地址
					"phone": "10086",
					"name": "翠西"
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//优惠券list
	Mock.mock(/\/coupon/,
		{
			"resultcode":1, //1成功 0失败
			"result|3-5": [
				{
					"id|1-3": "1",
					"type|1-3": "1", //
					"useTime": "2017-09-23",
					"name": "满五减一",
					"isUse|1-2": true,
					"typeDetail": ""
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//删除地址
	Mock.mock(/\/address\/delete/,
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
	//删除订单
	Mock.mock(/\/order\/delete/,
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
});