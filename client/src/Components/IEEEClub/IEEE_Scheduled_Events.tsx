import { useEffect, useState } from "react";
import styles from "./IEEE.module.css";
type Events = {id: number, eventname: string, eventdescription: string, eventdate: Date}
function IEEE_Scheduled_Events() {
    const [events, setEvents] = useState<Events[]>([]);
    const [error, setError] = useState("");
    
    useEffect( () => {
        async function loadEvents() {
            try {
                const response = await fetch("/api/events");

                if (!response.ok) {
                    throw new Error("Visitors Failed to load")
                }

                const data = await response.json()
                setEvents(data)
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
        loadEvents()
    }, [])

    return (
        <div className="center">
            {events.map( (k) => (
                <div key={k.id} className={styles["card"]} onClick={() => {}}>
                    
                    {/* Title */}
                    <div className="center">
                        <h2 className={styles["ch1"]}>{k.eventname}</h2>
                    </div>

                    {/* Description */}
                    <h2 className={styles["ch2"]}>{k.eventdescription}</h2>

                    {/* Format Date */}
                    <div className="center">
                        <h2 className={styles["ch1"]}> {new Date(k.eventdate).toLocaleString("en-US", {dateStyle: "medium", timeStyle: "short"} )}</h2>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default IEEE_Scheduled_Events