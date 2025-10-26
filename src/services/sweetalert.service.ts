import swal from 'sweetalert2';
const toast = swal.mixin({
  toast: true,
  position: "top-end",
  timer: 10000,
  timerProgressBar: true,
  showConfirmButton: false,
  color: "#28529f",
  background: "#f9f9f9",
  confirmButtonColor: "#28529f",
  denyButtonColor: "#ff5d5d",
  showCancelButton: false,
  showDenyButton: false,
});
export const SweetalertService = {
  /**
   * Confirmation modal (returns true if confirmed) and false on Cancel/Deny or timer expiration
   */
  async confirm(text: string, title = "Are you sure?") {
    const result = await swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28529f",
      cancelButtonColor: "#ff5d5d",
    });
    return result.isConfirmed;
  },
  /**
   * Success toast
   */
  success(message: string) {
    toast.fire({
      icon: "success",
      title: message,
    });
  },

  /**
   * Error toast
   */
  error(message: string) {
    toast.fire({
      icon: "error",
      title: message,
    });
  },
  /**
   * Info toast (optional)
   */
  info(message: string) {
    toast.fire({
      icon: "info",
      title: message,
    });
  },
};
