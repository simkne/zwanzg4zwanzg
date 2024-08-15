const path = require('path');

// css extraction and minification
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//const CopyPlugin = require("copy-webpack-plugin");

// clean out build dir in-between builds
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    entry: {
      'main': [
        './src/js/main.js',
        './src/sass/main.scss'
      ]
    },
    output: {
      filename: './assets/js/[name].min.js',
      path: path.resolve(__dirname)
    },
    module: {
      rules: [
        // js babelization
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // sass compilation
        {
          test: /\.(sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        // loader for webfonts (only required if loading custom fonts)
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: './assets/fonts/[name][ext]',
          }
        },
        // loader for images and icons (only required if css references image files)
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: './assets/img/[name][ext]',
          }
        },
      ]
    },
    plugins: [
      // clear out build directories on each build
/*       new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          './assets/js/*',  //only the main file, keep vendor files
          './assets/css/*'
        ]
      }), */
      // css extraction into dedicated file
      new MiniCssExtractPlugin({
        filename: './assets/css/[name].min.css?ver=1.1'
      }),
      //copy vendor files across as fallback
    /*  new CopyPlugin({
        patterns: [
          { from: "./src/js/vendor/*", to: "./assets/js/vendor/[name][ext]" },
       /*     { from: "./src/css/*", to: "./assets/css/[name][ext]" },    */  /*    
        ],
      }),  
      */
    ],
    optimization: {
      // minification - only performed when mode = production
      minimizer: [
        // js minification - special syntax enabling webpack 5 default terser-webpack-plugin 
        `...`,
        // css minification
        new CssMinimizerPlugin(),
      ]
    },
  }
];
