const path = require('path');

module.exports = {
    name: 'wordchain-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 이건 뭐여
    resolve: { // entry에 들어가는 파일들 확장자들 적어두면 알아서 찾아서 app.js로 합쳐준다.
        extensions: ['.js', '.jsx']
    },
    // entry, output 중요함
    entry: { // 입력
        app: ['./client'], // wordChain.jsx는 client.jsx에서 불러오기 때문에 따로 또 넣을 필요는 없다
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties'
                ]
            }
        }],
    },

    output: { // 출력
        path: path.join(__dirname, 'dist'), // word-chain/dist
        filename: 'app.js'
    },
};
