import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link, useNavigate, Navigate, Outlet } from "react-router-dom"
import {mostrar_alerta} from '../components/utility/functions'
import EjerciciosService from '../services/EjerciciosService'
import React, { Fragment, useState, useEffect } from 'react'
import Select from 'react-select'
import DataTable from 'react-data-table-component'
import { isUserLoggedIn } from '../components/utility/Util'

const Ejercicios = () => {

    // const [categoria, setCategoria] = useState('')
    const [selCategoria, setSelCategoria] = useState([{ value: '-1', label: `Cargando` }])
    const [selCategoriaPlaceholder, setSelCategoriaPlaceholder] = useState("Cargando...")
    const [cantidadEjercicios, setCantidadEjercicios] = useState(0)
    const [data_table, setdata_table] = useState({})
    const [pending, setPending] = useState(true)
    const ejercicioService = new EjerciciosService()
    const userLoggedIn = isUserLoggedIn()

    const listarMaestros=(intento = 0) => {
        ejercicioService.listarMaestros().then((response) => {
            if (response.data.codigo == "200"){
                setSelCategoria(response.data.categorias.map(x => {
                    return { value: x.cod_categoria, label: x.nombre_categoria}
                }))
                setSelCategoriaPlaceholder('Seleccione la categoría')
            }
        }).catch((error) => {
            console.log(error)
            if (intento !== 1) {
              if (error.response.status === 401) {
                setTimeout(() => {
                //   listadoMaestros(1)
                }, 1000)
                return
              }
            }
            console.error('Error al listar los maestros', error)
        })
    }

    const listadoDatos = (intento = 0, valueCategoria) => {
        setPending(true)
        setCantidadEjercicios(0);
        if(valueCategoria === null || valueCategoria === undefined){
            valueCategoria = ''
        } 
        ejercicioService.listarEjercicios(valueCategoria).then((response) => {
            setdata_table(response.data)
            setCantidadEjercicios(response.data.data.length);
            setPending(false)         
        }).catch((error) => {
        if (intento !== 1) {
            if (error.response.status === 401) {
            setTimeout(() => {
                listadoDatos(1)
            }, 1000)
            return
            }
        }
        console.error('Error al listar los ejercicios', error)
        setPending(false)
        if (intento !== 1) {
            if (error.response.status === 401) {
            setTimeout(() => {
                listadoDatos(1)
            }, 1000)
            }
        }
        })
    }
    
    const CustomLoaderDataTable = () => {
        return 'Cargando...'
      }

    String.isNullOrEmpty = function(value) {
        return !(typeof value === "string" && value.length > 0);
    }

    const eliminarEjercicio = (row) => {
        let id_ejercicio = row.id_ejercicio;
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de eliminar el ejercicio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#64A313',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed){                
                ejercicioService.eliminarEjercicio(id_ejercicio).then((response) => {
                    if (response.data.codigo == "200"){
                        MySwal.fire({
                            title: 'Eliminado!',
                            text: 'Se eliminó correctamente el ejercicio',
                            icon: 'success',
                            confirmButtonColor: '#64A313'
                        }).then((result) => {
                            if(result.isConfirmed){listadoDatos()}
                        })                       
                    }else{
                        MySwal.fire({
                            title: 'Error!',
                            text: 'Ocurrió un error al eliminar el ejercicio',
                            icon: 'error',
                            confirmButtonColor: '#64A313'
                        });
                    }
                }).catch((error) => {
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Ocurrió un error al eliminar el ejercicio',
                        icon: 'error',
                        confirmButtonColor: '#64A313'
                    });
                })   
            }else{
            }
        });
    }

    const columns = [
        {
            name: 'EJERCICIO',
            width: '200px',
            selector: row => row.nombre_ejercicio,
            className: 'text-center'
          },
          {
            name: 'SUBCATEGORÍA',
            selector: row => row.nombre_subcategoria
          },
          {
            name: 'DURACIÓN',
            selector: row => row.cantidad_duracion + row.unidad_medida_duracion
          },
          {
            name: 'SERIES',
            selector: row => row.series
          },
          {
            name: 'REPETICIÓN POR SERIE',
            selector: row => row.repeticiones
          },
          {
            name: 'DESCANSO',
            selector: row => row.cantidad_descanso + row.unidad_medida_descanso
          },         
          {
            name: 'ACCIONES',
            cell: (row) => {
                return (
                <div className='d-flex'>
                    <button className="btn btn-warning">
                        <i className="fa-solid fa-edit"></i>
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={()=> eliminarEjercicio(row)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
                )
            }
          }
    ]

    useEffect(() => {
        listarMaestros()
        listadoDatos()
    }, [])


    if (userLoggedIn){
        return( 
    <>
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-3">
                    <Select
                        hideSelectedOptions={false}              
                        onChange={e => listadoDatos(0, e.value)}
                        className='react-select'
                        classNamePrefix='select'
                        options={selCategoria}
                        isSearchable={false}
                        placeholder={selCategoriaPlaceholder}
                    />
                </div>
                <div className="col-md-6">
                </div>
                <div className="col-md-3">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-dark">
                            <Link to="/admin/agregar-ejercicio" style={{ textDecoration: 'none', color: 'white' }}><i className="fa-solid fa-circle-plus"></i> Añadir ejercicio</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <h2 className="text-center">LISTA DE EJERCICIOS</h2>
            </div>
            <div className="row mt-4">
                <div className="col-12 col-lg-8 w-100">
                    <div className="table-responsive">
                        <DataTable
                            columns={columns}
                            className='react-dataTable'
                            progressPending={pending}
                            progressComponent={<CustomLoaderDataTable />}
                            data={data_table.data}
                        />                       
                    </div>
                    
                </div>
                <p className="mt-3">Cantidad de ejercicios: {cantidadEjercicios}</p>
            </div>
        </div>
    </>
        )
    }else{
        return (<Navigate to="/login" />)
    }
}

export default Ejercicios