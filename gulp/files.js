const filesList = [

	'src/.htaccess',
	'src/robots.txt',
];

module.exports = function(){
	
	$.gulp.task('files', () => {

        return Promise.all([
            $.gulp.src(filesList)
            .pipe($.gulp.dest('build/')),

            $.gulp.src('src/favicon/**')
            .pipe($.gulp.dest('build/favicon')),

            $.gulp.src('node_modules/jquery/dist/jquery.min.js')
            .pipe($.gulp.dest('build/js')),
        ])    
    });

}