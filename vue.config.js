module.exports = {
 chainWebpack: config => {
    config.module
      .rule('js' /* or css */)
      .exclude 
        .add('/public/js/libsignal/test/protos/protos')
  }
}
