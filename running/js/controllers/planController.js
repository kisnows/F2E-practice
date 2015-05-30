define(['views/planViews'], function(View) {



    var initPage = {
        modify: function() {
            $$('.dialog-sign').show();
        },
        add: function() {
            var number = +($$(this).parent().find('.number').text());
            number += 1000;
            $$(this).parent().find('.number').text(number.toString())
        },
        minus: function() {
            var number = +($$(this).parent().find('.number').text());
            number -= 1000;
            if (number === 0) {
                return false;
            }
            $$(this).parent().find('.number').text(number.toString())
        },
        enter: function() {
            var number1 = $$('.dialog-sign .number').eq(0).text(),
                number2 = $$('.dialog-sign .number').eq(1).text();
            $$('.sign .number').eq(0).text(number1);
            $$('.sign .number').eq(1).text(number2);
            $$('.dialog-sign').hide();
        },
        cancel: function() {
            $$('.dialog-sign').hide();
        },
        run: function() {
            var that = this;
            $$('.init').hide();
            $$('.running').addClass('active');
            runningAll();
            finish();
            that.timer = setTimeout(function() {
                pausedAll();
                setTimeout(function() {
                    running('.runway');
                }, 2000)
            }, 4000)
            $$('.road-sign-bottom').animationEnd(function() {
                that.timer = setTimeout(function() {
                    pausedAll();
                    setTimeout(function() {
                        running('.runway');
                    }, 2000)
                }, 4000)
            })
        },
        onceAgain: function() {
            $$('.init').show();
            $$('.once-again').removeClass('active');
            $$('.running').removeClass('active');
        }
    }

    function paused(el) {
        $$(el).css({
            '-webkit-animation-play-state': 'paused',
            'animation-play-state': 'paused'
        })
    }

    function running(el) {
        $$(el).css({
            '-webkit-animation-play-state': 'running',
            'animation-play-state': 'running'
        })
    }

    function pausedAll() {
        paused('.runway');
    }

    function runningAll() {
        running('.person');
        running('.person1');
        running('.runway');
    }

    function finish() {
        $$('#cashTip').animationEnd(function() {
            $$('.once-again').addClass('active');
        })
        setTimeout(function() {
            paused('.person');
            paused('.person1');
            paused('.runway');
        }, 22.5 * 1000)
    }
    var bindings = [{
        element: '.sign',
        event: 'click',
        handler: initPage.modify
    }, {
        element: '.init .btn-enter',
        event: 'click',
        handler: initPage.enter,
    }, {
        element: '.init .btn-cancel',
        event: 'click',
        handler: initPage.cancel
    }, {
        element: '.init .smbtn-add',
        event: 'click',
        handler: initPage.add
    }, {
        element: '.init .smbtn-minus',
        event: 'click',
        handler: initPage.minus
    }, {
        element: '.init .go-btn',
        event: 'click',
        handler: initPage.run
    }, {
        element: '.once-again .top-btn',
        event: 'click',
        handler: initPage.onceAgain
    }]


    function init() {
        View.render({
            bindings: bindings
        });
    }

    return {
        init: init
    }
})
