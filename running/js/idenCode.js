define([], function() {
    function idenCode() {
        var that = this,
            timer,
            sec = 120;
        $$(this).addClass('iden-code-disable').prop('disabled', true);

        function minus() {
            sec -= 1;
            // console.log(sec)
            if (sec === 0) {
                clearInterval(timer);
                $$(that).removeClass('iden-code-disable').prop('disabled',false).text('获取验证码');
                return
            }
            $$(that).text(sec + '秒重新发送');
        }
        // clearInterval(timer);
        timer = setInterval(minus, 1000);
    }
    return {
        idenCode: idenCode
    }
})
