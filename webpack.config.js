const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const darkThemeVars = require('antd/dist/dark-theme')

module.exports = {
    entry: path.resolve(__dirname, './client/index.js'),
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'main.js',
        publicPath: '/dist/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            { 
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ],
            },
            {
                test: /\.less$/,
                include: [/node_modules\/.*antd/],
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { 
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    ...darkThemeVars,
                                    'primary-color': '#FF9900',
                                    'link-color': '#FF9900',
                                    'border-radius-base': '2px',
                                    'font-family': 'Helvetica Neue',
                                    'code-family': 'Menlo',
                                },
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            { 
                test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            output: 'fonts/'
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        // options: {
                        //     name: '[name].[ext]',
                        //     output: 'img/'
                        // }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './public/img/favicon.ico',
            template: './template.html'
        }),
        new Dotenv()
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', ".json"],
        fallback:{
            util: require.resolve('util/'),
            stream: require.resolve("stream-browserify"),
            crypto: require.resolve("crypto-browserify"),
        }
    },
    stats: {
        colors: true,
    },
    devtool: 'source-map',
}