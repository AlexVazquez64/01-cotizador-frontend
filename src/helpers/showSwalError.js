import Swal from "sweetalert2";


export const showSwalError = ( text ) => {

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
  });
  
} 
  