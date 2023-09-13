import React, {useState, useContext} from "react";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import '../components/style/Signup.css';
import user_icon from '../components/assets/person.png'
import password_icon from '../components/assets/password.png'
import logo from '../components/assets/logo_vida_sana.jpg'
import imgLogin from '../components/assets/img_login.jpg'
import * as AWS from 'aws-sdk/global'
import { Link, useNavigate, Navigate } from "react-router-dom"
import { isUserLoggedIn } from '../components/utility/Util'

const Login = () =>{

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[visibleMsgError, setVisibleMsgError] = useState(false);
    const[msgError, setMsgError] = useState("");
    const navigate = useNavigate(); 

    const onSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                localStorage.setItem('userData', data.getAccessToken())
                localStorage.setItem('userToken', data.getIdToken().getJwtToken())
                navigate("/admin");
            },
            onFailure: (error) => {
                setVisibleMsgError(true);           
                if(error.message == "User does not exist."){
                    setMsgError("Este usuario no se encuentra registrado");
                }else if(error.message == "Incorrect username or password."){
                    setMsgError("Contraseña incorrecta.");
                }else if(error.message == "Missing required parameter USERNAME"){
                    setMsgError("Debe ingresar el usuario");
                }else{
                    setMsgError("Ocurrió un error al iniciar sesión");
                }
            },
            newPasswordRequired: (data) => {

                const samePassword = document.getElementById("login-password").value

                user.completeNewPasswordChallenge(samePassword, null, {
                    onSuccess: (result) => {
                      const idToken = result.getIdToken().getJwtToken()
          
                      const region_aws = 'us-east-1'
                      AWS.config.region = region_aws
          
                      const logins_aws = {
                        Logins: {}
                      }
                      logins_aws.Logins[`cognito-idp.${region_aws}.amazonaws.com/2iidbtpg00cku2n329hiba9k2d`] = result.getIdToken().getJwtToken()
                      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: "us-east-1_OJo9kXGfp",
                        Logins: logins_aws.Logins
                      })
                      localStorage.setItem('userData', result.getAccessToken())
                      localStorage.setItem('userToken', idToken)
                      navigate('/admin');
                    },
                    onFailure: (error) => {
                        setVisibleMsgError(true);
                        setMsgError("Ocurrió un error al iniciar sesión");           
                    }
                })
                
            }
        });
    };

    const userLoggedIn = isUserLoggedIn();

    if (userLoggedIn){
        return (<Navigate to="/admin"/>)
    }else{
        return(
            <div className="container-main">
                <div className="container-login">
                    <div className="header-login">
                        <img src={logo} alt=""/>
                        <div className="tittle">Iniciar sesión</div>
                        <div className="underline"></div>
                    </div>
                        <div className="inputs">
                            <div className="input">
                                <img src={user_icon} alt=""/>
                                <input
                                    type="text" 
                                    placeholder="Usuario" 
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)} 
                                ></input>
                            </div>
                            <div className="input">
                                <img src={password_icon} alt=""/>
                                <input 
                                    type="password" 
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    id="login-password"
                                ></input>
                            </div>                    
                        </div>
                        <div className="errors">
                            {visibleMsgError && <p className="msgError">{msgError}</p>}
                        </div>
                        <div className="submit-container">
                            <div className="submit" onClick={onSubmit}>Iniciar sesión</div>
                        </div>
                </div>
                <div className="container-img">
                    <img src={imgLogin} alt=""/>
                </div>
            </div>
        );
    }
    
};

export default Login;