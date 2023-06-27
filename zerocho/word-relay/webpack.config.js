const path = require('path');
const refreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	name: 'word-relay-setting', // 내 맘대로 짓는 이름
	mode: 'development', // 실서비스: production
	devtool: 'eval', // 실서비스: hidden-source-map
	resolve: {
		extensions: ['.js', '.jsx'], // 확장자 입력하면 entry에 확장자 적지 않아도 됨
	},

	// 엔트리, 아웃풋 중요

	// 입력
	entry: {
		app: ['./client'], // 합칠 파일들, 사실 WordRelay.jsx도 넣어줘야 하지만 client.jsx에서 import 하고있는 것을 웹팩에서 알아서 캐치한다
	},

	module: {
		rules: [
			{
				test: /\.jsx?/, // js, jsx 파일에 적용할 룰
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['> 5% in KR', 'last 2 chrome versions'],
								},
								debug: true,
							},
						],
						'@babel/preset-react',
					],
					plugins: ['react-refresh/babel'],
				},
			},
		],
	},
	plugins: [new refreshWebpackPlugin()],
	// 출력
	output: {
		path: path.join(__dirname, 'dist'), // 생성할 경로
		filename: 'app.js', // 어떤 이름으로 만들건지
		publicPath: '/dist/',
	},

	devServer: {
		devMiddleware: { publicPath: '/dist/' },
		static: { directory: path.resolve(__dirname) }, // index.html의 경로
		hot: true,
	},
};
