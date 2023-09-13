import * as React from 'react';
import { Navigate } from "react-router-dom"
import { isUserLoggedIn } from '../components/utility/Util'

const Home = () => {

    const userLoggedIn = isUserLoggedIn()

    if (userLoggedIn){
        return (
            <>
                <h1>¡Hola admin!</h1>
                <div className='msg-principal'>
                    <p>¡Bienvenido a Vida Sana, tu compañero en el camino hacia un estilo de vida más saludable! 
                        Aquí encontrarás herramientas, consejos y motivación para lograr tus metas de bienestar. ¡Comencemos juntos este emocionante viaje hacia una vida más saludable y activa</p>
                </div>
            </>
        )
    }else{
        return (<Navigate to="/login" />)
    }
    
}

export default Home