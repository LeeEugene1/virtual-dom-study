const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 9999,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
	                loader:'babel-loader',
	                options:{
		                presets: ["@babel/preset-react", "@babel/preset-env"]
	                }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
		        title:'webpack & babel study',
            template: 'src/index.html'
        })
    ]
}