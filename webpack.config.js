const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) => (isDev ? `bundle.[fullhash].${ext}` : `bundle.[name].${ext}`);

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: filename('js'),
    },

    devtool: isDev ? "source-map" : false,

    devServer: {
        port: 3000,
        hot: true,
        open: isDev,
        historyApiFallback: true,
    },

    target: ['web'],

    module: {
        rules: [{
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" },

            },
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules/,
                use: { loader: 'ts-loader' }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.svg$/,
                use: [{
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true
                        }
                    }
                ]
            }

        ],
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            },
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'public/favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
            }, ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('scss'),
        }),
    ],
};