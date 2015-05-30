#elefixed
elefixed是一款js插件，提供原生js和jQuery版本。它可以让一个元素在随着页面向下滚动到达浏览器顶部时，固定在那，向上滚动时又回到原来的状态。
查看[DEMO](http://kisnows.com/eleFixed/#)

其中elefixed.js是原生js版，不依赖其它库，jelefixed.js需要依赖jQuery。
##使用方法:
###原生js版：
首先在html中引入elefixed.js文件，然后这样调用它`:elefixed("ele");`，其中的`"ele"`可以换为你要设置元素的id。
###jQuery版：
直接在元素后面调用该方法即可，像这样`$("ele").elefixed()`,这里的`"ele"`不再像原生版一样需要id值了，只要能选中该元素即可。
##最后
希望你能用的愉快
