import Swal from "sweetalert2";
import { GlobalStyle } from "../assets/style/global";

interface SweetAlert {
    title?: string,
    text?: string,
    icon?: "success" | "error" | "warning" | "info" | "question",
    textButton?:string 
}

export default async function Sweet({title, text, icon, textButton}: SweetAlert){
  return await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: textButton,
    confirmButtonColor: `var(--green)`,
    cancelButtonText: "Cancelar",
    cancelButtonColor: `var(--gray)`,
    customClass: {
      confirmButton: "confirmButtonSweet",
      cancelButton: "cancelButtonSweet",
      title: "titleCustomSweet"
    }
  }).then((result) => {
    console.log(result);
    return result
  });
}

