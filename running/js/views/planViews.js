define(['utils'], function (Utils) {
	function render(p){
		Utils.bindEvents(p.bindings);
	}
	return{
		render: render
	}
});
