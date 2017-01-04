var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname+"/searcher/",
        filename: "./js/main.js"
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
              test: /\.js$/,
              loader: 'babel',
              query: {
                presets: [
                  'babel-preset-es2015',
                  'babel-preset-react',
                ].map(require.resolve),
              }
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin("[name].css")
    ]
};
