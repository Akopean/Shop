/*
import axios from 'axios'
import settings from '../settings'
import Vue from 'vue'

const client = axios.create({
  baseURL: settings.BASE_URL + settings.API_BASE_PATH,
  json: true
})
// before a request is made start the nprogress
client.interceptors.request.use(config => {
  NProgress.start();
  return config;
});
// before a response is returned stop nprogress
client.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : ''
      }
    }).then(req => {
      return req.data
    })
  },
  getProducts() {
    return this.execute('get', 'products');
  },
  getCategories (cb) {
    axios.get(settings.API_BASE_PATH + 'categories?sort=name&hide_empty=true&per_page=50')
      .then(response => {
        cb(response.data.filter(c => c.name !== 'Uncategorized'))
      })
      .catch(e => {
        cb(e)
      })
  },

  getPages (cb) {
    axios.get(settings.API_BASE_PATH + 'pages?per_page=10')
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },

  getPage (id, cb) {
    if (_.isNull(id) || !_.isNumber(id)) return false
    axios.get(settings.API_BASE_PATH + 'pages/' + id)
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },

  getPosts (limit, cb) {
    if (_.isEmpty(limit)) { let limit = 5 }

    axios.get(settings.API_BASE_PATH + 'posts?per_page=' + limit)
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },
} */
