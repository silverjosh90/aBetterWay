"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify= require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream')
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var toastr = require('toastr');
var jest = require('gulp-jest')



var config = {
  port: 9000,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './public/src/*.html',
    js: './public/src/**/*.js',
    css: './public/src/*.css',
    images: './public/src/images/*',
    dist: './public/dist',
    public: './public',
    mainJs: './public/src/main.js'
  }
}

gulp.task('connect', function(){
  connect.server({
    root: ['public/dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  })
});

gulp.task('open', ['connect'], function(){
    gulp.src('./index.html')
      .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
})

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.public))
    .pipe(connect.reload());
})

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.public + '/scripts'))
    .pipe(connect.reload());
})

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.public + '/images'))
    .pipe(connect.reload())
})

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.public + '/css'));
});



gulp.task('lint', function(){
  return gulp.src(config.paths.js)
    .pipe(eslint({config: 'eslint.config.json'}))
    .pipe(eslint.format());
})

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html'])
  gulp.watch(config.paths.js, ['js', 'lint'])
})

gulp.task('default', ['html', 'lint', 'images', 'js', 'css', 'open', 'watch']);
