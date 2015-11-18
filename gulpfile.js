var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
    browserSync.init(["*.html", "src/**"], {
        open: false,
        server: {
            baseDir: ""
        }
    });

});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(["*.html", "*.js"]);
});
