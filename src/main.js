// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

// ElementUI
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import '../theme/index.css'

// 引入vuex
import store from './api/store'

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

// axios引用
import Axios from 'axios';
Vue.prototype.$axios = Axios;

// 引入router模块化
import router from './api/router';

import App from './App';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
