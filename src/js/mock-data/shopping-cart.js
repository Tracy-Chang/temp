/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//地址
<<<<<<< HEAD
	Mock.mock(/\/address\/query/,
=======
	Mock.mock(/http:\/\/localhost:8080\/address\/query/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
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
<<<<<<< HEAD
	Mock.mock(/\/shopping\/query/,
=======
	Mock.mock(/http:\/\/localhost:8080\/shopping\/query/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
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
<<<<<<< HEAD
				],
				"remark|20": "备注"
=======
				]
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
			},
			"resultcode": "1",
			"resultmsg": "查询成功"
		}
	);
	//提交订单
<<<<<<< HEAD
	Mock.mock(/\/order\/add/,
=======
	Mock.mock(/http:\/\/localhost:8080\/order\/add/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
		{
			"resultcode":1, //1成功 0失败
			"result": {
				"formId": "LS2017061571606757775"
			},
			"resultmsg":"获取成功"
		}
	);
});