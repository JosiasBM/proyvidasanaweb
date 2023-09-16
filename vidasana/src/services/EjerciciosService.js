import apiInstanceFunction from "./ServicesAxiosInterceptor"
import CognitoService from "./CognitoService"

export default class ReportesService {
    constructor() {
        this.url_base = 'https://8hbddv7fy7.execute-api.us-east-1.amazonaws.com/'
        this.apiInstance = apiInstanceFunction(this.url_base)
        this.cognitoService = new CognitoService()
    }

    async listarMaestros() {
        const url_api = this.url_base + 'dev'
        const url_complete = `${url_api}/ejercicio/maestros`
        const config = {
            method: 'get',
            url: url_complete,
            headers: {
                'Content-Type': 'application/json',
                Authorization: await this.cognitoService.getTokenUser()              
            }
        }
        return await this.apiInstance.get(url_complete, config)
    }

    async listarEjercicios(cod_categoria) {
        const url_api = this.url_base + 'dev'
        const url_complete = `${url_api}/ejercicio/listado?cod_categoria=${cod_categoria}`
        const config = {
            method: 'get',
            url: url_complete,
            headers: {
                'Content-Type': 'application/json',
                Authorization: await this.cognitoService.getTokenUser()              
            }
        }
        return await this.apiInstance.get(url_complete, config)
    }

    async eliminarEjercicio(id_ejercicio) {
        const url_api = this.url_base + 'dev'
        const url_complete = `${url_api}/ejercicio/eliminar?id_ejercicio=${id_ejercicio}`
        const config = {
            method: 'put',
            url: url_complete,
            headers: {
                'Content-Type': 'application/json',
                Authorization: await this.cognitoService.getTokenUser()              
            }
        }
        return await this.apiInstance.put(url_complete, {}, config)
    }

    async registrarEjercicio(request) {
        const url_api = this.url_base + 'dev'
        const url_complete = `${url_api}/ejercicio/registro`
        const config = {
            method: 'post',
            url: url_complete,
            headers: {
                'Content-Type': 'application/json',
                Authorization: await this.cognitoService.getTokenUser()              
            }
        }
        return await this.apiInstance.post(url_complete, request, config)
    }

}
