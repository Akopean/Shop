import http from 'axios';

export default {
    http(url = 'shop/products') {
        return {
            getOne: (slug) => http.get(`${url}/${slug}`),//http.get(`${url}/${id}`),
            update: (data) => http.put(`${url}/${data.id}`, data.body),//http.put(url,toUpdate),
            create: (data) => http.post(url, data),//http.put(url,toCreate),
            delete: (slug) => http.delete(`${url}/${slug}`),//http.delete(`${url}/${id}`)
            getAll: (data) => http.get(`${url}?orderBy=${data.orderBy}&sortedBy=${data.sortedBy}&page=${data.page}`),
            searchAll: (data) => http.get(`${url}/search?search=${data.search}&page=${data.page}`)
        };
    }
};

