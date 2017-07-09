/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//订单
<<<<<<< HEAD
	Mock.mock(/\/agent\/orderDetailQuery/,
=======
	Mock.mock(/form/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
		{
			"resultcode":1, //1成功 0失败
			"result": {
				"formId": "111",
				"time": "2017/05/20 12:20", //订单时间
				"list|1-3": [  //订单物品list
					{
						"url": 'xxx',
						"name": '可口可乐',
						"price": '1.80',
						"number": '3'
					}
				],
				"totalPrice": 30,
				"name": "翠西",
				"phone": "10086",
<<<<<<< HEAD
				"address": "新龙城",
				"remark|20": "备注"
=======
				"address": "新龙城"
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
			},
			"resultmsg":"获取成功"
		}
	);
});