const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');
const staticConfig = require('./static.config');

let src = `${__dirname}/src/${staticConfig.path}`;
let dist = `${__dirname}/dist/${staticConfig.path}`;

let paths = {
    js : `${src}/js`,
    scss : `${src}/sass`,
    img : `${src}/img`,
};

let compileSass = ()=> {
    gulp.src(`${paths.scss}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dist}/css`));
};

let compileJs = ()=> {
    gulp.src(`${paths.js}/**/*.js`)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe( uglify() )
    .pipe(gulp.dest(`${dist}/js`));
};

let minifyImg = ()=> {
    gulp.src(`${paths.img}/*`)
    .pipe(imagemin([
            imagemin.gifsicle({interlaced:true}),
            imagemin.jpegtran({progressive:true}),
            imagemin.optipng({optimizationLevel:5})
        ])
    )
    .pipe(gulp.dest(`${dist}/img`));
};

gulp.task('watch', ()=> {
    compileJs();
    compileSass();
    minifyImg();
    watch(paths.js, compileJs);
    watch(paths.scss, compileSass);
    watch(paths.img, minifyImg);
    watch(`${src}/**/*`, (e) => {
        console.log(e.event+':'+e.path)
        // console.log(`${e.event}:${e.path.split('/').pop()}`);
    });
});