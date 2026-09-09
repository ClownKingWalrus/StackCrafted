import { useState } from "react";
import styles from "./IEEE.module.css";

function IEEE_Login() { 
    const [error, setError] = useState("")

    async function AttemptToLogin(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = document.getElementById("accountForm") as HTMLFormElement;
        const data = new FormData(form);

        const username = data.get("username") as string
        const password = data.get("password") as string

        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })

            const result = await response.json()
            
            if (!response.ok) {
                throw new Error( result.error || "Login Failed")
            }
            
            window.location.href=('/IEEE_Club')

        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Uknown Error occured")
            }
            console.log(error);
        }
    }

    
    return (
        <div>
            <form id="accountForm" onSubmit={AttemptToLogin}>
                <div className={styles["center"]}>
                    <h1>Login</h1>
                    <h1 className={styles["ch1"]}>Username</h1>
                    <input name="username" />
                    <h1 className={styles["ch1"]}>Password</h1>
                    <input name="password" type="password" />
                    <h1></h1>
                    <button type="submit" className={styles["back-button"]}>Submit</button>
                </div>
            </form>
            <div className={styles["center"]}>
                <h1></h1>
                <button className={styles["back-button"]} onClick={() => {window.location.href=('/IEEE_Club')}}>Back</button>
            </div>
        </div>
    )
}

export default IEEE_Login