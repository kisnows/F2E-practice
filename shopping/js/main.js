window.onload = function () { //调用函数
	shop.app.Banner();
	shop.app.search();
	shop.app.sort();
	shop.app.Run();
};
var shop = {}; //命名空间
shop.tools = {};
shop.tools.getByClass = function (Par, Cla) //获取对应class的对象
{
	var allEle = Par.getElementsByTagName("*");
	var arr = [];
	for (i = 0; i < allEle.length; i++) {
		if (allEle[i].className == Cla) {
			arr.push(allEle[i]);
		}
	}
	return arr;
};
shop.tools.getStyle = function (obj, attr) //获取对象属性
{
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
};

shop.ui = {}; 
shop.ui.fadeIn = function (obj) //淡入效果
{
	var attr = shop.tools.getStyle(obj, 'opacity');
	if (attr == 1) {
		return false;
	};
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var speed = 5;
		if (value == 100) {
			clearInterval(obj.timer);
		} else {
			value += speed;
			obj.style.opacity = value / 100;
		}
	}, 30);
};
shop.ui.fadeOut = function (obj) //淡出效果
{
	var attr = shop.tools.getStyle(obj, 'opacity');
	if (attr == 0) {
		return false;
	};
	var value = 100;
	obj.timer = setInterval(function () {
		var speed = -5;
		if (value == 0) {
			clearInterval(obj.timer);
		} else {
			value += speed;
			obj.style.opacity = value / 100;
		};
	}, 30);
};
shop.ui.textChange = function (obj, str) { //清空默认文字
	obj.onfocus = function () {
		if (this.value == str) {
			this.value = "";
		}
	};
	obj.onblur = function () {
		if (this.value == "") {
			this.value = str;
		}
	};
};
shop.ui.moveLeft = function (obj, old, now) { //对象位置左移
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var speed = (now - old) / 15;
		speed = Math.round(speed);
		if (now == old) {
			clearInterval(obj.timer);
		} else {
			old += speed;
			obj.style.left = old + "px";
		}
	}, 30);
};
shop.app = {};
shop.app.Banner = function () { //Banner轮播图效果
	var ad = document.getElementById("ad");
	var ul = ad.getElementsByTagName("ul")[0];
	var li = ul.getElementsByTagName("li");

	var iNow = 0;
	var timer = setInterval(auto, 3000);

	function auto() {
		if (iNow == li.length - 1) {
			iNow = 0;
		} else {
			iNow++;
		}
		for (var i = 0; i < li.length; i++) {
			shop.ui.fadeOut(li[i]);
		}
		shop.ui.fadeIn(li[iNow]);
	}
};
shop.app.search = function () {
	var s1 = document.getElementById("search1");
	var s2 = document.getElementById("search2");
	shop.ui.textChange(s1, "Search website");
	shop.ui.textChange(s2, "Search website");
};
shop.app.sort = function () { //模拟下拉菜单
	var sor = document.getElementById("sort");
	var sordd = sor.getElementsByTagName("dd");
	var sorul = sor.getElementsByTagName("ul");
	var sorh4 = sor.getElementsByTagName("h4");
	for (var i = 0; i < sordd.length; i++) {
		sordd[i].index = i;
		sordd[i].onclick = function (ev) {
			var ev = ev || window.event;
			var This = this;
			for (var n = 0; n < sorul.length; n++) {
				sorul[n].style.display = "none";
			}
			sorul[this.index].style.display = "block";

			document.onclick = function () {
				sorul[This.index].style.display = 'none';
			};
			ev.cancelBubble = true;
		}
	};

	for (var i = 0; i < sorul.length; i++) {
		sorul[i].index = i;
		(function (ul) {
			var sorli = ul.getElementsByTagName("li");
			for (var i = 0; i < sorli.length; i++) {
				sorli[i].onmouseover = function () {
					this.className = "active";
				};
				sorli[i].onmouseout = function () {
					this.className = "";
				};
				sorli[i].onclick = function (ev) {
					var ev = ev || window.event;
					sorh4[this.parentNode.index].innerHTML = this.innerHTML;
					ev.cancelBubble = true;
					this.parentNode.style.display = "none";
				};
			}
		})(sorul[i]);
	};
};
shop.app.Run = function () { //点击左移效果
	var slide = document.getElementById('slide');
	var ul = slide.getElementsByTagName('ul')[0];
	var li = ul.getElementsByTagName('li');

	var pre = shop.tools.getByClass(slide, "pre")[0];
	var next = shop.tools.getByClass(slide, "next")[0];

	var iNow = 0;

	ul.innerHTML += ul.innerHTML;
	ul.style.width = li.length * li[0].offsetWidth + "px";

	pre.onclick = function () {
		if (iNow == 0) {
			iNow = li.length / 2;
			ul.style.left = -ul.offsetWidth / 2 + 'px';
		}
		shop.ui.moveLeft(ul, -iNow * li[0].offsetWidth, -(iNow - 1) * li[0].offsetWidth);
		iNow--;
	};

	next.onclick = function () {
		if (iNow == li.length / 2) {
			iNow = 0;
			ul.style.left = 0;
		}
		shop.ui.moveLeft(ul, -iNow * li[0].offsetWidth, -(iNow + 1) * li[0].offsetWidth);
		iNow++;
	};
};