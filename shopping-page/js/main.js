window.onload = function () { //调用函数
	shop.app.tip();
	shop.app.banner();
};
var shop = {}; //命名空间

// tools
shop.tools = {};
shop.tools.getByClass = function (par, cla) { //获取相应class元素
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

//ui
shop.ui = {};
shop.ui.fadeIn = function (ele, time, opacity) {
	time = time || 30;		//淡入过程所用的时间，默认为30ms
	opacity = opacity || 1;		//要淡入到的程度0~1，默认为1
	ele.style.display = "block";
//	if(ele.style.opacity == opacity){
//		return false;
//	}
	ele.style.opacity = 0;		//初始化透明度为0
	var value = 0;			
	var speed = 5;			
	clearInterval(ele.timer);	//清除定时器
	ele.timer = setInterval(function () {	//设置定时器
		if (value === opacity * 100) {		//如果到指定的透明度，停止定时器
			clearInterval(ele.timer);
		} else {
			value += speed;		//每次增加对象的透明度
			ele.style.opacity = value / 100;
		}
	}, time)
};
shop.ui.fadeOut = function (ele, time, opacity) {
	time = time || 30;		//淡入过程所用的时间，默认为30ms
	opacity = opacity || 0;		//要淡入到的程度0~1，默认为1
	if(ele.style.opacity == opacity){
		return false;
	}
	ele.style.opacity = 1;		//初始化透明度为0
	ele.style.display = "block";
	var value = 100;			
	var speed = 5;			
	clearInterval(ele.timer);	//清除定时器
	ele.timer = setInterval(function () {	//设置定时器
		if (value === opacity) {		//如果到指定的透明度，停止定时器
			clearInterval(ele.timer);
			ele.style.display="none";
		} else {
			value -= speed;		//每次增加对象的透明度
			ele.style.opacity = value / 100;
		}
	}, time)
};
// apps
shop.app = {};
shop.app.tip = function () { //点击事件
	var tip = document.getElementById('tip');
	var goods = document.getElementById('goods');
	var menu = shop.tools.getByClass(goods, "menu");
	// console.log(menu.length)
	for (var i = 0; i < menu.length; i++) {
		menu[i].onmouseover = function () { //为每个menu绑定点击事件
			for (var j = 0; j < menu.length; j++) {
				menu[j].className = "menu"; //先取消所有class为menu的active属性
			}
			this.className = "menu active"; //给当前的menu增加active的属性
			tip.style.display = "block";
		};
	}
	for (var j = 0; j < menu.length; j++) {
		menu[j].onmouseout = function () {
			tip.style.display = "none";
		};
	}
};
shop.app.banner = function () {
	var imgs = document.getElementById("slide").getElementsByTagName("a");
	var nums = document.getElementById("num").getElementsByTagName("a");
//	console.log(imgs, nums);
	for(var k = 0;k<imgs.length;k++){		//隐藏所有imgs
		imgs[k].style.display = "none";
	}
	imgs[0].style.display = "block";		//显示第一个img
	for (var i = 0; i < nums.length; i++) {	//为所有的num绑定鼠标点击事件
		nums[i].index = i;
		nums[i].onclick = function () {
			if(this.className == "active"){
				return false;
			}
			for (var j = 0; j < nums.length; j++) {
				nums[j].className = "";
				shop.ui.fadeOut(imgs[j]);
//				imgs[j].style.display = "none";
			}
			this.className = "active"
//			imgs[this.index].style.display = "block";
			shop.ui.fadeIn(imgs[this.index]);
		}
	}
};