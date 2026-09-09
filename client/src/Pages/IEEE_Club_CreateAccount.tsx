import IEEE_Background from "../Components/IEEEClub/IEEE_Background"
import IEEE_CreateAccount from "../Components/IEEEClub/IEEE_CreateAccount"
import styles from "../Components/IEEEClub/IEEE.module.css"

function IEEE_Club_CreateAccount() {
    return (
        <div className="home">

        {/* background */}
            <IEEE_Background />

        {/* Create Account Form */}
            <IEEE_CreateAccount />

        {/* Back Button */}
        <div className={styles["mt"]}>
            <div className={styles["center"]}>
                    <button onClick={() => {window.location.href=('/IEEE_Club')}} className={styles["back-button"]}>Go Back</button>
            </div>
        </div>

        </div>
    )
}

export default IEEE_Club_CreateAccount