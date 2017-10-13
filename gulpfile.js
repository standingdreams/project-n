var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var moduleImporter = require('sass-module-importer');

var pleeeaseOpt = {
  browsers: ['last 4 versions'],
  minifier: false
}
var testSite = "project.local:8888";
var pageReload = browserSync.reload;

gulp.task('serve', ['process-sass'], function() {
  browserSync({
    proxy: testSite,
    browser: "google chrome",
    ui: false
  });
});

gulp.task('process-sass', function() {
  return gulp.src('_source/sass/now-ui-kit.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(pleeease(pleeeaseOpt))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch', ['serve'], function() {
  gulp.watch('./**/*.html').on('change', pageReload);
  gulp.watch('_source/sass/**/*.scss', ['process-sass']);
});

gulp.task('default', ['process-sass', 'serve', 'watch']);