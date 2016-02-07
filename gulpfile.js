var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var purifycss = require('gulp-purifycss');
var sassdoc = require('sassdoc');
var exec = require('child_process').exec;

var paths = {
  bootstrap: 'node_modules/bootstrap-sass/assets',
  jquery: 'node_modules/jquery/dist',
  assets: '_assets',
  sass: '_assets/stylesheets',
  site: '_site',
  css: 'assets/css',
  fonts: 'assets/fonts',
  js: 'assets/js',
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: [paths.bootstrap + '/stylesheets']
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

//noinspection JSUnusedGlobalSymbols
var sourcemapsOptions = {
  mapFile: function (mapFilePath) {
    // source map files are named *.map instead of *.js.map
    return mapFilePath.replace('.js.map', '.map');
  }
};

/*
 * Update Tasks
 */
gulp.task('update-jquery', function(cb) {
  return exec('npm update jquery', function(err, stdout, stderr) {
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
  return exec('npm update bootstrap-sass', function(err, stdout, stderr) {
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
  return gulp
    .src(paths.js + '/custom.js')
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
    .pipe(sourcemaps.write('.', sourcemapsOptions))
    .pipe(gulp.dest(paths.js));
});

gulp.task('compress-css', function() {
  return gulp
    .src([paths.css + '/*.css', '!' + paths.css + '/*.min.css'])
    .pipe(sourcemaps.init())
      .pipe(minifycss())
      .pipe(rename({
        suffix: '.min'
      }))
    .pipe(sourcemaps.write('.', sourcemapsOptions))
    .pipe(gulp.dest(paths.css));
});

gulp.task('compress', ['compress-js', 'compress-css']);

gulp.task('jekyll-build', ['build-bootstrap'], function (cb) {
  return exec('jekyll build', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build-bootstrap', function () {
  return gulp
    .src(paths.sass + '/custom.scss')
    .pipe(sourcemaps.init())
      .pipe(sass(sassOptions))
      .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.', sourcemapsOptions))
    .pipe(gulp.dest(paths.css));
});

gulp.task('purify', ['jekyll-build'], function() {
  return gulp.src([paths.css + '/custom.css'])
    .pipe(sourcemaps.init())
      .pipe(purifycss([paths.js + '/custom.js', paths.site + '/**/*.html']))
    .pipe(sourcemaps.write('.', sourcemapsOptions))
    .pipe(gulp.dest(paths.css));
});

gulp.task('build', ['purify', 'compress-js']);

/*
 * Testing and Debugging Tasks
 */
gulp.task('jekyll-serve', function (cb) {
  return exec('jekyll serve', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', ['build-bootstrap'], function () {
  return gulp.watch(paths.sass + '/*.scss', ['build-bootstrap']);
});

gulp.task('debug', ['watch', 'jekyll-serve']);

/*
 * Default Task
 */
gulp.task('default', ['build-bootstrap']);

