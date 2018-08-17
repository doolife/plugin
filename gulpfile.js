const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

let compileSass = ()=> {
    gulp.src('src/selectbox/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
    .pipe( concat('index.css') )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/selectbox'));
};

gulp.task('watch', ()=> {
    watch('src/selectbox/sass/**/*.scss', compileSass);
    watch('src/**/*', (e) => {
        console.log(e.event+":"+e.path)
        // console.log(`${e.event}:${e.path.split('/').pop()}`);
    });
});

// let compileJs = () => {
//     // js 하위 디렉터리 내의 모든 자바스크립트 파일을 가져온다.
//     gulp.src(['src/selectbox/js/**/*.js'])
//     // 상단에서 참조한 concat 모듈을 호출하고 병합할 파일네이밍을 정의
//     .pipe( concat('index.js') )
//     // 위에서 수행한 task 를 배포지(dist)에 파일을 생성한다.
//     .pipe( gulp.dest('dist/js') );
// };
//
// let compileSass = () => {
//     gulp.src(['src/selectbox/sass/**/*.scss'])
//     .pipe( concat('index.css') )
//     .pipe( gulp.dest('dist/css') );
// };
//
// gulp.task('dist', () => {
//     // compileJs();
//     compileSass();
// });