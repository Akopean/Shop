import http from 'axios';

export default {
    http(url = 'auth') {
        return {
            create: (data) => http.post(`${url}/signup`, data),
            //getAll: (data) => http.get(`${url}?orderBy=${data.orderBy}&sortedBy=${data.sortedBy}&page=${data.page}`),
        };
    }
};

