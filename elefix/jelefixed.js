/*elefixed      */
/*author：Yuanqi*/
/*版本：1.0.0   */
(function($){
	$.fn.extend({
		"elefixed":function(){
			var This = $(this);
			var fixHeight = $(this).css('height');
				fixBeforeOffsetTop = $(this).offset().top;
				fixBeforePostion = $(this).css('position');
				fixBeforeTop = $(this).css('top');
				fixBeforezIndex = $(this).css('zIndex');
				next = $(this).next();
			var nextMarginTop = next.css('marginTop');
			var afterFixTop = fixHeight + parseInt(nextMarginTop);
			var scrollTop = $(document).scrollTop();

			function compare(){
				if(scrollTop >= fixBeforeOffsetTop){
					next.css('marginTop', afterFixTop+'px');
					This.css({
						position: 'fixed',
						top: '0px',
						zIndex: '9999'
					});
				}else{
					next.css('marginTop', nextMarginTop);
					This.css({
						position: fixBeforePostion,
						top: fixBeforeTop,
						zIndex: fixBeforezIndex
					});
				}
			}

			$(window).scroll(function() {
				scrollTop = $(document).scrollTop();
				compare();
			});
			$(window).resize(function() {
				if (This.css('position') !== "fixed") {
					fixBeforeOffsetTop = This.offset().top;
				}
				compare();
			});

		}
	});
})(jQuery);
