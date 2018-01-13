const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const Html = require('html-webpack-plugin')
const extractText = require('extract-text-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const configure = {
    entry: {
        'app': [ './js/main.js' ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: 'js/[name].js?[hash:8]'
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.es6'],
        alias: {
            pages: path.resolve(__dirname, 'js/pages/'),
            global: path.resolve(__dirname, '../global/')
        }
    },
    module: {
        loaders: [{
            test: /\.(js|es6)$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(css|scss|sass)$/,
            use: extractText.extract({
                publicPath: '',
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader?outputStyle=expended'
                ]
            })
        }, {
            test: /\.(mp3|mp4)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 5120,
                    name: 'medias/[name].[ext]?[hash:8]',
                }
            }]
        }, {
            test: /\.(svg|gif|png|jpg|webp)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 5120,
                    name: 'images/[name].[ext]'
                }
            }]
        }, {
            test: /\.(woff|ttf|eot)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 5120,
                    name: 'fonts/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new extractText({
            filename: `css/style.css?[hash:8]`,
            disable: false,
            allChunks: true
        })
    ],
    devtool: 'cheap-module-eval-source-map'
}

glob.sync('./template/*.html', {
    ignore: './template/common/*.html'
}).forEach(file => {
    const filename = path.basename(file, '.html')
    configure.plugins.push(new Html({
        title: '',
        template: `./template/${filename}.html`,
        filename: filename + '.html',
        inject: false,
        minify: {
            removeComments: true,
            minifyJS: true,
            minifyCSS: true
        }
    }))
})

if (isProduction) {
    configure.devtool = 'cheap-module-source-map';
    configure.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = configure;
