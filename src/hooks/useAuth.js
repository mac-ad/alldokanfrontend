import useAxios from "./useAxios";
import { endpoints } from "../utils/endpoints/authEndpoints";
import {
  useCreateNotification,
  useAuthContext
} from './';

import { Icon } from '@iconify/react';

function useAuth(){
    const axiosInstance = useAxios();
    const {createToast} = useCreateNotification();
    const {setToken,setUser} = useAuthContext();
    
    const register = async data => (
        new Promise((resolve, reject) => {
            axiosInstance
              .post(`${endpoints.register}`, data)
              .then((res) => {
                console.log('res = ', res);
                Object.keys(res?.data).forEach(key => {
                  localStorage.setItem(key,res?.data[key])
                })
                return resolve('success');
              })
              .catch((err) => {
                return reject(err);
              });
        })
    )

    const login = async data => (
        new Promise((resolve, reject) => {
          axiosInstance
            .post(`${endpoints.login}`, data)
            .then((res) => {
              console.log('res = ', res);
              setToken(res?.data.token);
              localStorage.setItem('token', res?.data.token);
              localStorage.setItem('user', JSON.stringify(res?.data.user));
              setUser(res?.data.user);
              return resolve('success');
            })
            .catch((err) => {
              console.log(err);
              return reject(err);
            });
        })
    )

    const logout = (data) => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        createToast({
            type : "success",
            icon : <Icon icon = "mdi:tick-circle" />,
            message : 'logged out successfully'
        });
    }

    return {
        register,
        login,
        logout
    }
}

export default useAuth;