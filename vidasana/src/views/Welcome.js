import * as React from 'react';
import { Link } from 'react-router-dom';
import '../components/style/Shared.css';
import dispositivos from '../components/assets/dispositivos_main.jpg'
import menu from '../components/assets/menu.png'

export default function Welcome(){
    return (
        <>
            <div className='header'>
                <div className='menu container'>
                    <a href='#' className='logo'></a>
                    <input type='checkbox' id='menu'></input>
                    <label className='menu'>
                        <img src={menu} className='menu-icono'/>
                    </label>
                    <nav className='navbar'>
                        <ul>
                            <li className=''><Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>INICIAR SESIÓN</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className='header-content container'>
                    <h1>VIDA SANA</h1>
                    <p>Junto a nosotros ten una vida mucho más saludable</p>
                </div>
            </div>
            
            <div className='section'>
                <div className='section-content container'>
                    <div>
                        <img src={dispositivos} className='img-dispositivos'></img>
                    </div>
                    <div>
                        <h2>EXPLORA NUESTRA APP</h2>
                        <p>Lleva tus rutinas a donde quieras. Descarga nuestra app, entrena offline y nunca te pierdas un día de ejercicio. 
                        <b>¡Descargalo ahora!</b></p>
                    </div>                
                </div>               
            </div>
        </>
    )
}