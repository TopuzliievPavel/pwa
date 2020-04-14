'use strict';

const syntax = 'scss'; // syntax sass or scss;
const gulpVersion = 3; // Gulp version: 3 or 4;

const gulp  = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autopreffixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


const options = {
  default_js_file:'index.js',
  scripts:{
    src: './src/js/',
    dest:'./dist/js',
    watch: './src/js/**/*.js'
  },
  styles:{
    src: './src/'+syntax+'/*.'+syntax+'',
    dest:'./dist/css',
    watch: './src/'+syntax+'/**/*.'+syntax+''
  }
};

gulp.task('styles', () => {
  return gulp.src(options.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autopreffixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.styles.dest))
    .pipe(browserSync.stream());
});

// if you use 3 gulp version commented or uncommented it
gulp.task('mincss', ['styles'], () => {
  return gulp.src("dist/css/**.css")
    .pipe(rename({suffix: ".min"}))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist"));
});

// if you use 4 gulp version commented or uncommented it

// gulp.task('mincss', gulp.series('styles', () => {
//   return gulp.src("dist/css/**.css")
//     .pipe(rename({suffix: ".min"}))
//     .pipe(cleanCSS())
//     .pipe(gulp.dest("dist"));
// }));

gulp.task('js', () => {
  return browserify({
    extensions: ['.js'],
    entries: [options.default_js_file],
    debug: true
  })
    .transform(babelify.configure({
      presets: ['@babel/preset-env']
    }))
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
      this.emit('end');
    })
    .pipe(source(options.scripts.src))
    .pipe(buffer())
    .pipe(rename({
      dirname: "",
      basename: "index",
      suffix: ".js"
    }))
    .pipe(gulp.dest(options.scripts.dest))
    .pipe(browserSync.stream());
});

// If Gulp Version 3
if (gulpVersion === 3) {
  gulp.task('watch', () => {
    browserSync.init({
      server: {
        baseDir: "./dist"
      }
    });

    gulp.watch(options.scripts.watch, ['js']);
    gulp.watch(options.default_js_file, ['js']);
    gulp.watch(options.styles.watch, ['styles']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
  });
  gulp.task('dev', ['watch']);
  gulp.task('prod', ['mincss']);
}

// If Gulp Version 3
if (gulpVersion === 4) {
  gulp.task('watch', () => {
    browserSync.init({
      server: {
        baseDir: "./dist"
      }
    });

    gulp.watch(options.scripts.watch, gulp.parallel('js'));
    gulp.watch(options.default_js_file, gulp.parallel('js'));
    gulp.watch(options.styles.watch, gulp.parallel('styles'));
    gulp.watch("dist/*.html").on('change', browserSync.reload);
  });
  gulp.task('dev', gulp.parallel('watch'));
  gulp.task('prod', gulp.parallel('mincss'));
}
