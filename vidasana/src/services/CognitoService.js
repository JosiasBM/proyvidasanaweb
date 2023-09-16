import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const MySwal = withReactContent(Swal)

export default class CognitoService {
    async getTokenUser() {
        const UserPoolId_Valor = "us-east-1_OJo9kXGfp"
        const ClientId_valor = "2iidbtpg00cku2n329hiba9k2d"

        const poolData = {
            UserPoolId: UserPoolId_Valor,
            ClientId: ClientId_valor
        }
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

        const cognitoUser = userPool.getCurrentUser()
        
        let token = ""
        if (cognitoUser !== null) {
            await cognitoUser.getSession(function (err, result) {
                if (result) {
                    token = result.getIdToken().getJwtToken()
                } else {
                    MySwal.fire({
                        icon: 'warning',
                        title: 'Seguridad',
                        text: 'Sesión expirada. Iniciar sesión nuevamente.'
                    }).then(() => {
                        localStorage.clear()
                        // location.href = location.origin
                    })
                }
            })
        } else {
            MySwal.fire({
                icon: 'warning',
                title: 'Seguridad',
                text: 'Sesión expirada.'
            }).then(() => {                
                localStorage.clear()
                // location.href = location.origin
            })
        }
        return token
    }       
}
