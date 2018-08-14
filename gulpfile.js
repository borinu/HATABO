var gulp = require('gulp');
var babel = require('gulp-babel');
var src_dir = 'WORKS/src/**/js/*.js'

gulp.task('default', function () {
    return gulp.src(src_dir)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('WORKS/dist'));
});
gulp.task('watch', function(){
    gulp.watch(src_dir, ['default']);
});