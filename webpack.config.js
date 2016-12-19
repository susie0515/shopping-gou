module.exports={
	entry:"./js/app/main.js",
	output:{
		path:"./js/app/",
		filename:"bundle.js"
	},
	module:{
		loaders:[
//			{
//				"test":"/\.js$/"
//			},
//			{test: /\.less$/, loader:"style!css!less"},//编译less文件
			{test: /\.scss$/, loader:"style!css!sass"},//编译sass文件
			{   
				test:/\.(png|jpg)$/,//css中有背景图片
                loader:'url-loader?limit=10000',
                exclude:/^node_modules$/
            },//限制大小小于10k的
            {
                test: /\.(eot|otf|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,//字体文件
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }
		]
	}
}
