import axios from 'axios'

const service = axios.create({
    baseURL:'',
    timeout:60000
})

service.interceptors.request.use(
    (config)=>{
        if (config.method?.toLocaleLowerCase() === 'get') {
            config.params = {...config.params,_:Date.now()}
        }
        return config;
    },
    (err)=>Promise.reject(err)
)

service.interceptors.response.use(
    (res)=>{
        return Promise.resolve(res.data)
    },
    (err)=>{
        Promise.reject(err);
    }
)

export default service