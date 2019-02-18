import http from 'axios';
import NProgress from 'nprogress';
import toastr from 'toastr';

// before a request is made start the nprogress
http.interceptors.request.use(config => {
  NProgress.start()
  return config
})
// before a response is returned stop nprogress
http.interceptors.response.use(response => {
  NProgress.done()
  return response
}, error => {
  NProgress.done()
  if (error.response && error.response.data) {
    //console.log(error.response.data);
    //console.log(error.response.status);
    //console.log(error.response.headers);
    if (error.response.data.message) {
      toastr.error(error.response.data.message, 'Error')
    }
  }
  return Promise.reject(error)
})

export default {
  fetchedUsers(data) {
    return http.get('users?&page=' + data.page)
  },
  searchUsers(data) {
    return http.get('users/search?q=' + data.search + '&page' + data.page)
  },
  orderUsers(data) {
    return http.get('users/order?sortBy=' + data.sortBy + '&direction=' + data.direction + '&page=' + data.page)
  },
  fetchedUser(id) {
    return http.get('users/' + id)
  },
  createUser(data) {
    return http.post('users', data)
  },
  updateUser(data) {
    return http.put('users/' + data.id, data.body)
  },
  deleteUser(id) {
    return http.delete('users/' + id)
  }
}

/*
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
 }*/