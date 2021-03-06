import axiosClient from "./axiosClient";

const productApi = {
    async getAll(params){
        const newParams = { ...params}
        const response  = await axiosClient.get('products/', {params: newParams})
        return {
            ...response,
            maxItem: 16,
        }
    },

    get(id) {
        const url = `/products/${id}/`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/products/`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/products/${data.id}/`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/products/${id}/`;
        return axiosClient.delete(url);
    },

}

export default productApi