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
					"time": "20170520 12:20", //订单时间
					"list|1-3": [  //订单物品list
						{
							"url": 'xxx',
							"name": '',
							"price|1-3": '2'
						}
					],
					"pay": "ture", //支付与否
					"confirm": "ture", //签收
					"delete": "false" //是否删除
				}
			],
			"resultmsg":"获取成功"
		}
	);
	//地址
	Mock.mock('address',
		{
			"resultcode":1, //1成功 0失败
			"result|1-5": [
				{
					"address|1-3": "地址", //地址
					"phone": "10086",
					"name": "新龙城"
				}
			],
			"resultmsg":"获取成功"
		}
	);
});