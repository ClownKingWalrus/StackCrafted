import styles from "./Home.module.css";
// document.addEventListener("click", (e) => {
//   console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
// });
function Background() {
    return (
        <div className={styles["space-scene"]}>
            {/* Centerd Star */}
            <div className={styles["sun-glow"]} />
            <div className={styles["sun"]} />
                
            <div className={styles["orbit"]}>
                <div className={styles["planet-wrapper"]}>
                    <div className={styles["planet"]} />
                </div>
            </div>
            <div className={styles["orbit2"]}>
                <div className={styles["planet-wrapper2"]}>
                    <div className={styles["planet2"]} />
                </div>
            </div>
            <div className={styles["orbit3"]}>
                <div className={styles["planet-wrapper3"]}>
                    <div className={styles["planet3"]} />
                </div>
            </div>

            {/* <div className={styles["planet4"]} /> */}

            {/* Second Star */}
            <div className={styles["sun2-glow"]} />
            <div className={styles["sun2"]} />

            <div className={styles["orbit1-1"]}>
                <div className={styles["planet-wrapper1-1"]}>
                    <div className={styles["planet1-1"]} />
                </div>
            </div>

        </div>
    )
}

export default Background