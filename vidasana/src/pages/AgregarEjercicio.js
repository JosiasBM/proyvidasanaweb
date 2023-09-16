import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link, useNavigate, Navigate, Outlet } from "react-router-dom"
import EjerciciosService from '../services/EjerciciosService'
import Select from 'react-select'
import React, { Fragment, useState, useEffect } from 'react'
import {
    Row,
    Col,
    CardTitle,
    CardText,
    Form,
    Label,
    Input,
    Button,
    Alert
  } from "reactstrap"
import { isUserLoggedIn } from '../components/utility/Util'

const Ejercicios = () => {

    const [selSubCategoria, setSelSubCategoria] = useState([{ value: '-1', label: `Cargando` }])
    const [selSubCategoriaPlaceholder, setSelSubCategoriaPlaceholder] = useState("Cargando...")
    const [subCategoria, setSubCategoria] = useState("")
    const [umDuracion, setUmDuracion] = useState("")
    const [umDescanso, setUmDescanso] = useState("")
    const [mensajeVacioNombreEjercicio, setMensajeVacioNombreEjercicio] = useState("") 
    const [vacioNombreEjercicio, setVacioNombreEjercicio] = useState(false)  
    const [mensajeVacioDescEjercicio, setMensajeVacioDescEjercicio] = useState("") 
    const [vacioDescEjercicio, setVacioDescEjercicio] = useState(false)
    const [mensajeVacioSubCategoriaEjercicio, setMensajeVacioSubCategoriaEjercicio] = useState("") 
    const [vacioSubCategoriaEjercicio, setVacioSubCategoriaEjercicio] = useState(false)
    const [mensajeVacioDuracionEjercicio, setMensajeVacioDuracionEjercicio] = useState("") 
    const [vacioDuracionEjercicio, setVacioDuracionEjercicio] = useState(false)            
    const [mensajeVacioUmDuracionEjercicio, setMensajeVacioUmDuracionEjercicio] = useState("") 
    const [vacioUmDuracionEjercicio, setVacioUmDuracionEjercicio] = useState(false)
    const [mensajeVacioSeriesEjercicio, setMensajeVacioSeriesEjercicio] = useState("") 
    const [vacioSeriesEjercicio, setVacioSeriesEjercicio] = useState(false)
    const [mensajeVacioRepeticionesEjercicio, setMensajeVacioRepeticionesEjercicio] = useState("") 
    const [vacioRepeticionesEjercicio, setVacioRepeticionesEjercicio] = useState(false)
    const [mensajeVacioDescansoEjercicio, setMensajeVacioDescansoEjercicio] = useState("") 
    const [vacioDescansoEjercicio, setVacioDescansoEjercicio] = useState(false)
    const [mensajeVacioUmDescansoEjercicio, setMensajeVacioUmDescansoEjercicio] = useState("") 
    const [vacioUmDescansoEjercicio, setVacioUmDescansoEjercicio] = useState(false)
 
    const ejercicioService = new EjerciciosService()
    const userLoggedIn = isUserLoggedIn()

    String.isNullOrEmpty = function(value) {
        return !(typeof value === "string" && value.length > 0);
    }

    let subcategorias=[]

    const listarMaestros=(intento = 0) => {
        ejercicioService.listarMaestros().then((response) => {
            if (response.data.codigo == "200"){
                
                response.data.categorias.map(x => {
                    x.subcategorias.map(y => {
                        subcategorias.push({value: y.cod_subcategoria, label: y.nombre_subcategoria})
                    })
                })
                setSelSubCategoria(subcategorias)
                setSelSubCategoriaPlaceholder('Seleccione la categoría')
            }
        }).catch((error) => {
            if (intento !== 1) {
              if (error.response.status === 401) {
                setTimeout(() => {
                listarMaestros(1)
                }, 1000)
                return
              }
            }
            console.error('Error al listar los maestros', error)
        })
    }

    const agregarEjercicio = () => {

        let txtNombre = document.getElementById('nombreEjercicio').value
        let txtDescripcion = document.getElementById('descripcionEjercicio').value
        let selSubCategoria = subCategoria.value
        let txtDuracion = document.getElementById('duracionEjercicio').value
        let selDuracion = umDuracion.value
        let txtSeries = document.getElementById('seriesEjercicio').value
        let txtRepeticiones = document.getElementById('repeticionesEjercicio').value
        let txtDescanso = document.getElementById('descansoEjercicio').value
        let selDescanso = umDescanso.value
        const MySwal = withReactContent(Swal);

        if (String.isNullOrEmpty(txtNombre)) {
            setMensajeVacioNombreEjercicio('Ingrese el nombre del ejercicio')
            setVacioNombreEjercicio(true)
        }else{
            setVacioNombreEjercicio(false)
        }

        if (String.isNullOrEmpty(txtDescripcion)) {
            setMensajeVacioDescEjercicio('Ingrese la descripción del ejercicio')
            setVacioDescEjercicio(true)
        }else{
            setVacioDescEjercicio(false)
        }

        if (String.isNullOrEmpty(selSubCategoria)) {
            setMensajeVacioSubCategoriaEjercicio('Ingrese la subcategoría del ejercicio')
            setVacioSubCategoriaEjercicio(true)
        }else{
            setVacioSubCategoriaEjercicio(false)
        }

        if (String.isNullOrEmpty(txtDuracion)) {
            setMensajeVacioDuracionEjercicio('Ingrese la duración del ejercicio')
            setVacioDuracionEjercicio(true)
        }else{
            setVacioDuracionEjercicio(false)
        }

        if (String.isNullOrEmpty(selDuracion)) {
            setMensajeVacioUmDuracionEjercicio('Ingrese la unidad de medida de la duración del ejercicio')
            setVacioUmDuracionEjercicio(true)
        }else{
            setVacioUmDuracionEjercicio(false)
        }

        if (String.isNullOrEmpty(txtSeries)) {
            setMensajeVacioSeriesEjercicio('Ingrese la cantidad de series del ejercicio')
            setVacioSeriesEjercicio(true)
        }else{
            setVacioSeriesEjercicio(false)
        }

        if (String.isNullOrEmpty(txtRepeticiones)) {
            setMensajeVacioRepeticionesEjercicio('Ingrese la cantidad de repeticiones del ejercicio')
            setVacioRepeticionesEjercicio(true)
        }else{
            setVacioRepeticionesEjercicio(false)
        }

        if (String.isNullOrEmpty(txtDescanso)) {
            setMensajeVacioDescansoEjercicio('Ingrese el tiempo de descanso del ejercicio')
            setVacioDescansoEjercicio(true)
        }else{
            setVacioDescansoEjercicio(false)
        }

        if (String.isNullOrEmpty(selDescanso)) {
            setMensajeVacioUmDescansoEjercicio('Ingrese la unidad de medida del tiempo de descanso del ejercicio')
            setVacioUmDescansoEjercicio(true)
        }else{
            setVacioUmDescansoEjercicio(false)
        }

        let request = {
            "nombre_ejercicio": txtNombre,
            "cod_subcategoria": selSubCategoria,
            "cantidad_duracion": txtDuracion,
            "unidad_medida_duracion": selDuracion,
            "series": txtSeries,
            "repeticiones": txtRepeticiones,
            "cantidad_descanso": txtDescanso,
            "unidad_medida_descanso": selDescanso,
            "descripcion": txtDescripcion
        }

        if(!String.isNullOrEmpty(txtNombre) && !String.isNullOrEmpty(txtDescripcion) && !String.isNullOrEmpty(selSubCategoria) && !String.isNullOrEmpty(txtDuracion)
        && !String.isNullOrEmpty(selDuracion) && !String.isNullOrEmpty(txtSeries) && !String.isNullOrEmpty(txtRepeticiones) && !String.isNullOrEmpty(txtDescanso)
        && !String.isNullOrEmpty(selDescanso)){
            ejercicioService.registrarEjercicio(request).then((response) => {
                if (response.data.codigo == "200"){
                    MySwal.fire({
                        title: 'Registrado!',
                        text: 'Se registró correctamente el ejercicio',
                        icon: 'success',
                        confirmButtonColor: '#64A313'
                    }).then((result) => {
                        if(result.isConfirmed){
                            document.getElementById('nombreEjercicio').value = ""
                            document.getElementById('descripcionEjercicio').value = ""
                            document.getElementById('duracionEjercicio').value = ""
                            document.getElementById('seriesEjercicio').value = ""
                            document.getElementById('repeticionesEjercicio').value = ""
                            document.getElementById('descansoEjercicio').value = ""
                            setSubCategoria("")
                            setUmDuracion("")
                            setUmDescanso("")
                        }                       
                    })                       
                }else{
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Ocurrió un error al agregar el ejercicio',
                        icon: 'error',
                        confirmButtonColor: '#64A313'
                    });
                }
            }).catch((error) => {
                MySwal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al agregar el ejercicio',
                    icon: 'error',
                    confirmButtonColor: '#64A313'
                });
            })
        }
    }

    useEffect(() => {
        listarMaestros()
    }, [])

    if (userLoggedIn){
        return (
            <>
                <div className="border border-dark p-3">
                    <div className="mb-3 row">
                        <h2 className="text-center">REGISTRAR NUEVO EJERCICIO</h2>
                    </div>
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Nombre del ejercicio
                        </Label>
                        <div className="col-md-9">
                            <Input
                                type="text"
                                id="nombreEjercicio"
                                placeholder=""
                                autoFocus
                                className="form-control"                
                            />
                        </div>     
                    </div>
                    {
                        vacioNombreEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioNombreEjercicio}</p> </div>
                        </div>
                    }
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Descripción del ejercicio
                        </Label>
                        <div className="col-md-9">
                            <Input
                                type="text"
                                id="descripcionEjercicio"
                                placeholder=""
                                className="form-control"               
                            />
                        </div>                      
                    </div>
                    {
                        vacioDescEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioDescEjercicio}</p> </div>
                        </div>
                    }               
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label text-center">Sub categoría</label>
                        <div className="col-sm-9">
                        <Select
                            value={subCategoria}      
                            className='react-select'
                            classNamePrefix='form-control'
                            options={selSubCategoria}
                            isSearchable={false}
                            placeholder={selSubCategoriaPlaceholder}
                            onChange={(e) => setSubCategoria(e)}  
                        />
                        </div>
                    </div>
                    {
                        vacioSubCategoriaEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioSubCategoriaEjercicio}</p></div>
                        </div>
                    } 
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Duración
                        </Label>
                        <div className="col-md-9">
                            <Input
                                type="number"
                                id="duracionEjercicio"
                                placeholder=""
                                className="form-control"              
                            />
                        </div>  
                    </div>
                    {
                        vacioDuracionEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioDuracionEjercicio}</p></div>
                        </div>
                    } 
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Unidad de medida(duración)
                        </Label>
                        <div className="col-md-9">
                            <Select
                                value={umDuracion}       
                                className='react-select'
                                classNamePrefix='select'
                                options={[{value: 'H', label: 'Hora'}, {value: 'M', label: 'Minuto'}, {value: 'S', label: 'Segundo'}]}
                                isSearchable={false}
                                placeholder='Seleccione la unidad de medida'
                                onChange={(e) => setUmDuracion(e)}  
                            />
                        </div>  
                    </div>
                    {
                        vacioUmDuracionEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioUmDuracionEjercicio}</p></div>
                        </div>
                    } 
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Series
                        </Label>
                        <div className="col-md-9">
                            <Input
                                type="number"
                                id="seriesEjercicio"
                                placeholder=""
                                className="form-control"            
                            />
                        </div>
                    </div>
                    {
                        vacioSeriesEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioSeriesEjercicio}</p></div>
                        </div>
                    } 
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Repeticiones
                        </Label>
                        <div className="col-md-9">
                            <Input
                                type="number"
                                id="repeticionesEjercicio"
                                placeholder=""
                                className="form-control"             
                            />
                        </div>
                    </div>
                    {
                        vacioRepeticionesEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioRepeticionesEjercicio}</p></div>
                        </div>
                    } 
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Descanso
                        </Label>
                        <div className="col-md-9">
                            <Input
                                type="number"
                                id="descansoEjercicio"
                                placeholder=""
                                className="form-control"              
                            />
                        </div>
                    </div>
                    {
                        vacioDescansoEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioDescansoEjercicio}</p></div>
                        </div>
                    } 
                    <div className="mb-3 row">
                        <Label className="col-sm-3 col-form-label text-center">
                            Unidad de medida(descanso)
                        </Label>
                        <div className="col-md-9">
                            <Select
                                value={umDescanso}         
                                className='react-select'
                                classNamePrefix='select'
                                options={[{value: 'H', label: 'Hora'}, {value: 'M', label: 'Minuto'}, {value: 'S', label: 'Segundo'}]}
                                isSearchable={false}
                                placeholder='Seleccione la unidad de medida'
                                onChange={(e) => setUmDescanso(e)}  
                            />
                        </div>  
                    </div>
                    {
                        vacioUmDescansoEjercicio &&
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9"><p style={{color:'red'}}>{mensajeVacioUmDescansoEjercicio}</p></div>
                        </div>
                    } 
                    <div className="mt-4 row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <button className="btn btn-success w-100" style={{backgroundColor: "#64A313", borderColor: "#64A313"}} onClick={()=> agregarEjercicio()}>REGISTRAR</button>
                        </div>
                        <div className="col-4"></div>                  
                    </div>
                </div>
                
            </>
        )
    }else{
        return (<Navigate to="/login" />)
    }
};

export default Ejercicios;