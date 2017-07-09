/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//订单
	Mock.mock(/\/earth\/query/,
		{
			"resultcode":1, //1成功 0失败
			"result": {
					"name": "李元霸", 
					"list|1-3": [  //订单物品list
						{
							"url": '../static/images/commodity.jpg',
							"name": '百事可乐',
							"price": '1.80',
							"number|1-2": '1'
						}
					],
					"phone": "10086",
					"address": "新龙城36d三单元",
					"totalPrice": '30',
					"time": 1,
					"remark|20": "备注"
				},
			"resultmsg":"获取成功"
		}
	);
	//支付
	Mock.mock(/\/earth\/pay/,
		{
			"resultcode":1, //1成功 0失败
			"result": {
				"pay": true
			},
			"resultmsg":"获取成功"
		}
	);
});