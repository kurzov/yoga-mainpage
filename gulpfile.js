const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
// const htmlmin = require('gulp-htmlmin')   //if need minify html
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');

function html(){
	return src([
		'src/**.html',
		'src/part/**.html'
	])
	.pipe(include({
		prefix: '@@'
	}))
	// .pipe(htmlmin({
	// 	collapseWhitespace: true         //if need minify html
	// }))
	.pipe(dest('dist'))
}

function scss(){
	return src('src/css/**.scss')
	.pipe(sass())
	.pipe(autoprefixer({
		overrideBrowserslist:  ['last 2 versions'],
		cascade: false
	}))
	.pipe(csso())
	.pipe(concat('css/style.css'))
	.pipe(dest('dist'))
}

function scripts(){
	return src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
		'node_modules/slick-slider/slick/slick.js',
		'node_modules/jquery-fancybox/source/js/jquery.fancybox.js',
		'src/js/script.js',
	])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js'))
}

function images(){
	return src('src/image/**/*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))
	.pipe(dest('dist/image'))
}

function clear() {
	return del('dist')
}

function files(){
	return src([
		'src/fonts/**/*',
		'src/favicon/**/*',
	],{base: 'src'})
	.pipe(dest('dist'))
}

function serve(){
	sync.init({
		server: './dist'
	})
	watch('src/**.html', series(html)).on('change', sync.reload)
	watch('src/css/**.scss', series(scss)).on('change', sync.reload)
	watch('src/js/**.js', series(scripts)).on('change', sync.reload)
	watch('src/image/**/*', series(images)).on('change', sync.reload)
}

exports.clear = clear
exports.build = series(clear, scripts, scss, html, files,images)
exports.serve = series(clear, scripts, scss, html, files,images, serve)