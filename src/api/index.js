import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
export default {
  // HTTP POST 请求封装
  get (url, params, successFun, failResponse) {
    return new Promise(() => {
      axios({
        method: 'get',
        url,
        params: params
      }).then(res => {
        console.log(res)
        if (res) {
          successFun(res)
        } else {
          failResponse()
        }
      })
    })
  },

  // HTTP POST 请求封装
  post (url, params, successResponse, failResponse) {
    return new Promise(() => {
      axios({
        method: 'post',
        url,
        params: params
      }).then(res => {
        if (res) {
          successResponse(res)
        } else {
          failResponse()
        }
      })
    })
  }
}
