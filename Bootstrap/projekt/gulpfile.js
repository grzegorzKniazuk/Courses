const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('css', () => {
   return gulp.src('source/style.scss').pipe(sass({
       outputStyle: 'compressed',
   })).pipe(gulp.dest('style'));
});

gulp.task('watch', () => {
    gulp.watch('source/**/*.scss', [ 'css' ]);
});