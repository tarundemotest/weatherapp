let gulp = require('gulp')
  , sass = require('gulp-sass')
  , cleanCSS = require('gulp-clean-css')
  , concat = require('gulp-concat')
  , livereload = require('gulp-livereload')
  , autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
  return gulp.src([
    'src/scss/font-awesome-4.7.0/font-awesome.scss',
    'src/scss/app.scss'
  ])
    .pipe(sass()['on']('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
    .pipe(gulp.dest('public/dist/css'))
    .pipe(livereload())
    ;
});

gulp.task('default', function () {
  livereload.listen();

  //recompile styles
  gulp.watch('src/scss/**/*.scss', ['styles']);

  //reload on view changes
  gulp.watch('app/views/**/*.php', () => livereload.reload());

  // force run first compilation
  gulp.run(['styles']);
});