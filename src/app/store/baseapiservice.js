import axiosInstance from '../store/interceptor.js'

const apiBaseUrl = 'http://localhost:4901/apiv1/'
const apiUrl = 'http://localhost:4901/'

// Global loading state management
const loadingState = {
  _listeners: [],
  setLoading(isLoading) {
    this._listeners.forEach(listener => listener(isLoading))
  },
  subscribe(listener) {
    this._listeners.push(listener)
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener)
    }
  }
}

const post = (route, data) => new Promise((resolve, reject) => {
  console.log('API Request:', apiBaseUrl + route, data);
  
  // Set loading state before request
  loadingState.setLoading(true)
  
  axiosInstance
    .post(apiBaseUrl + route, data)
    .then((response) => {
      loadingState.setLoading(false)
      resolve(response.data)
    }).catch(
      function (error) {
        loadingState.setLoading(false)
        console.log('API Error:', error.response?.data || error.message);
        reject(error.response?.data || error)
      }
    );
})

const get = (route) => new Promise((resolve, reject) => {
  axiosInstance.get(apiBaseUrl + route).then(
    function (response) {
      resolve(response.data)
    }
  ).catch(
    function (error) {
      console.log('Show error notification!', error)
      reject(error)
    }
  )
});

const put = (route, data) => new Promise((resolve, reject) => {
  console.log('API Request:', apiBaseUrl + route, data);
  
  // Set loading state before request
  loadingState.setLoading(true)
  
  axiosInstance
    .put(apiBaseUrl + route, data)
    .then((response) => {
      loadingState.setLoading(false)
      resolve(response.data)
    }).catch(
      function (error) {
        loadingState.setLoading(false)
        console.log('API Error:', error.response?.data || error.message);
        reject(error.response?.data || error)
      }
    );
})

const deleteApi = (route) => new Promise((resolve, reject) => {
  console.log('API Request:', apiBaseUrl + route);
  
  // Set loading state before request
  loadingState.setLoading(true)
  
  axiosInstance.delete(apiBaseUrl + route).then(
    function (response) {
      loadingState.setLoading(false)
      resolve(response.data)
    }
  ).catch(
    function (error) {
      loadingState.setLoading(false)
      console.log('Show error notification!', error)
      reject(error)
    }
  )
})

const downloadFile = (route, filename) => {
  return axiosInstance.get(apiBaseUrl + route, {
    responseType: 'blob',
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  })
}

export default { 
  post, 
  get, 
  put, 
  deleteApi, 
  downloadFile,
  apiUrl,
  loadingState 
}
