var gulp = require('gulp'),
    less = require('gulp-less');
// var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
//     autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});


gulp.task('less', function() {
    gulp.src('./less/main.less')
        .pipe(less())
        .pipe(gulp.dest('./style'));
});


gulp.task('watch',function(){
	gulp.watch('less/*.less',['less']);
});

gulp.task('default',['less','watch']);
