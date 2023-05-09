const {src, dest, watch, parallel, series} = require('gulp');               // series отвечает за последовательное выполнение задач

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');                            //  переименоввает фаили и делает из нескольктх один
const uglify = require('gulp-uglify-es').default;                   //  соединяет фаили js в один     
const browserSync = require('browser-sync').create();       
const autoprefixer = require('gulp-autoprefixer');                    // дописыввет необходимые префиксы, чтобы всё работало независимо от версий
const clean = require('gulp-clean');
const imageMin = require('gulp-imagemin');



function scripts(){
   return src('app/js/main.js')                                   // чтобф подключить большое число js фаилов Можно писать так 'app/js/*.js', '!app/js/main.min.js'
   .pipe(concat('main.min.js'))
   .pipe(uglify())
   .pipe(dest('app/js'))
   .pipe(browserSync.stream())
}

function styles() {
   return src('app/scss/*.scss')  
   .pipe(autoprefixer({overriderBrowserslist: ['last 10 version']}))                                             //находим фаил
   .pipe(concat('style.min.css'))
   .pipe(scss({outputStyle: 'compressed'}))                                  //применяем к нему gulp sass  и минимизируем
   .pipe(dest('app/css'))  
   .pipe(browserSync.stream())                                               // куда его отправляем
}

function images() {
   return src('app/images/src/*')
       .pipe(imageMin({
         progressive: true
       }))
       .pipe(dest('app/images/dest'))
       .pipe(browserSync.stream());
}


function watching(){
   watch(['app/scss/style.scss'], styles)
   watch(['app/js/main.js'], scripts)
   watch(['app/images/src'], images)
   watch(['app/*.html']).on('change', browserSync.reload)            // *:html  озгачает, что будут отслеживаться   изменения во всех html фаилах
}

function browsersync(){
   browserSync.init({
      server: {
         baseDir: "app/"
      }
   })
}

function cleanDist (){
   return src('dist')
   .pipe(clean())
}

function building(){
   return src([
      'app/css/style.min.css',                         // переносим нужные фвилы для продакшен 
      'app/js/main.min.js',
      'app/*.html',
      'app/images/dest/*'],
      {base: 'app'})                                       //означает что мы сохраняем базовую структуру
      .pipe(dest('dist'))                                 // загружаем всё в дист   
}
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build =  series(cleanDist, building);

exports.default = parallel(styles, scripts, images, browsersync, watching) ;              // запуск всего одновременно . Благодаря default ненужно 
                                                                                      // указывать  конкретную команду в консооли. Пишем просто gulp 
                                                                                      