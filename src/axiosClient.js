import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://stocker-api-f8awdmhhgrfchacd.uksouth-01.azurewebsites.net/api",
    headers: {
        "Content-Type": "application/json",
    },
})

export default axiosClient;