import { useState } from "react";
import styles from "./IEEE.module.css";

function IEEE_CreateAccount() { 
    const [error, setError] = useState("")
    async function AttemptToCreateAccount(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = document.getElementById("accountForm") as HTMLFormElement;
        const data = new FormData(form);

        const user = data.get("username") as string
        const password = data.get("password") as string
        const email = data.get("email") as string

        // hard cap the user to 50 chars worth of data
        if (user.length == 0 || user.length > 50) {
            return;
        }

        if (password.length == 0 || password.length > 50) {
            return;
        }

        if (email.length == 0 || email.length > 50) {
            return;
        }

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!pattern.test(email)) {
            return;
        }

        try {
            const response = await fetch("/api/usersCheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user,
                    email: email,
                    password: password
                }),
            })

            const result = await response.json()
            
            if (result.created) {
                console.log("Attemptin to create")
                window.location.href=('/IEEE_Club/Login')
            }

            if (result.exists) {
                console.log("account already exisit in the system")
                throw new Error( result.error || "Login Failed")
            }  
            
            

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
            <form id="accountForm" onSubmit={AttemptToCreateAccount}>
                <div className={styles["center"]}>
                    <h1>Create Account</h1>
                    <h1 className={styles["ch1"]}>Username</h1>
                    <input name="username" />
                    <h1 className={styles["ch1"]}>Password</h1>
                    <input name="password" type="password" />
                    <h1 className={styles["ch1"]}>Email</h1>
                    <input name="email"/>
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

export default IEEE_CreateAccount