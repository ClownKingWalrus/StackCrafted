import { useEffect } from "react"

function IEEE_LoginCheck() { 
    useEffect( () => {
        fetch("/api/getLogin", {
            credentials: "include",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.user)
        })
    }, [])
    return null;
}

export default IEEE_LoginCheck