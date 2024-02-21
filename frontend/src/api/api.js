import axios from "axios";

// Development Url
const local = "http://localhost:3000"

//  Production Url
// const production = ""

const api = axios.create({
    baseURL: `${local}/api`,
})

export default api
