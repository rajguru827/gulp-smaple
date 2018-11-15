const gulp = require('gulp');
const concat = require('gulp-concat');
var stripCssComments = require('gulp-strip-css-comments');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');

// Some pointless comments for our project.

var devMode = false;

gulp.task('css', function() {
    gulp.src(styles)
        .pipe(concat('main.css'))
		.pipe(stripCssComments())
		.pipe(sourcemaps.init())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', function() {
    return gulp.src([
		'./assets/vendor/font-awesome-4.6.3/fonts/fontawesome-webfont.*',
		'./assets/vendor/bootstrap/fonts/glyphicons-halflings-regular.*',
		'./assets/vendor/kendoUi/styles/fonts/glyphs/*.woff,*.ttf',
		'./assets/fonts/roboto/*.woff'])
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js', 'fonts'])
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('start', function() {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./assets/css/**/*.css'], ['css']);
    gulp.watch(['./app/**/*.js'], ['js']);
});