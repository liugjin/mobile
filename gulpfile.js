var gulp = require('gulp');
var watch = require('gulp-watch');

var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var coffee = require('gulp-iced');
var pug = require('gulp-pug');
// var json = require('gulp-json');
// var uglify = require('gulp-uglify');

var basePath = './app/';
var paths = {
  sass: [basePath + 'styles/**/*.scss'],
  coffee: [basePath + 'scripts/ionic/**/*.coffee'],
  css: [basePath + 'scripts/ionic/**/*.css'],
  html: [basePath + 'scripts/ionic/**/*.html'],
  png: [basePath + 'scripts/ionic/**/*.png'],
  svg: [basePath + 'scripts/ionic/**/*.svg'],
  lib: [basePath + 'scripts/lib/**/*.coffee'],
  pug: [basePath + 'views/**/*.pug'],
  json: [basePath + 'scripts/ionic/**/*.json'],
  // dest
  sassDest: './www/css/',
  coffeeDest: './www/js/',
  // jsonDest: './www/json/',
  libDest: './www/lib/',
  pugDest: './www/templates/'
};

gulp.task('default', ['watch']);
gulp.task("ionic:watch:before", ['watch']);

function handleError(error) {
  console.error(error.toString());
  this.emit('end');
}

// sass
gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.sassDest))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.sassDest))
    .on('end', done);
});

// coffee
gulp.task('coffee', function (done) {
  gulp.src(paths.coffee)
    .pipe(coffee({ bare: true, runtime: 'inline' }).on('error', handleError))
    //.pipe(uglify())
    .pipe(gulp.dest(paths.coffeeDest));
  gulp.src(paths.css)
    .pipe(gulp.dest(paths.coffeeDest));
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.coffeeDest));
  gulp.src(paths.png)
    .pipe(gulp.dest(paths.coffeeDest));
  gulp.src(paths.svg)
    .pipe(gulp.dest(paths.coffeeDest))
    .on('end', done);
});

gulp.task('lib', function (done) {
  gulp.src(paths.lib)
    .pipe(coffee({ bare: true }).on('error', handleError))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.libDest))
    .on('end', done);
});

// pug
gulp.task('pug', function (done) {
  gulp.src(paths.pug)
    .pipe(pug({pretty: true}).on('error', handleError))
    .pipe(gulp.dest(paths.pugDest))
    .on('end', done);
});

// json
gulp.task('json', function (done) {
  gulp.src(paths.json)
    // .pipe(json())
    .pipe(gulp.dest(paths.coffeeDest))
    .on('end', done);
});

// watch
gulp.task('watch', ['sass', 'pug', 'lib', 'coffee', 'json'], function() {
  watch(paths.sass, function() {
    gulp.start('sass');
  });
  watch(paths.pug, function() {
    gulp.start('pug');
  });
  watch(paths.lib, function() {
    gulp.start('lib');
  });
  watch(paths.coffee, function() {
    gulp.start('coffee');
  });
  watch(paths.json, function() {
    gulp.start('json');
  });
});
