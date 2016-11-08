var gulp = require('gulp');
var gulpJshint = require('gulp-jshint');
var html5Lint = require('gulp-html5-lint');
var csslint = require('gulp-csslint');
var spawn = require('child_process').spawn;
var node;

gulp.task('jshint', function() {
  return gulp.src(['app/src/**/*.js'])
    .pipe(gulpJshint({
      force: true
    }))
    .pipe(gulpJshint.reporter('default'));
});
 
gulp.task('html5-lint', function() {
    return gulp.src(['app/**/*.html', '!app/jspm_packages/**/*.html'])
      .pipe(html5Lint());
});
 
gulp.task('css', function() {
  gulp.src(['app/assets/**/*.css', '!app/assets/material-design-iconic-font/**/*.css', '!app/assets/svg/**/*.css'])
    .pipe(csslint())
    .pipe(csslint.formatter());
});

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});


gulp.watch(['server.js', 'sconfig.js', 'routes/**/*.js'], function() {
  gulp.run('server')
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
})

/**
 * Build the project.
 */
gulp.task("default", ['server'], () => {
    console.log("Building the project ...");
});