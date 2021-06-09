import Swal from "sweetalert2";

export const showSwalSuccess = ( text ) => {

  Swal.fire({
    icon: 'success',
    text,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
  });
  
}