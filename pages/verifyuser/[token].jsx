import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { verifyUser } from "../api/userAPI";
import Swal from "sweetalert2";

const verification = () => {
    const token = useParams()?.token
    const router = useRouter()


    useEffect(()=>{
        if(token){
            // connect backend tò verify
            verifyUser(token)
            .then(data=>{
                if(data.error){
                    Swal.fire({
                        title:'Error',
                        text: data.error,
                        icon:'error',
                        position: 'top-right',
                        // timer:3000,
                        showConfirmButton: false,
                        timerProgressBar:true
                    })
                }
                else{
                    Swal.fire({
                        title:'Congrats',
                        text:alert.message,
                        icon:'success',
                        position:"top-right",
                        timer:3000,
                        showConfirmButton: false,
                        timerProgressBar:true
                    })
                }
                router.push('/login')
            })

        }
    },[token])

    return ( <></> );
}
 
export default verification;