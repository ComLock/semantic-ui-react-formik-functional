import path from 'path';
import EsmWebpackPlugin from '@purtuga/esm-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'; // Supports ECMAScript2015

export default {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.mjs'
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [{
      test: /\.(es6?|m?jsx?)$/,
      exclude: /node_modules/,
      use: [{
				loader: 'babel-loader',
				options: {
					babelrc: false, // The .babelrc file should only be used to transpile config files.
					comments: false,
					compact: false,
					minified: false,
					plugins: [
						'array-includes',
						'@babel/plugin-proposal-object-rest-spread',
						'@babel/plugin-transform-object-assign'
					],
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: false // false means polyfill not required runtime
							}
						],
						'@babel/preset-react'
					]
				} // options
			}]
    }]
  },
  /*optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true, // highly recommended
				sourceMap: false/*,
				uglifyOptions: {
					mangle: false, // default is true?
					keep_fnames: true // default is false?
				}*
			})
		]
	},*/
  output: {
		path: path.join(__dirname, 'esm'),
    filename: '[name].esm.js',
		library: 'LIB',
		libraryTarget: 'var'
  },
  plugins: [
    new EsmWebpackPlugin()
  ],
  resolve: {
		extensions: [
      '.js', // Or node_modules will fail to resolve
      '.jsx',
      '.mjs'
    ]
	}
}
