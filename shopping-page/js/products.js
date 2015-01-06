window.onload = function(){
	pro.app.chose();
};
var pro = {};

pro.tools = {};

pro.tools.onmouseover = function(ele,eles){
	ele.onmouseover = function(){
		for (var i = eles.length - 1; i >= 0; i--) {
			eles[i].className = ""
		};
		this.className = "select";
	}
	// ele.onmouseout = function(){
	// 	ele.className = "";
	// }
};
pro.tools.onclick = function(ele,eles){
	ele.onclick = function(){
		for (var i = eles.length - 1; i >= 0; i--) {
			eles[i].className = ""
		};
		this.className = "select";
	}
};

pro.app = {};
pro.app.chose = function(){
	var specification = document.getElementById('specification');
	var color = document.getElementById('color');
	var speSpans = specification.getElementsByTagName('span');
	var colorSpans = color.getElementsByTagName('span')
	for (var i = speSpans.length - 1; i >= 0; i--) {
		pro.tools.onmouseover(speSpans[i],speSpans);
		pro.tools.onclick(speSpans[i],speSpans);
	}
	for (var j = colorSpans.length - 1; j >= 0; j--) {
		pro.tools.onmouseover(colorSpans[j],colorSpans);
		pro.tools.onclick(colorSpans[j],colorSpans);
	};
}