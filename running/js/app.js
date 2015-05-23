require.config({
	baseUrl: 'js',
	paths: {
		Framework7: 'libs/framework7',
		text: 'libs/text',
		GS: 'services/globalService',
		tpl: '../tpl',
		echarts: 'libs/echart'
	},
	shim: {
		Framework7: {
			exports: 'Framework7'
		}
	}
});

require(['Framework7', 'router'], function(Framework7, Router) {
	window.$$ = window.Dom7;

	var device = Framework7.prototype.device;

	if (device.android) {
		window.App = new Framework7({
			animatePages: false,
			swipeout: false,
			sortable: false,
			cache: false,
			pushState: true,
			swipeBackPage: false,
			preloadPreviousPage: true,
			popupCloseByOutside: false,
			animateNavBackIcon: true,
			modalTitle: '系统消息',
			modalButtonOk: '确定',
			modalButtonCancel: '取消',
			smartSelectBackText: '完成',
			smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>'
		});
	} else {
		window.App = new Framework7({
			cache: false,
			pushState: true,
			swipeBackPage: false,
			preloadPreviousPage: true,
			popupCloseByOutside: false,
			animateNavBackIcon: true,
			modalTitle: '系统消息',
			modalButtonOk: '确定',
			modalButtonCancel: '取消',
			smartSelectBackText: '完成',
			smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>'
		});
	}

	window.mainView = window.App.addView('#home', {
		dynamicNavbar: true
	});

	Router.init();
	Router.load('plan');
	// Router.load('index');
});
