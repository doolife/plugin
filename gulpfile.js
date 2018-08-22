const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const staticConfig = require('./static.config');

let src = `src/${staticConfig.path}`;
let dist = `dist/${staticConfig.path}`;

let paths = {
    js : `${src}/js/**/*.js`,
    scss : `${src}/sass/**/*.scss`,
};

let compileSass = ()=> {
    gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist+'/css'));
};

let compileJs = ()=> {
    gulp.src(paths.js)
    .pipe( uglify() )
    .pipe(gulp.dest(`${dist}/js`));
};

gulp.task('watch', ()=> {
    watch(paths.js, compileJs);
    watch(paths.scss, compileSass);
    watch('src/**/*', (e) => {
        console.log(e.event+':'+e.path)
        // console.log(`${e.event}:${e.path.split('/').pop()}`);
    });
});