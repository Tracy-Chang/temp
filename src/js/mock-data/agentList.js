/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//list
<<<<<<< HEAD
	Mock.mock(/\/agent\/orderQuery/,
=======
	Mock.mock(/\/\/www.earthcenter.com.cn:8081\/ls\/query/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
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
						"arrive|1": true
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
<<<<<<< HEAD
	Mock.mock(/\/agent\/toOrder/,
=======
	Mock.mock(/http:\/\/localhost:8080\/order\/to/,
>>>>>>> a1b2cfb1e85f0b86fe283abce03f0cf7303f2a04
		{
			"resultcode":1, //1成功 0失败
			"result": [],
			"resultmsg":"获取成功"
		}
	);
});