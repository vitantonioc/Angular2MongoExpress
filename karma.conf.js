// Karma configuration
// Generated on Sat Feb 04 2017 15:52:39 GMT-0500 (EST)
var webpackConfig = require('./config/webpack.test');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        {pattern: './src/test.js', watched: false}
    ],
    exclude: [
    ],
    preprocessors: {
        './src/test.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
        noInfo: true
    },

    reporters: ['coverage-istanbul'],
    coverageIstanbulReporter: {
        reports: ['cobertura'],
        dir: './coverage'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
