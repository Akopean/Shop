import http from 'axios'

export default {
  http(url = 'customers') {
    return {
      getOne: (id) => http.get(url + '/' + id),//http.get(`${url}/${id}`),
      update: (data) => http.put(url + '/' + data.id, data.body),//http.put(url,toUpdate),
      create: (data) => http.post(url, data),//http.put(url,toCreate),
      delete: (id) => http.delete(url + '/' + id),//http.delete(`${url}/${id}`)
      getAll: (data) => http.get(url + '?&page=' + data.page),//http.get(url),
      orderAll: (data) => http.get(url + '/order?sortBy=' + data.sortBy + '&direction=' + data.direction + '&page=' + data.page),
      searchAll: (data) => http.get(url + '/search?q=' + data.search + '&page' + data.page)
    }
  }
}