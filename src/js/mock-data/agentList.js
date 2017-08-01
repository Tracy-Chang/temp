/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//list
	Mock.mock(/\/agent\/orderQuery/,
		{
			"result": {
				"list|0-20": [
					{
						"time": Mock.mock('@datetime("yyyy/MM/dd HH:mm")'),
						"formUrl": "./agentDetail.html",
						"imgUrl": "../static/images/default.jpg",
						"name": "李元霸", 
						"phone": "10086",
						"address": "新龙城36d三单元",
						"formId": "111",
						"arrive|1": true,
						"get|1": true
					}
				],
				"pageNumber": 1,
				"pageSize": 5,
				"totalPage": 3,
				"totalRow": 11
			},
			"resultcode": "1",
			"resultmsg": "查询成功"
		}
	);
	Mock.mock(/\/agent\/toOrder/,
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
	Mock.mock(/\/agent\/get/,
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
});