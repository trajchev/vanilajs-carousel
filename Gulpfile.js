const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const minify = require('gulp-minify');

// Compile scss to css
function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream())
}

function jses() {
    return gulp.src('./js/**/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets: [
            [
                '@babel/env', {
                    modules: false
                }
            ]
        ]
    }))
    .pipe(minify())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js', jses);
}

exports.style = style;
exports.watch = watch;