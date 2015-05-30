window.onload = function(){
	changeHeight();
	scrollPage();
	elefixed("nav");
};

getByClass = function(par, cla) {
	var allEle = par.getElementsByTagName("*");
	var arr = [];
	var reg = new RegExp("\\b" + cla + "\\b", "g");
	for (var i = 0; i < allEle.length; i++) {
		if (allEle[i].className.search(reg) !== -1) {
			arr.push(allEle[i]);
		}
	}
	return arr;
};
scrollPage = function(){
	var height = window.innerHeight;
	var btn = getByClass(document,"page1")[0].getElementsByTagName('a')[0];
	var timer;
	var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
	var speed = (height-scrollTop)/120;
	speed = Math.round(speed);
	btn.onclick = function(){
		clearInterval(timer);
		timer = setInterval(function(){
			scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
			if (height <= scrollTop) {
				clearInterval(timer);
			}else{
				document.documentElement.scrollTop += speed;
				document.body.scrollTop += speed;
			}
		},1);
	};
};
changeHeight = function(){
	var page1 = getByClass(document,"page1")[0];
	var page2 = getByClass(document,"page2")[0];
	var page3 = getByClass(document,"page3")[0];
	page1.style.height = page2.style.height =page3.style.height = window.innerHeight + "px";
	window.addEventListener('resize',function(){
		page1.style.height = page2.style.height =page3.style.height = window.innerHeight + "px";
	},false);
};

elefixed = function(ele){
	var fix = document.getElementById(ele);
		fixHeight = fix.offsetHeight;
		fixBeforePostion = fix.style.position;
		fixBeforeOffsetTop = fix.offsetTop;
		fixBeforeTop = fix.style.top;
		fixBeforezIndex = window.getComputedStyle(fix,null).zIndex;
		next = fix.nextSibling;
	while(next.nodeName == "#text"&& !/\S/.test(next.nodeValue)){
		next = next.nextSibling;
	}
	var nextMarginTop = window.getComputedStyle(next,null).marginTop;
	var afterFixTop = fixHeight + parseInt(nextMarginTop);
	var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;

	function compare(){
		if(scrollTop >= fixBeforeOffsetTop){
			console.log('fix');
			fix.style.position = "fixed";
			fix.style.top = "0px";
			fix.style.zIndex = "9999";
			next.style.marginTop = afterFixTop+'px';
		}else{
			console.log('auto');
			fix.style.position = fixBeforePostion;
			fix.style.top = fixBeforeTop;
			fix.style.zIndex = fixBeforezIndex;
			next.style.marginTop = nextMarginTop;
		}
	}

	window.onscroll=function() {
		scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
		compare();
	};
	window.onresize=function(){
		if (fix.style.position !== "fixed") {
			fixBeforeOffsetTop = fix.offsetTop;
		}
		compare();
	};
};
