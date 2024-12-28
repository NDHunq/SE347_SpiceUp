import axios from "../utils/axiosCustomize";

const getAnalysis = async (month, year) => {
    try {
        const response = await axios.get(`/api/v1/admin/analysis?year=${year}&month=${month}`)
        return response
    } catch (e) {
        return e
    }
}

export {getAnalysis}
