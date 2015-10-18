#一个模仿支付宝交易密码输入框的前端实现
DEMO: [http://kisnows.com/password-input/](http://kisnows.com/password-input/)
打开控制台，可以看到输入的密码以及点击按钮的动作。
##简介
+ 点击输入框，既可以输入或删除密码。
+ 点击取消或确定按钮可以触发相应的回掉函数
  - 默认点击取消无回掉
  - 默认点击确定，打印用户输入的密码并清空输入框

##使用方法
直接像下面这样调用就可以了

```javascript
//前面一个是取消的回掉单数，后一个是确定的回掉函数，
//确定的回掉函数会接受一个参数，参数为输入的密码
   popupPassword(cancelCB, enterCB); 
```

一个简单的例子
```javascript
  popupPassword(null, function (a) {
      console.log(a + '1')        //a就是已经输入的密码
  });
```
