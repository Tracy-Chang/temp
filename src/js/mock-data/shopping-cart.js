/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//地址
	Mock.mock(/http:\/\/localhost:8080\/address\/query/,
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
	Mock.mock(/http:\/\/localhost:8080\/shopping\/query/,
		{
			"result": {
				"time": 1,
				"carriagePrice": 2.00, //运费
				"list|2-4": [
				  	{
					    "code|+1": 1,
					    "count": "12",
					    "detail|1-2": "百事可乐330ml听装",
					    "id": "8",
					    "price": "1.80",
					    "url": "../static/images/commodity.jpg"
				  	}
				]
			},
			"resultcode": "1",
			"resultmsg": "查询成功"
		}
	);
	//提交订单
	Mock.mock(/orderUrl/,
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
});