window.onload = function(){
	shop.app.chose();
};



shop.app.chose = function(){
	var specification = document.getElementById('specification');
	var color = document.getElementById('color');
	var speSpans = specification.getElementsByTagName('span');
	var colorSpans = color.getElementsByTagName('span')
	for (var i = speSpans.length - 1; i >= 0; i--) {
		shop.tools.onmouseover(speSpans[i],speSpans);
		shop.tools.onclick(speSpans[i],speSpans);
	}
	for (var j = colorSpans.length - 1; j >= 0; j--) {
		shop.tools.onmouseover(colorSpans[j],colorSpans);
		shop.tools.onclick(colorSpans[j],colorSpans);
	};
}