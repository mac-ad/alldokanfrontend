import {useAuthContext} from "./";
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function useAxios(){
    console.log(useAuthContext())
    // const {token,logout} = useAuthContext();
    
    const baseURL = 'http://127.0.0.1:8000';

    const axiosInstance = axios.create({
        baseURL,
        // headers : {
        //     Authorization : `Bearer ${token}`
        // }
    })

    // const navigate = useNavigate();

    axiosInstance.interceptors.request.use(req => {
        console.log('inside axiosInstance')
        // if(token){
            // const user = jwt_decode(token);
            // req.headers.Authorization = `Bearer ${token}`;
        // }

        return req;
    })

    return axiosInstance;
}

export default useAxios;