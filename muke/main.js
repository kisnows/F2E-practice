window.onload = function () {

	var banner = document.getElementById("banner"),
		imgs = banner.getElementsByTagName("img"),
		iNow = 0,
		timer = null,
		i = 0;

	function change() {
		for (i = 0; i < imgs.length; i++) {
			imgs[i].style.display = "none";
		}
		imgs[iNow].style.display = 'block';
		iNow++;
		if (iNow >= imgs.length) {
			iNow = 0;
		}
	}

	function auto(){
		timer = setInterval(change, 2000);
	}
	
	auto();
	banner.onmouseover = function () {
		clearInterval(timer);
	}
	banner.onmouseout = function () {
		timer = setInterval(change, 2000);
	}
	banner.onclick = function () {
		change()
	}
};