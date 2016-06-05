module.exports = {
    entry: "./src/index.js",
    resolve: {
      extensions: ['', '.js']
    },
    output: {
        path: __dirname,
        filename: "./searcher/js/main.js"
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style!css"
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
    }
};
