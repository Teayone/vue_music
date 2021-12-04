const path = require('path')
configureWebpack:(config)=>{
  config.resolve = {
    extensions:['.js','.json','.vue'],
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  }
}