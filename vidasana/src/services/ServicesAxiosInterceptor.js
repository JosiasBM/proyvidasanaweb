import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const apiInstanceFunction = (url_api) => {
    const apiInstance = axios.create({ baseURL: url_api })

    apiInstance.interceptors.request.use(
      async (request) => {        
        return request
      },
      (err) => err
    )

    apiInstance.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {                        
            if (error.response.status === 403) {
                MySwal.fire({
                    icon: 'warning',
                    title: 'Seguridad',
                    text: 'No tiene acceso al recurso.'
                })
            }
            if (error.response.status === 401) {
                console.log('sesion expirada')
                localStorage.clear()
            }
            return Promise.reject(error)
        }
    )
    return apiInstance
}


export default apiInstanceFunction
