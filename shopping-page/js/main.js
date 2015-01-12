
var shop = {}; //命名空间

// tools
shop.tools = {};
shop.tools.getByClass = function(par, cla) { //获取相应class元素
	var allEle = par.getElementsByTagName("*");
	var arr = [];
	var reg = new RegExp("\\b" + cla + "\\b", "g"); //正则表达式
	for (var i = 0; i < allEle.length; i++) {
		if (allEle[i].className.search(reg) !== -1) { //字符串search方法判断匹配
			arr.push(allEle[i]);
		}
	}
	return arr;
};
shop.tools.onmouseover = function(ele,eles,select){//参数为子元素，和父元素，最终为当前元素添加active状态
	select = select||"select";
	ele.onmouseover = function(){
		for (var i = eles.length - 1; i >= 0; i--) {
			eles[i].className = ""
		};
		this.className = select;
	}
};
shop.tools.onclick = function(ele,eles){
	ele.onclick = function(){
		for (var i = eles.length - 1; i >= 0; i--) {
			eles[i].className = ""
		};
		this.className = "select";
	}
};

//ui
shop.ui = {};
shop.ui.fadeIn = function(ele, time, opacity) {
	time = time || 30; //淡入过程所用的时间，默认为30ms
	opacity = opacity || 1; //要淡入到的程度0~1，默认为1
	ele.style.display = "block";
	//	if(ele.style.opacity == opacity){
	//		return false;
	//	}
	ele.style.opacity = 0; //初始化透明度为0
	var value = 0;
	var speed = 5;
	clearInterval(ele.timer); //清除定时器
	ele.timer = setInterval(function() { //设置定时器
		if (value === opacity * 100) { //如果到指定的透明度，停止定时器
			clearInterval(ele.timer);
		} else {
			value += speed; //每次增加对象的透明度
			ele.style.opacity = value / 100;
		}
	}, time)
};
shop.ui.fadeOut = function(ele, time, opacity) {
	time = time || 30; //淡入过程所用的时间，默认为30ms
	opacity = opacity || 0; //要淡入到的程度0~1，默认为1
	if (ele.style.opacity == opacity) {
		return false;
	}
	ele.style.opacity = 1; //初始化透明度为0
	ele.style.display = "block";
	var value = 100;
	var speed = 5;
	clearInterval(ele.timer); //清除定时器
	ele.timer = setInterval(function() { //设置定时器
		if (value === opacity) { //如果到指定的透明度，停止定时器
			clearInterval(ele.timer);
			ele.style.display = "none";
		} else {
			value -= speed; //每次增加对象的透明度
			ele.style.opacity = value / 100;
		}
	}, time)
};

// apps
shop.app = {};
