var gulp = require('gulp'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    postcss = require('gulp-postcss'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('autoprefixer'),
    rucksack = require('rucksack-css'),
    cssnano = require('cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();



//SERVER
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

//CSS


gulp.task('css', function(){
    var plugins = [
        rucksack(),
        autoprefixer({ browsers: ["> 0%"] }),
        cssnano({core:true})
    ];

    var sassOptions = {
        outputStyle: 'expanded'
    };

    gulp.src('./source/sass/style.sass')
        .pipe(plumber())
        .pipe(sass(sassOptions))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});


//HTML
gulp.task('html', function(){
    gulp.src('./source/views/*.pug')
    .pipe(plumber())
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

//IMAGES
gulp.task('images', function(){
    return gulp.src('./source/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('./source/js/*.js')
	// .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

//WATCH
gulp.task('watch', function(){
    gulp.watch('./source/sass/**/**/*.sass', ['css']);
    gulp.watch('./source/views/**/**/**/*.pug', ['html']);
    gulp.watch('./source/js/**/**/**/*.js', ['scripts']);
    gulp.watch('./source/images/**/**/**/*.*', ['images']);
});



//DEFAULT
gulp.task('default', ['html', 'css', 'scripts', 'images','server', 'watch']);