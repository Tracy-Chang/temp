/**
 *模拟数据
 *author 作者
 */
define(['../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//list
	Mock.mock(/\/\/www.earthcenter.com.cn:8081\/ls\/query/,
		{
			"result": {
				"firstPage": true,
				"lastPage": false,
				"list|2": [
				  {
				    "code": "Lyltsbss001",
				    "count": "12",
				    "detail": "百事可乐330ml听装",
				    "id": "8",
				    "marPrice": "2.00",
				    "price": "1.80",
				    "url": "../static/images/commodity.jpg"
				  },
				  {
				    "code": "Lyltsbss006",
				    "count": "12",
				    "detail": "百事七喜330ml听装",
				    "id": "13",
				    "marPrice": "2.00",
				    "price": "1.80",
				    "url": "../static/images/commodity.jpg"
				  },
				  {
				    "code": "Lyltsbss102",
				    "count": "12",
				    "detail": "百事可乐600ml",
				    "id": "9",
				    "marPrice": "3.00",
				    "price": "2.50",
				    "url": "../static/images/commodity.jpg"
				  },
				  {
				    "code": "Lyltsbss104",
				    "count": "12",
				    "detail": "百事美年达桃味600ml",
				    "id": "11",
				    "marPrice": "3.00",
				    "price": "2.50",
				    "url": "../static/images/commodity.jpg"
				  },
				  {
				    "code": "Lyltsbss105",
				    "count": "12",
				    "detail": "百事美年达橙味600ml",
				    "id": "12",
				    "marPrice": "3.00",
				    "price": "2.50",
				    "url": "../static/images/commodity.jpg"
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
});