const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/mixins.scss"; @import "@/assets/variables.scss";`
      }
    }
  }
})
