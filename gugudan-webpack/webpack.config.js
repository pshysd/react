const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  devtool: 'eval', // production일 때는 hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js']
  },
  entry: { // 시작하는 파일
    app: './client',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { // preset-env 안에 여러 개의 플러그인들이 들어가있고 그 세부 설정도 따로 해줄 수 있음. (preset-env의 기능 자체는 자동으로 구형 브라우저들을 지원해주는 역할)
            targets: {
              browsers: ['> 5% in KR', 'last 2 chrome versions'], // 최근 두개의 크롬 버전(== 이전, 현재) (자세한 내용은 github.com/browserlist)
              // > 5% in KR (한국에서 점유율 5퍼센트 이상인 브라우저), not dead(아직 죽지 않은 브라우저들) 등등.. 별게 다 있다
            },
            debug: true,
          }],
          '@babel/preset-react'
        ],
        plugins: [],
      }
    }],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
};