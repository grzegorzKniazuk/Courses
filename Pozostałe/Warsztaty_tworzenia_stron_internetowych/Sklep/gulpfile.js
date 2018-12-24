const gulp = require('gulp');
const gulpSass = require('gulp-sass');

gulp.task('css', () => {
    return gulp.src('./dev-assets/style.scss').pipe(gulpSass()).pipe(gulp.dest('./prod-assets'));
});

gulp.task('watch', () => {
    gulp.watch('./dev-assets/**/*.scss', gulp.series('css'));
});
