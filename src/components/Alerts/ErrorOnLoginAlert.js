import Swal from "sweetalert2";

const ErrorOnLoginAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "You need to login first",
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: "p_swal",
      title: "h_swal",
      header: "h_swal",
      content: "h_swal",
    },
  });
};

export default ErrorOnLoginAlert;
