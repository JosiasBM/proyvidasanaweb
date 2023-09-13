import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Ejercicios = () => {

    const agregarEjercicio = () => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Registrado!',
            text: 'Se registró correctamente el ejercicio',
            icon: 'success',
            confirmButtonColor: '#64A313'
        });
    }

    return (
        <>
            <div className="border border-dark p-5">
                <div className="mb-3 row">
                    <h2 className="text-center">REGISTRAR NUEVO EJERCICIO</h2>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label text-center">Descripción del ejercicio</label>
                    <div className="col-sm-9">
                        <input type="text" id="descripcion" className="form-control border border-dark" value=""/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label text-center">Categoría</label>
                    <div className="col-sm-9">
                        <select className="form-control border border-dark">
                            <option>Categoría 1</option>
                            <option>Categoría 2</option>
                            <option>Categoría 3</option>
                            <option>Categoría 4</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label text-center">Subcategoría</label>
                    <div className="col-sm-9">
                        <select className="form-control border border-dark">
                                <option>Subcategoría 1</option>
                                <option>Subcategoría 2</option>
                                <option>Subcategoría 3</option>
                                <option>Subcategoría 4</option>
                            </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label text-center">Duración</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control border border-dark" value=""/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label text-center">Serie</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control border border-dark" value=""/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label text-center">Repetición por serie</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control border border-dark" value=""/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label text-center">Descanso</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control border border-dark" value=""/>
                    </div>
                </div>
                <div className="mt-5 row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-success w-100" style={{backgroundColor: "#64A313", borderColor: "#64A313"}} onClick={()=> agregarEjercicio()}>REGISTRAR</button>
                    </div>
                    <div className="col-4"></div>                  
                </div>
            </div>
            
        </>
    )
};

export default Ejercicios;