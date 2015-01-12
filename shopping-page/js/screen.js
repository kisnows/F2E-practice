window.onload = function(){
	shop.app.chose_screen();
};
shop.app.chose_screen = function(){
	var top = document.getElementById('top');
	var a = top.getElementsByTagName('a');
	for (var i = a.length - 1; i >= 0; i--) {
		if (a[i].innerHTML == "更多") {continue}
		else{
			shop.tools.onmouseover(a[i],a,"active");
		}
	};
	// var nocare = shop.tools.getByClass(top,"nocare");
	// var ite = shop.tools.getByClass(top,"ite");
	// var arra = [];
	// for (var i = nocare.length - 1; i >= 0; i--) {
	// 	console.log(nocare[i],nocare[i].getElementsByTagName('a'));
	// 	arra.push(nocare[i].getElementsByTagName('a'));
	// };
	// for (var j = ite.length - 1; j >= 0; j--) {
	// 	// console.log(ite,ite[j].getElementsByTagName("a"));
	// 	arra.push(ite[j].getElementsByTagName("a"));
	// };
	// for (var k = arra.length - 1; k >= 0; k--) {
	// 	// console.log(arra[k]);
	// 	shop.tools.onmouseover(arra[k],arra,"active");
	// };
};