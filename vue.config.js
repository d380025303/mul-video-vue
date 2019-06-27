module.exports = {
    publicPath: '/',
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        host: 'localhost',
        port: 10010, // 服务端口
        https: false,
        hotOnly: false,
        proxy: { // 设置代理
            '/daixinmini': {
                target: 'http://localhost:10001/',
                changeOrigin: true,
                ws: true
            }
        },
    },
};