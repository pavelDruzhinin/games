import axios from "axios";

class ClientFactory {
    static createAxiosClient(baseUrl: string, method: any, url: any, data: any) {
        const fullUrl = `${baseUrl}${url}`;
        return axios({
            url: fullUrl,
            method: method,
            headers: { "Content-Type": "application/json" },
            data: data,
            params: method == 'get' ? data : null,
            withCredentials: false,
        })
            .then(response => {
                return response;
            })
            .catch((error) => { console.log(fullUrl, error); });
    }
}

export default {
    _createClient(method: any, url: any, data: any) {
        return ClientFactory.createAxiosClient(this.getBaseUrl(), method, url, data);
    },
    get(url: any, data?: any) {
        return this._createClient("get", url, data);
    },
    post(url: any, data: any) {
        return this._createClient("post", url, data);
    },
    put(url: any, data: any) {
        return this._createClient("put", url, data);
    },
    patch(url: any, data: any) {
        return this._createClient("patch", url, data);
    },
    delete(url: any, data: any) {
        return this._createClient("delete", url, data);
    },
    getBaseUrl() {
        return 'http://localhost:3000';
    }
};
