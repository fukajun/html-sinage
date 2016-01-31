var gulp = require('gulp');
var babelify = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var browserSync = require('browser-sync')
var plumber = require('gulp-plumber')
var notifier = require('node-notifier');

function errorHandler(err) {
  var list = err.message.split(':')
  var head = list.shift()
  var body = list.join(':')
  var paths = head.split('/')
  console.log(err.message)
  notifier.notify({title: paths[paths.length - 1], message: body})
}

notifier.notify({title: 'gulp', message: 'start'})
gulp.task('browser-sync',function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('build', function() {
  return browserify({ entries: ['./source/index.js'] })
  .transform(babelify.configure({ stage: 0 }))
  .bundle()
  .on('error', errorHandler)
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
  .pipe(browserSync.reload({stream: true}))



})

gulp.task('watch', function() {
  gulp.watch('./source/*.*', ['build'])
})

gulp.task('default', ['build', 'watch', 'browser-sync'])
