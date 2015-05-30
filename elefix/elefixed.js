/*elefixed      */
/*author：Yuanqi*/
/*版本：1.0.0   */
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
			// console.log('fix');
			fix.style.position = "fixed";
			fix.style.top = "0px";
			fix.style.zIndex = "9999";
			next.style.marginTop = afterFixTop+'px';
		}else{
			// console.log('auto');
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
