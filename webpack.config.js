const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.warn("Webpack running in ", process.env.NODE_ENV);

let plugins = [
    new HtmlWebpackPlugin({
        template: 'index.template.ejs',
        hash: true,
        title: 'photo-viewer'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'version': JSON.stringify(require("./package.json").version)
    })
];

if (process.env.NODE_ENV === "production") {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        output: {
            comments: false
        },
        compress: {
            drop_console: true,
            warnings: false
        }
    }));
}

module.exports = {
    devServer: {
        inline: true,
        contentBase: './',
        port: 1212,
        historyApiFallback: true
    },
    devtool: 'source-map',

    entry: [
        'babel-polyfill',
        './src/index.js'
    ],

    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader"
            }
        ]
    },

    plugins: plugins
};
