var gulp = require('gulp'),
less = require('gulp-less');    //引入less插件

// 定义 less 任务
gulp.task('less', function() {
    gulp.src('./less/main.less')
        .pipe(less())
        .pipe(gulp.dest('./style'));
});

//监控less文件，一旦有更改，就执行less编译任务
gulp.task('watch',function(){
    gulp.watch('less/*.less',['less']);
});
//默认任务
gulp.task('default',['less','watch']);
