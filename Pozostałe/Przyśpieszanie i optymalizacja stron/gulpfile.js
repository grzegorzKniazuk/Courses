const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('uglify');
const rename = require('rename');

// laczenie js i minifikacja js
// jako src trzeba podac tablice jesli wymagana jest konkretna kolejnosc laczenia plikow

gulp.task('concat', () => {
    gulp.src('src/*.js').pipe(concat('scripts.js')).pipe(rename('scripts.min.js')).pipe(minify()).pipe(gulp.dest('scripts'));
});
