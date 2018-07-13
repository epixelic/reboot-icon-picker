const path = require('path');

module.exports = {
    entry: './lib/index.js',
    output: {
        filename: 'reboot-icon-picker.js',
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'rebootIconPicker'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            }
        ]
      },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
};