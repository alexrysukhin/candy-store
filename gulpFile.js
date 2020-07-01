let gulp = require('gulp');
let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let del = require ('del');
let browserSync = require('browser-sync').create();
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
// let normalize = require('node-normalize-scss');
let plumber = require('gulp-plumber');
let notify = require('gulp-notify')


let cssFiles = [
    './src/css/adjastment.scss',
    './src/css/header.scss',
    './src/css/header-slider.scss',
    './src/css/sotasty.scss',
    './src/css/production.scss',
    './src/css/team.scss',
    './src/css/form.scss',
    './src/css/question.scss',
    './src/css/footer.scss',
    './src/css/location.scss',
    // './src/css/normalize.scss',
    './src/css/mixins.scss',
    './src/css/stylesheet.css'


]
let jsFiles = [
    './src/js/main.js',
    './src/js/list.js'

]


//Таск на стили
function styles() {
    return gulp.src(cssFiles)
    .pipe(plumber({
        errorHandler:notify.onError(function(err){
            return {
                title: 'Styles',
                message: err.message
            }
        })
    }))
    .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        //Обьединение файлов в один
        .pipe(concat('style.css'))
        //Подключение префиксов для scss
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        //Минификация CSS
        .pipe(cleanCSS({
            level:2
            }))
    .pipe(sourcemaps.write())
    //Выходная папка для стилей
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
}

//Таск на скрипты
function scripts(){
    return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

//
function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    //Следить за CSS файлами
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/css/**/*.scss', styles)
    //Следить за js файлами
    gulp.watch('./src/js/**/*.js', scripts)
    //При изменении HTML запустить синхронизацию
    gulp.watch('./*.html').on('change',browserSync.reload)
}
//Таск вызывающий функцтю styles
gulp.task('styles', styles);
//Таск вызывающий функцию scripts
gulp.task('scripts', scripts);
//Таск для очистки папки build
gulp.task('del', clean);
//Таск для отслеживания изменений
gulp.task('watch', watch);
//Таск для удаления файлов в папке  build и запуска styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
//Таск запускает таск build и watch последовательно
gulp.task('dev', gulp.series('build','watch'));