const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const css_comments = require('gulp-strip-css-comments') //очистка css от коментов
const cssc = require('gulp-css-condense') //min css
const bs = require('browser-sync')


//Для запуска серевер на node.js
//https://gist.github.com/sbogdanov108/39b6895fc2a0809e044c35dc14213330
//http://qaru.site/questions/188734/running-a-command-with-gulp-to-start-nodejs-server

function css_sass(done) {

  gulp.src('./source_code/scss/style.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({

      overrideBrowsers: ['last 1 versions'],
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css/'));

  done();
}

function css(done) {
  gulp.src('./source_code/css_clean/**/*.css')
    .pipe(css_comments()) //очистка css 
    //.pipe(cssc()) // min css
    .pipe(gulp.dest('./css/'))
  done()
}


function f_bs(done) {
  bs.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./source_code/css_clean/**/*.css', css)
  gulp.watch('./*.html').on('change', bs.reload)
  done()
  //https://www.youtube.com/watch?v=QgMQeLymAdU
}


gulp.task('default', css_sass);
gulp.task(css);
gulp.task(f_bs)
exports.default = css_style;


