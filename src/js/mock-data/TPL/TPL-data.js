/**
 *模拟数据
 *author 作者
 */
define(['TPL/../../../../node_modules/mockjs/dist/mock-min'],function(Mock){
	//模拟／test接口数据
	//点击分享
	Mock.mock('xxx',
		{
			"resultcode":1,
			"result":{
				"participatecode":0,
				"participatemsg":"报名成功"
			},
			"resultmsg":"获取成功"
		}
	);
});