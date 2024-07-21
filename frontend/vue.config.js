const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
    configureWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),  
          // Replace with true if detailed mismatch info is needed
          '__VUE_OPTIONS_API__': JSON.stringify(true),
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
        })
      ],
    },
  }
})
