import { useEffect, useState } from "react";
import styles from "./Home.module.css";
type Visitor = {id: number, visitortype: string, visitorcount: number}

function Visitors() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [error, setError] = useState("");

    useEffect( () => {
        async function loadVistors() {
            try {
                const response = await fetch("/api/visitors");

                if (!response.ok) {
                    throw new Error("Visitors Failed to load")
                }

                const data = await response.json()
                setVisitors(data)
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
        loadVistors()
    }, [])

    return (
        <div>
            <div className={styles["center"]}>
                <h2 className={styles["ch2"]}>Visits</h2>
            </div>
                <div className="flex-row">
                    { visitors.map((k) => (
                        <h2 className={styles["ch2"]}>{k.visitortype}: {k.visitorcount}</h2>
                    ))}
            </div>
        </div>
    )
}

export default Visitors