module.exports = function () {
    $.gulp.task('browser-sync', () => {

        $.browserSync.init({
            server: {
                baseDir: './build/' 
            },

            // proxy: 'http://casino-new.html/',
            // notify: false,
            // online: true
        });

    });
}