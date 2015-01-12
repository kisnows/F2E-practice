window.onload = function() { //调用函数
	shop.app.tip();
	shop.app.banner();
	shop.app.smallBanner();
};
shop.app.tip = function() { //点击事件
	var tip = document.getElementById('tip');
	var goods = document.getElementById('goods');
	var menu = shop.tools.getByClass(goods, "menu");
	// console.log(menu.length)
	for (var i = 0; i < menu.length; i++) {
		menu[i].onmouseover = function() { //为每个menu绑定点击事件
			for (var j = 0; j < menu.length; j++) {
				menu[j].className = "menu"; //先取消所有class为menu的active属性
			}
			this.className = "menu active"; //给当前的menu增加active的属性
			tip.style.display = "block";
		};
	}
	for (var j = 0; j < menu.length; j++) {
		menu[j].onmouseout = function() {
			tip.style.display = "none";
		};
	}
};
shop.app.banner = function() {
	var imgs = document.getElementById("slide").getElementsByTagName("a");
	var nums = document.getElementById("num").getElementsByTagName("a");
	var iNow = 1;

	for (var k = 0; k < imgs.length; k++) { //隐藏所有imgs
		imgs[k].style.display = "none";
	}
	imgs[0].style.display = "block"; //显示第一个img
	var timer = setInterval(auto, 2000); //自动播放
	function auto() {
		for (var k = 0; k < nums.length; k++) {
			shop.ui.fadeOut(imgs[k]);
			nums[k].className = "";
		}
		shop.ui.fadeIn(imgs[iNow]);
		nums[iNow].className = "active";
		iNow++;
		if (iNow >= nums.length) {
			iNow = 0;
		}
	}
	for (var i = 0; i < nums.length; i++) { //为所有的num绑定鼠标点击事件
		nums[i].index = i;
		imgs[i].onmouseover = function() { //鼠标移入，清楚定时器
			clearInterval(timer);
		}
		nums[i].onmouseover = function() { //鼠标移入，清楚定时器
			clearInterval(timer);
		}
		imgs[i].onmouseout = function() { //鼠标移出，继续自动播放
			clearInterval(timer);
			timer = setInterval(auto, 2000);
		}
		nums[i].onmouseout = function() { //鼠标移出，继续自动播放
			clearInterval(timer);
			timer = setInterval(auto, 2000);
		}
		nums[i].onclick = function() {
			if (this.className == "active") {
				return false;
			}
			for (var j = 0; j < nums.length; j++) {
				nums[j].className = "";
				shop.ui.fadeOut(imgs[j]);
			}
			this.className = "active"
			shop.ui.fadeIn(imgs[this.index]);
		}
	}
};
shop.app.smallBanner = function() {
	var sBanner = document.getElementById('smallBanner');
	var imgs = sBanner.getElementsByTagName('a');
	var timer = null;
	var iNow = 1;
	clearInterval(timer);
	for (var i = imgs.length - 1; i >= 0; i--) {
		imgs[i].style.display = 'none';
	};
	imgs[0].style.display = 'block';
	timer = setInterval(function() {
		for (var i = imgs.length - 1; i >= 0; i--) {
			shop.ui.fadeOut(imgs[i]);
			// imgs[i].style.display = 'none';
		};
		shop.ui.fadeIn(imgs[iNow]);
		// imgs[iNow].style.display = 'block';
		iNow++;
		if (iNow >= imgs.length) {
			iNow = 0;
		}
	}, 3000)
	console.log(sBanner, imgs, iNow, timer);
}