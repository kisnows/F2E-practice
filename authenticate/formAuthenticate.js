/**
 * @description 表单验证
 * @author yq12315@gmail.com
 * @version 1.0
 */

if (typeof Object.create != 'function') {
  (function () {
    var F = function () {
    };
    Object.create = function (o) {
      if (arguments.length > 1) {
        throw Error('Second argument not supported');
      }
      if (o === null) {
        throw Error('Cannot set a null [[Prototype]]');
      }
      if (typeof o != 'object') {
        throw TypeError('Argument must be an object');
      }
      F.prototype = o;
      return new F();
    };
  })();
}

var Authenticate = function (el, options) {
  this.$ = function (id) {
    return document.getElementById(id);
  };
  this.el = this.$(el);
  this.isRight = [];		//一个存放每个输入框验证是否通过状态的数组
  this.allRight = false; //对外暴露出一个参数allRight
  this.options = options || {};

  this.init(options);
};

Authenticate.prototype = {
  constructor: Authenticate,

  validate: function () { 		//验证函数
    var that = this;

    for (var i in that.options.validates) {
      // console.log(i);
      (function (j) {

        var inpId = that.options.validates[j].id,
          inpValidate = that.validateMethod[that.options.validates[j].validate] ? that.validateMethod[that.options.validates[j].validate] : that.options.validates[j].validate,
          inpOptional = that.options.validates[j].optional,
          inpRemote = that.options.validates[j].remote;

        that.$(inpId)[onblur] = function () { 		//在blur时，进行格式验证
          var inpValue = that.$(inpId).value;

          if (inpOptional && !inpValue) { 		//如果是可选项，则只在输入时进行判断，否则不予判断
            that.isRight[j] = true;
          } else {								//非可选项验证方法
            if (inpValidate(inpValue)) {		//验证通过
              that.isRight[j] = true;
              that.hideTip(this);
              var remoteThis = this;
              if (inpRemote) { 				//如果本地格式验证正确，则根据需要进行远程验证
                var xmlhttp = new XMLHttpRequest();
                console.log(inpRemote, that.getRemoteParams(inpId), 'a');
                xmlhttp.open("POST", inpRemote, true);
                // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.onreadystatechange = function () {
                  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    if (xmlhttp.errorNumber === 1) {
                      that.isRight[j] = true;
                      that.hideTip(remoteThis, "has");
                    } else {
                      that.isRight[j] = false;
                      that.showTip(remoteThis, "has");
                    }
                  }
                };
                xmlhttp.send(that.getRemoteParams(inpId)); 		//发送数据的内容由getRemoteParams()方法提供
              }
            } else {												//验证未通过
              that.isRight[j] = false;
              that.showTip(this);
            }
          }
        };
      })(i);
    }
  },
  getRemoteParams: function (id) {
    return this.$(id).value;
  },

  initTip: function (focusInp) { 					//初始化错误提示
    var that = this;
    for (var i in that.options.validates) {
      (function (i) {
        var inpId = that.options.validates[i].id,
          inpErrorMsg = that.options.validates[i].errorMsg,
          inpRemoteErrorMsg = that.options.validates[i].remoteErrorMsg,
          inpNodeType = that.options.validates[i].nodeType ? that.options.validates[i].nodeType : 'span',
          inpStyle = that.options.validates[i].style,
          parent = that.$(inpId).parentNode;

        var tiper = document.createElement(inpNodeType);
        tiper.innerHTML = inpErrorMsg;
        tiper.setAttribute('class', 'js_valid_tip');

        if (inpStyle) { 						//自定义错误提示样式
          for (i in inpStyle) {
            tiper.style[i.toString()] = inpStyle[i];
          }
        }
        parent.appendChild(tiper);
        if (inpRemoteErrorMsg) { 				//如果有远程验证，则初始化远程验证后的错误信息
          var remoteTiper = document.createElement(inpNodeType);
          remoteTiper.innerHTML = inpRemoteErrorMsg;
          remoteTiper.setAttribute('class', 'js_valid_tip');
          remoteTiper.style.display = 'none';
          parent.appendChild(remoteTiper);
        }
        tiper.style.display = 'none';
      })(i);
    }
  },
  showTip: function (focusInp, hasRemote) { 			//如果传入第二个参数，则操作远程验证后的提示信息
    var par = focusInp.parentNode,
      thisTiper;

    if (hasRemote) {
      thisTiper = this.getByClass(par, 'js_valid_tip')[1];
    } else {
      thisTiper = this.getByClass(par, 'js_valid_tip')[0];
    }
    thisTiper.style.display = 'inline-block';
  },
  hideTip: function (focusInp, hasRemote) {
    var par = focusInp.parentNode,
      thisTiper;

    if (hasRemote) {
      thisTiper = this.getByClass(par, 'js_valid_tip')[1];
    } else {
      thisTiper = this.getByClass(par, 'js_valid_tip')[0];
    }
    thisTiper.style.display = "none";
  },
  callBack: function () {
    var that = this;
    setTimeout(tof, 100);
    var allIsRight = this.options.submit.allIsRight,
      sthIsWrong = this.options.submit.sthIsWrong,
      allRight = this.allRight;

    function tof() {
      for (var i in that.isRight) {
        allRight = that.isRight[i];
      }
      if (allRight) {
        allIsRight();
      } else {
        sthIsWrong();
      }
    }
  },
  init: function (options) {
    var that = this;
    this.initTip();
    this.validate();
    this.el.onclick = function () {
      that.callBack();
    };
  },
  getByClass: function (par, cla) { 		//获取class函数
    var allEle = par.getElementsByTagName("*");
    var arr = [];
    for (var i = 0; i < allEle.length; i++) {
      if (allEle[i].className == cla) {
        arr.push(allEle[i]);
      }
    }
    return arr;
  },
  validateMethod: {						//默认验证方法
    notEmpty: function (value) {
      return !!value;
    },
    phoneNumber: function (value) {
      var val = parseInt(value);
      return !!(typeof (val) === "number" && !isNaN(val) && val.toString().length === 11);
    },
    telNumber: function (value) {
      var val = parseInt(value);
      return !!(typeof (val) === "number" && !isNaN(val) && val.toString().length === 7);
    },
    zipCode: function (value) {
      var val = parseInt(value);
      return !!(typeof (val) === "number" && !isNaN(val) && val.toString().length === 6);
    },
    email: function (val) {
      var eList = val.split('');
      for (var i = eList.length - 1; i >= 0; i--) {
        if (eList[i] === '@' && i > 0 && i < eList.length - 3) { //存在’@‘，并且’@‘前后必须有其它字符
          var j = i;
          for (j; j < eList.length - 1; j++) { //在'@'后面才在‘.’，并且'.'不在最后一位
            if (eList[j] === '.') {
              return true;
            }
          }
        }
      }
      return false;
    }
  }
};
// var notEmpty, zipCode, telNumber;
//实例
var test = new Authenticate('myinfo_modify', {
  validates: {
    location: {
      id: 'test1',							//需验证项的id
      validate: 'notEmpty', 					//验证方法,默认有notEmpty phoneNumber telNumber zipCode email，也可以自定义
      errorMsg: '请输入正确的联系地址',		//错误信息
      nodeType: 'a', 							//可选参数，默认为‘span’
      remote: '../test.json', 				//可选参数，远程验证地址。如果有则在本地验证通过后进行远程验证，否则不进行远程验证
      getRemoteParams: function () {
      }, 			//可选参数，自定义发送内容。默认发送input的value值
      remoteErrorMsg: '测试', 				//远程验证错误信息，如果有remote参数，则必填
      style: { 								//自定义错误信息样式
        fontSize: '14px',
        color: 'orange'
      },
      optional: false 						//是否为可选填项，没有此参数则默认是必填项
    },
    zipCode: {
      id: 'test2',
      validate: 'zipCode',
      errorMsg: '请输入正确的邮编号码'
    },
    tel: {
      id: 'test3',
      validate: 'telNumber',
      errorMsg: '请输入正确的电话号码',
      optional: true
    }
  },
  submit: {
    allIsRight: function () { 					//校验通过后的回调函数
      console.log('success');
    },
    sthIsWrong: function () { 					//校验失败后的回调函数
      console.log('falie');
    }
  }
});
