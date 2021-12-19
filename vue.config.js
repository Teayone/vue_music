const path = require('path')
module.exports = {
  configureWebpack:(config)=>{
    config.resolve = {
      extensions:['.js','.json','.vue'],
      alias:{
        '@':path.resolve(__dirname,'./src')
      }
    }
  }
}
