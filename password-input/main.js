function popupPassword(cancelCB, enterCB) {
    var passwordPar = document.querySelector('.password-dialog');
    var password = document.querySelector('#password');
    var pas = document.querySelector('.password-view').querySelectorAll('span');
    var enter = document.querySelector('#ppEnter');
    var cancel = document.querySelector('#ppCancel');
    var passwordValue;

    /**
     * 初始化密码输入框
     */
    function init() {
        for (var i = pas.length - 1; i >= 0; i--) {
            pas[i].className = '';
        }
        password.value = '';
    }

    /**
     * 输入控制逻辑，同步原点的添加和删除
     */
    function passInput() {
        passwordPar.onclick = function () {
            password.focus();
        };
        password.oninput = function () {
            var length = this.value.length;
            for (var i = pas.length - 1; i >= 0; i--) {
                pas[i].className = '';
            }
            for (var j = length - 1; j >= 0; j--) {
                pas[j].className = 'active';
            }
        };
    }

    /**
     * 点击取消按键要执行的动作
     */
    function passCancel() {
        cancel.onclick = function (e) {
            e.stopPropagation();
            // doSomeThing when cancel has been click
            if (cancelCB) {
                cancelCB();
            } else {
                console.log('cancel');
            }
        };
    }

    /**
     * 点击确定案件要执行的动作
     */
    function passEnter() {
        enter.onclick = function (e) {
            e.stopPropagation();
            passwordValue = password.value;
            if (passwordValue.length === 6) {
                if (enterCB) {
                    enterCB.call(enterCB,passwordValue);
                } else {
                    console.log(passwordValue);
                    init();
                }
            } else {
                alert('密码长度小于六位，请重新输入');
            }
        };
    }

    passInput();
    passCancel();
    passEnter();
}