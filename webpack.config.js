module.exports = {
	entry: __dirname + "/src/test.js", //ビルドするファイル
	output: {
		path: __dirname +'/dist', //ビルドしたファイルを吐き出す場所
		filename: 'bundle.js' //ビルドした後のファイル名
	},
	module: {
		loaders: [
			//loader
		]
	}
};