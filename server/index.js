require("babel-polyfill")
const fs = require('fs')
const path = require('path')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
const ssr = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'

const app = express()

let renderer
if (isProd) {
  // 生产环境使用本地打包文件来渲染
  const bundle = require('./../dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync(resolve('./../dist/index.html'), 'utf-8')
  renderer = ssr.createBundleRenderer(bundle, {template})
} else {
  // 开发环境使用webpack热更新服务
  const devServer = require('./dev')
  devServer(app, (bundle, template) => {
    renderer = ssr.createBundleRenderer(bundle, {template})
  })
}

app.use('/dist', express.static(resolve('./../dist')))
app.use('/dll', express.static(resolve('./../dist/dll')))

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  res.setHeader("Content-Type", "text/html")

  const errorHandler = err => {
    if (err && err.code === 404) {
      // 未找到页面
      res.status(404).end('404');
    } else {
      // 页面渲染错误
      res.status(500).end('500 - Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }

  const context = {
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return errorHandler(err)
    }
    res.end(html)
  })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
