var gulp               = require('gulp');
var connect            = require('gulp-connect');
var include            = require('gulp-include');
var concat             = require('gulp-concat');
var less               = require('gulp-less');
var postcss            = require('gulp-postcss');
var optimize           = require('gulp-requirejs-optimize');
var px2rem             = require('postcss-px2rem');
var sprites            = require('postcss-sprites').default;
var autoprefixer       = require('autoprefixer');
var cdnizer            = require('gulp-cdnizer');
var ftp                = require('gulp-ftp');
var gutil              = require('gulp-util');
var clean              = require('gulp-clean');
var cleanCSS           = require('gulp-clean-css');
var uglify             = require('gulp-uglify');
var imagemin           = require('gulp-tinypng-nokey');
var	htmlmin            = require('gulp-htmlmin'); 			//html压缩

//post css  插件配置
var processors = [
		//雪碧图
		/*sprites({
			stylesheetPath: 'build/static/css',
    		spritePath: 'build/static/images',
    		filterBy: function(image) {
		        // slice文件夹下才做合并
		        if (!/.slice\/.*\.png$/.test(image.url)) {
		            return Promise.reject();
		        }
		        return Promise.resolve();
		    },
		    spritesmith:{
		    	padding: 5 //合并后的间隔
		    }
		}),*/
		//转换rem
		px2rem({remUnit: 75}),
		//添加前缀
		autoprefixer
	];

//清除构建后的样式
function cleanstyle(){
	return gulp.src('build/static/css/**/*.css')
			.pipe(clean({force: true}))
}
//样式构建 
function style(){
	return gulp.src(['src/css/**/*.less', '!src/css/base.less', '!src/css/modules/**'])
			.pipe(less())
			.pipe(postcss(processors))
			.on('error', function (error) {
	            console.log(error.message);
	        })
			.pipe(gulp.dest('build/static/css'));
}


//清除构建后的字体
function cleanfont(){
	return gulp.src('build/static/font/*.*')
			.pipe(clean({force: true}));
}
//移动icon字体至构建文件
function font(){
	return gulp.src('src/font/*')
			.pipe(gulp.dest('build/static/font'));
}


//清除构建后的图片
function cleanimages(){
	return gulp.src('build/static/images/**/*.{png,jpg,gif}')
			.pipe(clean({force: true}))
			.on('error', function(error){
				console.log(error);
			});
}
//图片task
function images(){
	return gulp.src('src/image/**/*.{png,jpg,gif}')
			.pipe(gulp.dest('build/static/images'));
}

//清除构建后的js
function cleanjs(){
	return gulp.src('build/static/js/**/*.*')
			.pipe(clean({force: true}));
}
//jsamd task
function jsamd(){
	return gulp.src('src/js/entrance/**/*.js')
			.pipe(optimize({
				optimize: 'none'
			}))
			.on('error', function (error) {
	            console.log(error.message);
	        })
			.pipe(gulp.dest('build/static/js'));
}

//bound task
function boundle(){
	return gulp.src(['src/js/libs/zepto.min.js', 'src/js/libs/require.min.js'])
			.pipe(concat('boundle.min.js'))
			.pipe(gulp.dest('build/static/js'));
}

//清除构建后的html
function cleanhtml(){
	return gulp.src('build/views/**/*.*')
			.pipe(clean({force: true}));
}
//html task
function html(){
	return gulp.src(['src/views/**/*.html', '!src/views/common/*.html'])
			.pipe(include())
			.pipe(gulp.dest('build/views'));
}

//gulp server
function server(){
	return connect.server({
			root: './build',
			port: 80,
			livereload: true
		});
}
//reload
function reload(){
	return gulp.src('build/views/**/*.html')
		.pipe(connect.reload());
}

var rebuildTime = 1000;
//css rebuild
var cssbuildId;
function cssreBuid(){
	clearTimeout(cssbuildId);
	cssbuildId = setTimeout(function(){
		gulp.series(cleanstyle, style, reload)();
	}, rebuildTime);
}

//js rebuild
var jsbuildId;
function jsreBuild(){
	clearTimeout(jsbuildId);
	jsbuildId = setTimeout(function(){
		gulp.series(cleanjs, jsamd, boundle, reload)();
	}, rebuildTime);
}

//boundle rebuild
var boundlebuildId;
function boundlereBuild(){
	clearTimeout(boundlebuildId);
	boundlebuildId = setTimeout(function(){
		gulp.series(boundle, reload)();
	}, rebuildTime);
}

//image reBuild
var imagesbuildId;
function imagesreBuild(){
	clearTimeout(imagesbuildId);
	imagesbuildId = setTimeout(function(){
		gulp.series(cleanimages, images, reload)();
	}, rebuildTime)
}

//font reBuild
var fontbuildId;
function fontreBuild(){
	clearTimeout(fontbuildId);
	fontbuildId = setTimeout(function(){
		gulp.series(cleanfont, font, reload)();
	}, rebuildTime)
}

//html reBuild
var htmlbuildId;
function htmlreBuild(){
	clearTimeout(htmlbuildId);
	htmlbuildId = setTimeout(function(){
		gulp.series(cleanhtml, html, reload)();
	}, rebuildTime);
}


//watcher
function watcher(done){
	var cssWatcher = gulp.watch('src/css/**/**/*.less');
	var jsWatcher = gulp.watch(['src/js/modules/*.js','src/js/entrance/**/*.js']);
	var boundleWatcher = gulp.watch('src/js/libs/*.js');
	var imageWatcher = gulp.watch('src/image/*.{png,jpg,gif}');
	var fontWatcher = gulp.watch('src/font/**/*');
	var htmlWatcher = gulp.watch('src/views/**/**');

	//cssWatcher 事件列表
    cssWatcher.on('change', function(file) {
        gutil.log(file + ' has been changed');
        cssreBuid();
    })
    .on('add', function(file) {
        gutil.log(file + ' has been added');
        cssreBuid();
    })
    .on('unlink', function(file) {
        gutil.log(file + ' is deleted');
        cssreBuid();
    });

    //jsWatcher 事件列表
    jsWatcher.on('change', function(file) {
        gutil.log(file + ' has been changed');
        jsreBuild();
    })
    .on('add', function(file) {
        gutil.log(file + ' has been added');
        jsreBuild();
    })
    .on('unlink', function(file) {
        gutil.log(file + ' is deleted');
        jsreBuild();
    });

    //boundWatcher 事件列表
    boundleWatcher.on('change', function(file) {
        gutil.log(file + ' has been changed');
        boundlereBuild();
    })
    .on('add', function(file) {
        gutil.log(file + ' has been added');
        boundlereBuild();
    })
    .on('unlink', function(file) {
        gutil.log(file + ' is deleted');
        boundlereBuild();
    });

    //imagWatcher
    imageWatcher.on('change', function(file) {
        gutil.log(file + ' has been changed');
        imagesreBuild();
    })
    .on('add', function(file) {
        gutil.log(file + ' has been added');
        imagesreBuild();
    })
    .on('unlink', function(file) {
        gutil.log(file + ' is deleted');
        imagesreBuild();
    });

    //fontWacher
    fontWatcher.on('change', function(file) {
        gutil.log(file + ' has been changed');
        fontreBuild();
    })
    .on('add', function(file) {
        gutil.log(file + ' has been added');
        fontreBuild();
    })
    .on('unlink', function(file) {
        gutil.log(file + ' is deleted');
        fontreBuild();
    });

    //htmlWatcher
    htmlWatcher.on('change', function(file) {
        gutil.log(file + ' has been changed');
        htmlreBuild();
    })
    .on('add', function(file) {
        gutil.log(file + ' has been added');
        htmlreBuild();
    })
    .on('unlink', function(file) {
        gutil.log(file + ' is deleted');
        htmlreBuild();
    });

	done();
}


//default
gulp.task('default', gulp.series(
	cleanstyle,
	style,
	cleanimages,
	images,
	cleanjs,
	jsamd,
	boundle,
	cleanfont,
	font,
	cleanhtml,
	html,
	watcher,
	server
));



//cdn
var cbaseUrl = '//c.58cdn.com.cn/crop/zcmact';
var jbaseUrl = '//j1.58cdn.com.cn/crop/zcmact';
var fontUrl = '//img.58cdn.com.cn/crop/zcmact';
var publishimageUrl = fontUrl+'/images';
var publishcssUrl = cbaseUrl+'/css';
var publishjsUrl = jbaseUrl+'/js';

function htmlCdn(){
	return gulp.src('build/views/**/*.html')
			.pipe(cdnizer([
				{
					file: '/static/css/**/*.css',
					cdn: publishcssUrl + '/${filepath.replace("/static/css/", "")}'
				},
				{
					file: '/static/js/boundle.min.js',
					cdn: publishjsUrl + '/${filepath.replace("/static/js/", "")}'
				},
				{
					file: '/static/js/**/*.js',
					cdn: publishjsUrl + '/${filepath.replace("/static/js/", "")}'
				},
				{
					file: '/static/images/**/*.{jpg,png}',
					cdn: publishimageUrl + '/${filepath.replace("/static/images/", "")}'
				}
			]))
			.pipe(gulp.dest('build/views/'));
}

function fontCdn(){
	return gulp.src('build/static/css/**/*.css')
			.pipe(cdnizer([
				{
					file: '**/*.{eot,woff,ttf,svg}',
					cdn: fontUrl+'/${filename}'
				}
			]))
			.pipe(gulp.dest('build/static/css/'));
}

function ftpStatic(){
	return gulp.src('build/static/**/*')
			.pipe(ftp({
				host: '192.168.119.5',
				user: 'qatest',
				pass: 'ftp@fe',
				remotePath: '/static.58.com/crop/zcm/dingding'
			})).pipe(gutil.noop());
}


function ftpFont(){
	return gulp.src('build/static/font/**')
			.pipe(ftp({
				host: '192.168.119.5',
				user: 'qatest',
				pass: 'ftp@fe',
				remotePath: '/pic2.58.com/webfonts/zcm/dingding'
			})).pipe(gutil.noop());
}



gulp.task('publish', gulp.series(
	cleanstyle,
	style,
	cleanimages,
	images,
	cleanjs,
	jsamd,
	boundle,
	cleanfont,
	font,
	cleanhtml,
	html,
	htmlCdn
	// fontCdn
	/*ftpStatic,
	ftpFont*/
));

gulp.task('test', gulp.series(
	htmlCdn
));

function minifyCSS(){
	return gulp.src('build/static/css/**/*')
			.pipe(cleanCSS())
			.pipe(gulp.dest('build/static/css'));
}
function uglifyJs(){
	return gulp.src('build/static/js/**/*')
			.pipe(uglify())
			.pipe(gulp.dest('build/static/js'));
}
function miniimg(){
	return gulp.src('build/static/images/**/*')
			.pipe(imagemin())
			.pipe(gulp.dest('build/static/images'));
}

gulp.task('release', gulp.series(
	cleanstyle,
	style,
	cleanimages,
	images,
	cleanjs,
	jsamd,
	boundle,
	cleanfont,
	font,
	cleanhtml,
	html,
	//htmlCdn,
	//fontCdn,
	minifyCSS,
	uglifyJs
	//miniimg
	/*ftpStatic,
	ftpFont*/
));

//压缩html
function htmlZip () {
	return gulp.src('src/views/*.html')
				.pipe(htmlmin({
			        removeComments: true,//清除HTML注释
			        collapseWhitespace: true,//压缩HTML
			        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
			        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
			        minifyJS: true,//压缩页面JS
	       			minifyCSS: true//压缩页面CSS
			    })) //不混淆
			   .pipe(gulp.dest('build/views'))
}

gulp.task('htmltest', gulp.series(
	htmlZip
));
