import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function mostrar_alerta(mensaje,icono,foco=''){
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:mensaje,
        iconn:icono,
        confirmButtonColor: '#64A313'
    });
}

function onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}