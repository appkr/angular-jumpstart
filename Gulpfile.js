var theme = "sandstone";

var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  gutil = require("gulp-util"),
  notify = require("gulp-notify"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify-css"),
  uglify = require("gulp-uglify");

var targetCssDir = "css",
  targetJsDir = "js",
  targetFontDir = "fonts";

gulp.task("myAsset", function() {
  gulp.src([
    "assets/scss/**/*.scss"
  ])
    .pipe(sass().on("error", gutil.log))
    .pipe(autoprefixer("last 10 version", "ie8"))
    .pipe(minify({keepSpecialComments:0}))
    .pipe(concat("style.min.css"))
    .pipe(livereload())
    .pipe(gulp.dest(targetCssDir));

  return gulp.src([
    "assets/js/**/*.js"
  ])
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(targetJsDir))
    .pipe(livereload())
    .pipe(notify({message: 'myAsset complete'}));
});

gulp.task("vendorAsset", function() {
  gulp.src([
    "vendor/bootstrap/dist/css/bootstrap.css"
  ])
    .pipe(minify())
    .pipe(concat("vendor.min.css"))
    .pipe(gulp.dest(targetCssDir));

  gulp.src([
    "vendor/bootstrap/fonts/**/*.*"
  ])
    .pipe(gulp.dest(targetFontDir))

  return gulp.src([
    "vendor/jquery/dist/jquery.js",
    "vendor/bootstrap/dist/js/bootstrap.js",
    "vendor/angular/angular.js",
    "vendor/angular-route/angular-route.js",
    "vendor/angular-animate/angular-animate.js"
  ])
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(targetJsDir))
    .pipe(notify({message: 'vendorAsset complete'}));
});

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch([
      "assets/scss/**/*.scss",
      "assets/js/**/*.js"
    ], ["myAsset"]
  );
});

gulp.task("all", ["myAsset", "vendorAsset"])

gulp.task("default", ["watch"]);