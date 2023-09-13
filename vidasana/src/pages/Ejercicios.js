import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate, Navigate, Outlet } from "react-router-dom"
import {mostrar_alerta} from '../components/utility/functions';

const Ejercicios = () => {

    const eliminarEjercicio = () => {
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
                MySwal.fire({
                    title: 'Eliminado!',
                    text: 'Se eliminó correctamente el ejercicio',
                    icon: 'success',
                    confirmButtonColor: '#64A313'
                });
            }else{
                MySwal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al eliminar el ejercicio',
                    icon: 'error',
                    confirmButtonColor: '#64A313'
                });
            }
        });
    }

    return( 
    <>
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-3">
                    <select className="form-select">
                        <option>Elongación</option>
                    </select>
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
            <div className="row mt-4">
                <h2 className="text-center">LISTA DE EJERCICIOS</h2>
            </div>
            <div className="row mt-4">
                <div className="col-12 col-lg-8 w-100">
                    <div className="table-responsive">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>EJERCICIO</th>
                                    <th>DURACIÓN</th>
                                    <th>SERIE</th>
                                    <th>REPETICIÓN POR SERIE</th>
                                    <th>DESCANSO</th>
                                    <th>ESTADO</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                <tr>
                                    <td>Cuadriceps</td>
                                    <td>20 a 30 segundos</td>
                                    <td>2 a 3</td>
                                    <td>2-3 repeticiones por pierna</td>
                                    <td>10 a 15 segundos</td>
                                    <td>Activado</td>
                                    <td>
                                        <button className="btn btn-warning">
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-danger" onClick={()=> eliminarEjercicio()}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Flexiones de cadera</td>
                                    <td>20 a 30 segundos</td>
                                    <td>2 a 3</td>
                                    <td>2-3 repeticiones por pierna</td>
                                    <td>10 a 15 segundos</td>
                                    <td>Activado</td>
                                    <td>
                                        <button className="btn btn-warning">
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-danger">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Isquiotibiales</td>
                                    <td>20 a 30 segundos</td>
                                    <td>2 a 3</td>
                                    <td>2-3 repeticiones por pierna</td>
                                    <td>10 a 15 segundos</td>
                                    <td>Activado</td>
                                    <td>
                                        <button className="btn btn-warning">
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        &nbsp;
                                        <button className="btn btn-danger">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h5>Cantidad de ejercicios: 3</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade">
            
        </div>
    </>
    )
}

export default Ejercicios