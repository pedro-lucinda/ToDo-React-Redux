import React from 'react'
import Swal from 'sweetalert2';

const CreatedTodoAlert = () => {
	return Swal.fire({
		icon: "success",
		title: "To do Created",
		showConfirmButton: false,
		timer: 1500,
		customClass: {
			popup: "p_swal",
			title: "h_swal",
			header: "h_swal",
			content: "h_swal",
		},
	});
}

export default CreatedTodoAlert
