window.onload = function() {
	calculate();
};
calculate = function() {
	var cal = document.getElementById('cal');
	var btns = cal.getElementsByTagName('span');
	var oexp = cal.getElementsByTagName('div')[1].getElementsByTagName('div')[0];
	var ores = cal.getElementsByTagName('div')[1].getElementsByTagName('div')[1];
	var ope = ['+', '-', '*', '/', '%'];
	// console.log(cal,btns,oexp.innerText,ores);
	for (var i = btns.length - 1; i >= 0; i--) { //给每个按钮添加点击事件
		btns[i].onclick = function() {
			switch (this.innerText) {
				case "+":
					count("+");
					break;
				case "-":
					count("-");
					break;
				case "*":
					count("*");
					break;
				case "÷":
					count("/");
					break;
				case "%":
					count("%");
					break;
				case "=":
					count("=");
					break;
				case "C":
					oexp.innerText = '0';
					ores.innerText = '0';
					break;
				default:
					ores.innerText = ores.innerText == 0 || ope.contains(ores.innerText.slice(-1)) ? this.innerText : ores.innerText + this.innerText;
					// oexp.innerText = oexp.innerText == 0 ? this.innerText : oexp.innerText + this.innerText;
			}
		};
	}
	count = function(o) { //计算函数
		var res = parseInt(ores.innerText);
		// console.log(res, exp)
		if (o == '=') {
			if (oexp.innerText == '0' || ope.contains(ores.innerText) || !ope.contains(ores.innerText.slice(-1)) && !ope.contains(oexp.innerText.slice(-1))) {
				return false;
			} else {
				oexp.innerText += ores.innerText;
				ores.innerText = eval(oexp.innerText);
			}
		} else {
			if (oexp.innerText.slice(1) == 0) {
				oexp.innerText = ores.innerText + o;
			} else if (ope.contains(ores.innerText.slice(-1))) {
				return false;
			} else if (!ope.contains(oexp.innerText.slice(-1)) && ores.innerText == eval(oexp.innerText)) {
				oexp.innerText = ores.innerText + o;
			} else {
				oexp.innerText += ores.innerText + o;
			}
			ores.innerText = o;
		}
	};
};

Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
};
