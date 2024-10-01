import { axiosInstance } from "../config/axios";

export default {
  getShelters(data) {
    return axiosInstance.post('/shelters/', data);
  },
}
