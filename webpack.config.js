const path = require('path');
const webpack = require('webpack');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: ['./app.js'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, './docs'),
        publicPath: PROD ? '/webpack-lazy-load-chunks/' : '/',
        hashDigestLength: 8,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        crossOriginLoading: 'anonymous'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'react',
                                [
                                    'env',
                                    {
                                        module: false,
                                        targets: {
                                            browsers: 'chrome >= 55'
                                        }
                                    }
                                ]
                            ],
                            plugins: [
                                'syntax-dynamic-import'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.[chunkhash].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
			name: 'app',
			minChunks: 2,
            children: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['manifest'],
			filename: 'manifest.[chunkhash].js'
		}),
		new HtmlWebpackPlugin({
			template: 'template.html',
			filename: 'index.html'
        }),
        new BabelMinifyPlugin()
    ]
}
