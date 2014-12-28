$(function(){
	$(".link .btn").hover(function(){
		var title = $(this).attr("data-title");
		$(".tip em").text(title);
		var left = $(this).position().left;
		var dis = Math.abs(($(".tip").outerWidth()-$(this).outerWidth())/2);
		var now = left -dis;
		console.log("title="+title+"  ","left="+left,"dis=",dis,"now="+now,"this"+$(".tip").outerWidth());
//		if (!$('.tip').is(':animated')){
		$(".tip").css({"left":now+"px"}).animate({"top":130,"opacity":1},300);
//  }
	},
	function(){
		$(".tip").animate({"top":100,"opacity":0},300);
	}
	)
})
