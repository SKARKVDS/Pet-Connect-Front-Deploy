import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:7777/api", // Replace with your API base URL
    timeout: 10000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
    },
})
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify request config before sending the request
      const token = useCookie("token").value as string;
      if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        // Handle request error
        return Promise.reject(error)
    },
)
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response
    },
    (error) => {
        // Handle response error
        if (error.response && error.response.status === 401) {
            //useAuthStore().logout()
        }
        if (error.response && error.response.status === 403) {
          //useAuthStore().logout()
        }
        return Promise.reject(error)
    },
)

export default axiosInstance