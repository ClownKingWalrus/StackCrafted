import styles from "./IEEE.module.css";

async function logOut() {
    await fetch("http://localhost:3001/api/logOut", {
        method: "POST",
        credentials: "include",
    })

    window.location.reload()
}

async function adminCheck() {
    const res = await fetch("http://localhost:3001/api/admin/users", {
        method: "POST",
        credentials: "include",
    })

    if (!res.ok) {
        window.location.href=('/IEEE_Club/AddEvent')
    }
}

type User = {
    id: number;
    username: string;
    isadmin: boolean;
}

type Props = {
    user: User | null;
}

function IEEE_Navbar({ user }: Props) {
    return (
        <nav className={styles["navbar"]}>
            {user ? 
                (<> 
                    <section className={styles["w33"]}>
                        <div className={styles["card-welcome"]}>
                            <h1 className={styles["ch1"]}>Welcome {user.username}</h1>
                        </div>
                    </section>

                    <section className={styles["w33"]}>
                        <h1 className="ch2">SNHU IEEE Club</h1>
                    </section>

                    <section className={styles["w33"]}>
                        {user.isadmin && (
                            <button onClick={() => adminCheck()}>Add Events</button>
                        )}
                        <button onClick={() => logOut()}>Logout</button>
                    </section>

                </>) : 
                (<>
                    <section className={styles["w33"]}>
                        <button onClick={() => {window.location.href=('/IEEE_Club/CreateAccount')}}>Create Account</button>
                    </section>

                    <section className={styles["w33"]}>
                        <h1 className="ch2">SNHU IEEE Club</h1>
                    </section>

                    <section className={styles["w33"]}>
                        <button onClick={() => {window.location.href=('/IEEE_Club/Login')}}>Login</button>
                    </section>

                </>)}
        </nav>
    )
}

export default IEEE_Navbar