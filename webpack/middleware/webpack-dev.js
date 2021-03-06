import { argv } from 'yargs'
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware'
import convert from 'koa-convert'

import projectConfig from '../../config'

const QUIET_MODE = !!argv.quiet
const { SERVER_HOST, WEBPACK_DEV_SERVER_PORT } = projectConfig

export default function (compiler, options) {
  const webpackDevMiddlewareOptions = {
    ...options,
    quiet: QUIET_MODE,
    noInfo: QUIET_MODE,
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false
    },
    hot: true,
    lazy: false,
    historyApiFallback: true,
    contentBase: `http://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}`,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }

  return convert(koaWebpackDevMiddleware(compiler, webpackDevMiddlewareOptions))
}
