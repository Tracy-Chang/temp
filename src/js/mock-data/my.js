/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//订单
<<<<<<< HEAD
	Mock.mock(/\/order\/queryU/,
		{
			"resultcode":1, //1成功 0失败
			"result|1-2": [
				{
					"formId": "111",
					"formTime": 1497770850934, //订单时间戳
					"nowTime": 149777234567,  //服务器当前时间
					"arriveTime": 40,
=======
	Mock.mock(/http:\/\/localhost:8080\/order\/queryU/,
		{
			"resultcode":1, //1成功 0失败
			"result|1-3": [
				{
					"formId": "111",
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
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
<<<<<<< HEAD
					"totalPrice": 30,
					"remark|20": "备注"
=======
					"totalPrice": 30
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//地址list
<<<<<<< HEAD
	Mock.mock(/\/address\/query/,
		{
			"resultcode":1, //1成功 0失败
			"result|0-1": [
=======
	Mock.mock(/http:\/\/localhost:8080\/address\/query/,
		{
			"resultcode":1, //1成功 0失败
			"result|1-5": [
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
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
<<<<<<< HEAD
	Mock.mock(/\/address\/delete/,
=======
	Mock.mock(/http:\/\/localhost:8080\/address\/delete/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
	//删除订单
<<<<<<< HEAD
	Mock.mock(/\/order\/delete/,
=======
	Mock.mock(/delForm/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
});