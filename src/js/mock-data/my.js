/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//订单
	Mock.mock('form',
		{
			"resultcode":1, //1成功 0失败
			"result|1-3": [
				{
					"formId": "111",
					"time": "20170520 12:20", //订单时间
					"list|1-3": [  //订单物品list
						{
							"url": 'xxx',
							"name": '可口可乐',
							"price": '1.80',
							"number": '3'
						}
					],
					"pay|1-2": true, //支付与否
					"confirm": true, //签收
					"totalPrice": 30
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//地址list
	Mock.mock(/http:\/\/localhost:8080\/address\/query/,
		{
			"resultcode":1, //1成功 0失败
			"result|1-5": [
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
	//删除地址
	Mock.mock(/http:\/\/localhost:8080\/address\/delete/,
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
	//删除订单
	Mock.mock(/delForm/,
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
});