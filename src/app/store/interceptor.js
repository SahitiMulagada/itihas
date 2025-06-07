import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4901/apiv1/', 
  withCredentials: true
});

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

axiosInstance.interceptors.request.use(
  (config) => {
    // Only access localStorage in browser environment
    if (isBrowser) {
      const accessToken = localStorage.getItem("x-access-token");
      if (accessToken && config.headers) {
        config.headers['x-access-token'] = accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Only access localStorage in browser environment
    if (isBrowser && response.headers['x-access-token']) {
      localStorage.setItem('x-access-token', response.headers['x-access-token']);
      
      // Send token to chatbot for authentication
      const chatbotIframe = document.getElementById('chatbot-iframe');

      if (chatbotIframe && chatbotIframe.contentWindow) {
        chatbotIframe.contentWindow.postMessage(
          { type: 'chatbot-client-auth-token', auth_token: response.headers['x-access-token'] },
          'https://chatbot.dreamstep.in'
        );
      }

    }
    return response;
  },
  (error) => {
    // Check if error.response exists before destructuring
    if (error.response) {
      const { status } = error.response;
      if (status === 406 || status === 403) {
        console.log("error");
        localStorage.clear();
        window.location.href = '/auth/login'
      }
    } else {
      // Handle network errors or other cases where response doesn't exist
      console.log("Network error or request cancelled");
    }
    console.log(error, "kkkkkkkkkkkkkkkkkkkkk")
    return Promise.reject(error);
  }
);

export default axiosInstance;