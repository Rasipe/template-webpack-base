const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')

function generateHtmlPlugins(templateDir) {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
    return templateFiles.filter(f => f.split('.')[1] == 'html').map(item => {
        // Split names and extension
        const parts = item.split('.')
        const name = parts[0]
        const extension = parts[1]
        // Create new HTMLWebpackPlugin with options
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
        })
    })
}

// Call our function on our views directory.
let htmlPlugins = generateHtmlPlugins('./src')
htmlPlugins = htmlPlugins.concat(generateHtmlPlugins('./src/views'))

module.exports = {
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/main.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: htmlPlugins,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    }
}