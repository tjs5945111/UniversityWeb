'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //API_ENV: '"http://192.168.31.162:8080"',
  // API_ENV: '"http://192.168.31.102:8080"',

  //API_ENV: '"http://huadaapi.luckyzune.com"',
 // API2_ENV: '"http://huadaapi.luckyzune.com"',
  
  API_ENV: '"http://localhost:8080"',
  API2_ENV: '"http://localhost:8080"',
})
