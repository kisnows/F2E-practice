window.onerror = function (errMsg, scriptURI, lineNumber, columnNumber, errorObj) {
  setTimeout(function () {
    var rst = {
      "错误信息：": errMsg,
      "出错文件：": scriptURI,
      "出错行号：": lineNumber,
      "出错列号：": columnNumber,
      "错误详情：": errorObj
    };

    alert('出错了，下一步将显示错误信息');
    alert(JSON.stringify(rst, null, 10));
  });
};
window.onload = function () {
  document.querySelector('#upload').addEventListener('change', function () {
    var that = this;
    lrz(that.files[0]).then(function (rst) {
      var img = new Image(),
        div = document.createElement('div'),
        p = document.createElement('p'),
        sourceSize = toFixed2(that.files[0].size / 1024),
        resultSize = toFixed2(rst.base64Len / 1024),
        scale = parseInt(100 - (resultSize / sourceSize * 100));

      p.style.fontSize = 13 + 'px';
      p.innerHTML = '源文件：<span class="text-danger">' +
        sourceSize + 'KB' +
        '</span> <br />' +
        '压缩后传输Base64：<span class="text-success">' +
        resultSize + 'KB (省' + scale + '%)' +
        '</span> ';

      div.appendChild(img);
      div.appendChild(p);

      img.onload = function () {
        that.parentNode.appendChild(div);
      };

      img.src = rst.base64;
      console.log(rst);
      return rst;
    }).then(function (rst) {
      var xmlHttp = new XMLHttpRequest();

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          console.log(xmlHttp.responseText);
        }
      };
      xmlHttp.open("POST", "/", true);
      xmlHttp.setRequestHeader("Content-type", "application/json");
      xmlHttp.send(JSON.stringify(rst));
    })
  }, false);
};
function toFixed2(num) {
  return parseFloat(+num.toFixed(2));
}