var webpack = require("webpack");

module.exports = {

  cache: true,

  entry: "./app/assets/javascripts/client/components/FabnaviApp.jsx",
  output: {
    path: __dirname + '/app/assets/javascripts/dist/client/',
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ["react", "es2015"]
      }
    },{ 
     test: /\.css$/, 
     loader: "style-loader!css-loader" 
    },{
      test: /\.json$/,
      loader: "json-loader" 
    }]
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
    root:[ __dirname + "/node__modules"],
  },

  node: {
    fs: "empty"
  },
  devtools: {
    
  },
  watchOptions: {
   aggregateTimeout: 300,
   poll: 300
  }
};
