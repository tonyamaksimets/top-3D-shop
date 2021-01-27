const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require('gulp-posthtml');
const include = require("posthtml-include");
const del = require("del");
const server = require("browser-sync").create();
const concat = require("gulp-concat");


// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;


// Images
const images = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png,svg}"])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
}

exports.images = images;


const webp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
}

exports.webp = webp;


// Sprite
const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;


//Copy
const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));;
}

exports.copy = copy;


//Clean
const clean = () => {
  return del("build");
}

exports.clean = clean;


//Html
const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
}

exports.html = html;


// Scripts
const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("build/js"));
}

exports.scripts = scripts;


//Build
const build = gulp.series (
  clean,
  html,
  copy,
  styles,
  sprite,
  scripts
)

exports.build = build;


// Server
const server = (done) => {
  server.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;


// Watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", server.reload));
  gulp.watch("source/*.html", gulp.series("html", server.reload));
  gulp.watch("source/js/*.js", gulp.series("scripts", "html", server.reload));
}

exports.default = gulp.series(
  build, server, watcher
);
