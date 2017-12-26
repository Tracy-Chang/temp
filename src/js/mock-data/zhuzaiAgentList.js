/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//list
	Mock.mock(/\/zhuzai\/agent\/queryOrder/,
		{
			"resultdata|0-20": [
					{
						"desc": "xxx",
						"orderStatus": 2,  //2-已支付：3-已接单/到货；
						"totalPrice": "100" ,
						"time": Mock.mock('@datetime("yyyy/MM/dd HH:mm")'),
						"orderCode": "111",
						"url": "./zhuzaiAgentDetail.html",
					}
				],
			"resultcode": "0",
			"resultmsg": "查询成功"
		}
	);
	Mock.mock(/\/zhuzai\/agent\/manageOrder/,
		{
			"resultcode":0, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
	Mock.mock(/\/agent\/toGetOrder/,
		{
			"resultcode":0, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
});