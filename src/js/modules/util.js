/**
 * 工具方法
 */
define(function(){
	return{
		/**
		 * 匹配值
		 * @str
		 * @param  {string} name 参数key值
		 * @return {string}      参数的值,没有则返回null
		 */
		getNameInStr: function(str, name){
			var reg = new RegExp("(^|[?]|&|\")" + name + "=([^&]*)(&|$)", "i"); 
			var r = str.match(reg); 
			if (r != null) return unescape(r[2]); return ''; 
		},
		/**
		 * 设置cookie
		 * @param {string} cookiename  cookie名字
		 * @param {string} cookievalue cookie值
		 * @param {number} seconds       cookie生效时长
		 */
		setCookie: function(cookiename, cookievalue, seconds){
			var date = new Date();
			date.setTime(date.getTime()+Number(seconds)*1000);
			document.cookie = cookiename + "=" + cookievalue + ";path=/;expires=" + date.toGMTString();
		},
		/**
		 * 获取cookie值
		 * @param  {string} cookiename cookie名字
		 * @return {[null, string]}    cookie值 没有值则为null
		 */
		getCookie: function(cookiename){
			var arr,
				reg = new RegExp('(^| )'+cookiename+"=([^;]*)(;|$)");
			if(arr = document.cookie.match(reg)){
				return arr[2];
			}else{
				return null;
			}
		},
		/**
		 * 获取URL中的参数对应的值
		 * @param  {string} name 参数key值
		 * @return {string}      参数的值,没有则返回null
		 */
		getQueryByName: function(name){
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) {
		        return r[2];
		    }
		    return null;
		},
		getOS: function(){
			var ua = navigator.userAgent;
			var os = '';
			if(ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
				os = 'ios';
			}
			if(ua.indexOf('Android')>-1 || ua.indexOf('Linux')>-1){
				os = 'android';
			}
			return os;
		},	
		/*
		* 判断页面是否是58APP加载
		*/
		is58App: function(){
			var ua = getCookie('58ua') || "";
			var ua = ua!="" ? ua.replace(/"/g, ""):""; 
			return ua == '58app'? true : false;
		}
	}
})