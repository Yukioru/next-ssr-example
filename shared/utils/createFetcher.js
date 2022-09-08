import axios from 'axios';
import { isServer } from '$shared/utils/stage';

const NEXT_PUBLIC_BASEURL = process.env.NEXT_PUBLIC_BASEURL;
const INTERNAL_BASEURL = process.env.INTERNAL_BASEURL;

function getURL() {
  if (isServer) {
    return INTERNAL_BASEURL || NEXT_PUBLIC_BASEURL;
  }
  return NEXT_PUBLIC_BASEURL;
}

function createInstance() {
  const instance = axios.create({
    baseURL: getURL(),
    withCredentials: true,
  });
  
  instance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      console.error(error);
      return error?.response?.data;
    }
  );
  
  instance.update = (cb) => {
    const newOptions = cb(instance.defaults);
    instance.defaults = newOptions;
  };

  return instance;
}

export default createInstance;
