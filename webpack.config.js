const path = require('path');

//WebPack plugin to generate HTML files
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    // where the code starts
    // entry: "./src/index.js",
    // where the output goes
    /*     output: {
            // gives access to catalogue structure and knows what to access
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        }, */
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
            minify: false,
        })
    ]
}