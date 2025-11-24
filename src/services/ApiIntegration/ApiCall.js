import axios from "axios";
import { alertErrorMessage } from "../../Components/CustomComponent/CustomAlert";

export const ApiCallPost = async (url, parameters, headers) => {
    try {
      const response = await axios.post(url, parameters, { headers: headers });
      return response?.data;
    } catch (error) {
      if (handleTokenExpiration(error)) return;
      return error?.response?.data?.message || 'An error occurred during the request.';
    }
  };
  
  export const ApiCallDelete = async (url, parameters, headers) => {
    try {
      const response = await axios.delete(url, parameters, { headers: headers });
      return response.data;
    } catch (error) {
      if (handleTokenExpiration(error)) return;
      return error?.response?.data?.message || 'An error occurred during the request.';
    }
  };
  
  export const ApiCallGet = async (url, headers) => {
    try {
      const response = await axios.get(url, { headers: headers });
      return response.data;
    } catch (error) {
      if (handleTokenExpiration(error)) return;
      return error?.response?.data?.message || 'An error occurred during the request.';
    }
  };
  
  export const ApiCallPut = async (url, parameters, headers) => {
    try {
      const response = await axios.put(url, parameters, { headers: headers });
      return response.data;
    } catch (error) {
      if (handleTokenExpiration(error)) return;
      return error?.response?.data?.message || 'An error occurred during the request.';
    }
  };
  
  export const ApiCallPatch = async (url, parameters, headers) => {
    try {
      const response = await axios.patch(url, parameters, { headers: headers });
      return response.data;
    } catch (error) {
      if (handleTokenExpiration(error)) return;
      return error?.response?.data?.message || 'An error occurred during the request.';
    }
  };
  
  const handleTokenExpiration = (error) => {
    if (error?.response?.data?.message === "Token is expired with message: res is not defined") {
      alertErrorMessage('Token is Expired');
      sessionStorage.clear();
    };
  };