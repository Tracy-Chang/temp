/**
 * 浮层模块
 */

define(function(){
	/**
	 * 封装一个浮层
	 * @param {[type]} text [弹窗的文案]
	 * @param {[type]} node [弹窗中的dom结构字符串]
	 */
	function Alert(text, node) {
		this.text = text || '我是弹窗';
		this.node = node || '';

		var doc = document;
		if (doc.getElementById('alertLayer')) {
			doc.getElementById('alertPopup').innerHTML = this.node;
			doc.getElementById('alertLayer').style.display = 'block';
		} else {
			//创建遮罩
			var layer = doc.createElement('div');
			layer.id = 'alertLayer';
			layer.style.cssText = 'background-color: rgba(0, 0, 0, 0.8);position: fixed;left: 0px;top: 0px;bottom: 0;right: 0;';

			//创建弹窗
			var popup = doc.createElement('div');
			popup.id = 'alertPopup';
			popup.style.cssText = 'position: absolute;left: 50%;top: 50%;transform: translate(-50%,-60%);-webkit-transform: translate(-50%,-60%);border-radius: 10px;';
			layer.appendChild(popup);

			popup.innerHTML = this.node;


			doc.body.appendChild(layer);

			$('#alertLayer').on('touchmove', function(e) {
				e.stopPropagation();
				e.preventDefault();
			});
			//隐藏浮层事件绑定
			$('#alertLayer,#close').on('click', this.hiddenNode(layer.id));
		}
	}
	Alert.prototype = {
		hiddenNode: function(id) {
			return function() {
				var node = document.getElementById(id);
				node.style.display = 'none';	
			}
		}
	}

	return function (text, node) {
		var a = new Alert(text, node);
	}
})