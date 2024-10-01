import axios from 'axios';
import LocalStorage from "../utils/LocalStorage";
import { API } from '../constant/base';
import auth from '../api/auth';

const { get, save, deleteAll } = new LocalStorage;
const { refreshTokens, logOut } = auth;

const logout = () => {
  let logoutData = {
      "revoke_token": false
  }

  logOut(logoutData)
      .then(res => {})
      .catch(err => {})
  deleteAll();
  window.location.reload();
} 

const baseURL = API;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = get('accessToken');

  // config.headers['Access-Control-Allow-Origin'] = '*';
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => Promise.resolve(response),
  async (error) => {
    console.log(error?.response, "EROOR");
    const originalConfig = error.response?.config
    const { status } = error.response

    console.log(status, 'STATUS');
    if ([401].includes(status)) {
      const refreshParams = {
        refresh: get('refreshToken')
      }
 
      originalConfig._retry = true;
      delete originalConfig.headers['Authorization'];

 
      await refreshTokens(refreshParams)
        .then((res) => {
         console.log(res, "RESPONSE");
         
         save('accessToken', res.data.access);
        //  save('refreshToken', res.data?.refresh)
        })
        .catch(async (err) => {
           console.log(err, "ERROR");
         
          logout()
        })
 
      return axios(originalConfig)
  }
}
)
 

export { axiosInstance };
