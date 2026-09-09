import { useState } from "react";
import styles from "./IEEE.module.css";

function IEEE_AddEvent() { 
    const [error, setError] = useState("")

    async function attemptToAddEvent(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
            const form = document.getElementById("accountForm") as HTMLFormElement;
            const data = new FormData(form);

            const event_name = data.get("event_name") as string
            const event_decription = data.get("event_decription") as string
            const date = data.get("date") as string
            const dateFormatted = new Date(date).toISOString(); //format it to UTC timezone

            // hard cap the user to 50 chars worth of data
            if (event_name.length == 0 || event_name.length > 50) {
                return;
            }

            if (event_decription.length == 0) {
                return;
            }

            if (date.length == 0) {
                return;
            }

            console.log(event_name)
            console.log(event_decription)
            console.log(dateFormatted)

            try {
                const response = await fetch("/api/createEvent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        event_name: event_name,
                        event_decription: event_decription,
                        date: dateFormatted
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
        <div className={styles["background-scene"]}>
            <form id="accountForm" onSubmit={attemptToAddEvent}>
                <div className={styles["center"]}>
                    <h1>Create Event</h1>
                    <h1 className={styles["ch1"]}>Event Name</h1>
                    <input name="event_name" />
                    <h1 className={styles["ch1"]}>Event Description</h1>
                    <input name="event_decription" type="text" />
                    <h1 className={styles["ch1"]}>Date</h1>
                    <input name="date" type="datetime-local"/>
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

export default IEEE_AddEvent