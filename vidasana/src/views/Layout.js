import * as React from 'react';
import menu from '../components/assets/menu.png'
import logo from '../components/assets/logo_vida_sana.jpg'
import { Link, useNavigate, Navigate, Outlet } from "react-router-dom"
import { isUserLoggedIn } from '../components/utility/Util'


const Layout = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.clear()
        navigate('/')
    }

    const userLoggedIn = isUserLoggedIn()

    if (userLoggedIn){
        return (
            <>
                <div className='header-main'>
                    <div className='menu container'>
                    <img src={logo} className='logo-main'/>
                        <input type='checkbox' id='menu'></input>
                        <label className='menu'>
                            <img src={menu} className='menu-icono'/>
                        </label>
                        <nav className='navbar'>
                            <ul>
                                <li className=''><span onClick={() => cerrarSesion()}>CERRAR SESIÓN</span></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='subheader-main'>
                    <div className='container-cabecera'>
                        <ul>
                            <li className=''><Link to="/admin">INICIO</Link></li>
                            <li className=''><Link to="/admin">USUARIO</Link></li>
                            <li className=''><Link to="/admin/lista-ejercicios">EJERCICIOS</Link></li>
                            <li className=''><Link to="/admin">REPORTE DE PASOS</Link></li>
                            <li className=''><Link to="/admin">REPORTE DE PESOS</Link></li>
                            <li className=''><Link to="/admin">REPORTE DE EJERCICIOS</Link></li>
                        </ul>
                    </div>               
                </div>
                <div className='main'>
                    <div className='container'>
                        <Outlet/>
                    </div>
                </div>              
            </>
        )
    }else{
        return (<Navigate to="/login"/>)
    }
}

export default Layout;