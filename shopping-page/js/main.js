window.onload = function () { //调用函数
	shop.app.tip();
};
var shop = {};		//命名空间
// tools
shop.tools = {};
shop.tools.getByClass=function(par,cla){		//获取相应class元素
	var allEle = par.getElementsByTagName("*");
	var arr = [];
	var reg = new RegExp("\\b" + cla + "\\b","g");		//正则表达式
	for(var i = 0;i<allEle.length;i++){					
		if (allEle[i].className.search(reg) !== -1) {		//字符串search方法判断匹配
			arr.push(allEle[i]);
		};
	}
	return arr;
}
// apps
shop.app = {};
shop.app.tip = function(){						//点击事件
	var tip = document.getElementById('tip');
	var goods = document.getElementById('goods');
	var menu = shop.tools.getByClass(goods,"menu");
	// console.log(menu.length)
	for(var i = 0;i<menu.length;i++){
		menu[i].onmouseover = function(){		//为每个menu绑定点击事件
			for(var j = 0;j<menu.length;j++){			
				menu[j].className = "menu";		//先取消所有class为menu的active属性
			}
			this.className = "menu active";		//给当前的menu增加active的属性
			tip.style.display = "block";
		};
	}
	for(var i = 0;i<menu.length;i++){
		menu[i].onmouseout = function(){
			tip.style.display = "none";
		}
	}
}
