var gulp = require('gulp');

// Include Our Plugins
    // debug = require('gulp-debug'),  // uncomment plugin when debugging
    sass = require('gulp-sass'),
    lessToScss = require('gulp-less-to-scss'),
    bless = require('gulp-bless'),
    cleanCSS = require('gulp-clean-css'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    streamQueue = require('streamqueue'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    stylelint = require('stylelint'),
    syntax_scss = require('postcss-scss'),
    reporter = require('postcss-reporter'),
    postcss = require('gulp-postcss'),
    flatten = require('gulp-flatten'),

    browserSync = require('browser-sync').create();

// Sass/CSS Files - the folder, files to look for, and destination
var paths = {
  styles: {
    src: './scss',
    files: ['./src/assets/scss/*.scss', './scss/*/**/*.scss'],
    minify: './src/assets/scss/main.css',
    syncFiles: '.',  // BrowserSync
    // directories to exclude (from compiling, etc.)
    exclude: ['!./Content/global/scss_converted/**/*', '!./Components/**/*'],
    dest: './src/assets/css'
  },
  html: {
    files: ['*.html', '*/*.html', '*/**/*.html']
  }
};

// BrowserSync: automatically refresh browser(s) & watch for changes to files
// Static Server + watching scss/html files
gulp.task('browsersync', ['minify'], function() {
  browserSync.init({
      server: "./"
  });
  gulp.watch(paths.styles.files, ['minify']);
  gulp.watch(paths.html.files).on('change', browserSync.reload);
});

// Watch for changes to Sass files on all Pages
gulp.task('watch', function () {
  gulp.watch(paths.styles.files)
  .on('change', function () {
    return gulp.src(paths.styles.files) // Gets all files ending with .scss in content/global
      .pipe(sourcemaps.init())
        // Keep the outputStyle as 'nested' otherwise line #'s get thrown off in sourcemaps debugging
        .pipe(sass({ outputStyle: 'nested', precision: 6 }).on('error', sass.logError))  // sourceComments: 'map',
        .pipe(sourcemaps.write())  // Generate inline sourcemap file for debugging Sass files, add '.' for ext
       // Output to same destination as src
    .pipe(gulp.dest(function (file) {
      return file.base;
    }))
    .pipe(browserSync.stream());
  });
});

// Run PostCSS, minify, and then copy to 'css' folder
gulp.task('minify', function () {
  gulp.watch(paths.styles.minify)
  .on('change', function (file) {
    var destPath = file.path.replace('app.css', '.'),
        // PostCSS Plugins for Production CSS (PostCSS tasks must be AFTER the Sass task)
        processorsProd = [
          autoprefixer({ browsers: ['last 2 versions', 'not ie < 11'] }),
          //mqpacker(),
        ];

    gulp.src(file.path)
      .pipe(postcss(processorsProd))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cleanCSS({ debug: true, rebase: false }, function (details) {
        console.log('---- Minify CSS for Prod ----');
        console.log(file.path + ': ');
        console.log(details.stats.originalSize + ' original size' + ' --- '
        + details.stats.minifiedSize + ' minified size.');  //details.name + ': ' +
      }))
    .pipe(gulp.dest(destPath));
  });
});

// Main Task for compiling, minifying - simply run 'gulp run' via CLI
gulp.task('run', ['watch', 'minify', 'browsersync' ]);  // 'watch', 'browsersync'


// Bower Install Task
gulp.task('bowerInstall', function () {
  return bowerInstall();
});

// Bower Copy Task
gulp.task('bowerCopy', ['bowerInstall'], function () {
  return gulp.src(mainBowerFiles(), { base: './bower_components' })
    .pipe(bowerNormalizer({ bowerJson: './bower.json', checkPath: true }))
    .pipe(gulp.dest('Components'));
});

// Task for converting Less files to Sass (temporary install for transition -
// double check for errors!!! Pages won't be properly converted 100% to Sass correctly!!!)
gulp.task('lessToScss', function () {
  gulp.src('./Content/global/institutions/bbt/*.less')
    .pipe(lessToScss())
    .pipe(gulp.dest('./Content/scss_converted/global/institutions/bbt'));
});

// Copy Component/Content Fonts to public folder relative to compiled CSS file
gulp.task('fonts-copy', function () {
  return gulp.src(['./Components/*/fonts/*', './Content/*/fonts/*',])
  .pipe(flatten())
  .pipe(gulp.dest('./Content/fonts'));
});

// Stylelint Task for analyzing Sass files by running through Stylelint & produces report
gulp.task('analyze-scss', function () {
  return gulp.src(paths.styles.files)
    .pipe(postcss([
      stylelint(),
      reporter()],
      {syntax: syntax_scss}
    ));
});


// SAVE the Commented Out Task Directly Below!!!! Autoprefixer Check -
// Uncomment & run gulp via CLI to see the browser list, rules, selectors, & properties covered
// var info = autoprefixer({ browsers: ['last 3 versions', 'not ie < 11'] }).info();
// console.log(info);


// ---------------------------------------------------------------------------
// Compile and Minify a One-off Sass file (i.e.- Font-Icons-Fallback, etc.) - Run task seperately/independently!!!
gulp.task('compile-file', function (file) {
  var fileWatch = './Content/Css/font-icons-fallback.scss';  // change file name here
  gulp.watch(fileWatch);
    return gulp.src(fileWatch) // Gets all files ending with .scss in app/scss
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cleanCSS({ debug: true, rebase: false }, function (details) {
        console.log('---- Compile & Minify CSS for Prod ----');
        console.log(file.path + ': ');
        console.log(details.stats.originalSize + ' original size' + ' --- '
        + details.stats.minifiedSize + ' minified size.');
      }))
    .pipe(gulp.dest('./Content/Css/'));
});