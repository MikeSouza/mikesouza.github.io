var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sassdoc = require('sassdoc');
var exec = require('child_process').exec;

var paths = {
  bootstrap: 'node_modules/bootstrap-sass/assets',
  jquery: 'node_modules/jquery/dist',
  assets: '_assets',
  sass: '_assets/stylesheets',
  css: 'assets/css',
  fonts: 'assets/fonts',
  js: 'assets/js'
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: [paths.bootstrap + '/stylesheets']
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

/*
 * Update Tasks
 */
gulp.task('update-jquery', function(cb) {
  exec('npm update jquery', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('copy-jquery', function() {
  return gulp
    .src(paths.jquery + '/jquery.*')
    .pipe(gulp.dest(paths.js));
});

gulp.task('update-bootstrap', function(cb) {
  exec('npm update bootstrap-sass', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('copy-bootstrap-js', function() {
  return gulp
    .src(paths.bootstrap + '/javascripts/bootstrap.*')
    .pipe(gulp.dest(paths.js));
});

gulp.task('copy-bootstrap-fonts', function() {
  return gulp
    .src(paths.bootstrap + '/fonts/bootstrap/*')
    .pipe(gulp.dest(paths.fonts));
});

gulp.task('copy-bootstrap-stylesheets', function(){
  return gulp
    .src(paths.bootstrap + '/stylesheets/**/*')
    .pipe(gulp.dest(paths.sass));
});

gulp.task('update', ['update-jquery', 'copy-jquery', 'update-bootstrap', 'copy-bootstrap-fonts', 'copy-bootstrap-js']);

/*
 * Build Tasks
 */
gulp.task('build-sassdoc', function() {
  var opts = {
    dest: '_docs',
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true
    }
  };

  //noinspection JSUnresolvedFunction
  return gulp
    .src(paths.sass)
    .pipe(sassdoc(opts))
    .resume();
});

gulp.task('compress-js', function () {
  gulp.src(paths.js + '/custom.js')
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js));
});

gulp.task('jekyll-build', function (cb) {
  exec('jekyll build', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build-bootstrap', function () {
  return gulp
    .src(paths.sass + '/custom.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    //.pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(paths.css));
});

gulp.task('build', ['build-bootstrap', 'compress-js', 'jekyll-build']);

/*
 * Testing and Debugging Tasks
 */
gulp.task('jekyll-serve', function (cb) {
  exec('jekyll serve', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '/*.scss', ['build-bootstrap']);
});

gulp.task('debug', ['watch', 'jekyll-serve']);

/*
 * Default Task
 */
gulp.task('default', ['build-bootstrap']);

