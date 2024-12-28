import axios from "../utils/axiosCustomize";


const getTopProducts = async (limit, field, order) => {
    try {

        const requestedBody = {
            "sort": {
                "field": field, //[created_at, price, average_ratings, discount]
                "order": order // [asc, desc]
            }, // || null
            "category": null, // || null
            "price": null, // || null
            "average_ratings": null, // || null
            "product_name": null // || null
        }
        const response = await axios.post(`/api/v1/product/filter?page=1&limit=${limit}`, requestedBody)
        return response
    } catch (e) {
        return e
    }
};

const getLastestRecipe = async (page, limit) => {
    try {


        const response = await axios.post(`/api/v1/recipe/get?page=${page}&limit=${limit}`)
        return response
    } catch (e) {
        return e
    }
};

const changePassword = async (userId,oldPassword, newPassword) => {
    try {
        const response = await axios.post(`/api/v1/user/change_password/${userId}`, {
            method: "POST",
            body: {
                "oldPassword": oldPassword,
                "newPassword": newPassword
            }
        })
        return response
    } catch (e) {
        return e
    }
}

const sendResetMail = async (email) => {
    try {
        const response = await axios.post(`/api/v1/user/reset_password/send?user_email=${email}`)
        return response
    } catch (e) {
        return e
    }
}



export { getTopProducts,getLastestRecipe, changePassword, sendResetMail };
