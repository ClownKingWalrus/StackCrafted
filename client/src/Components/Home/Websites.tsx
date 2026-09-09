import styles from "./Home.module.css";
import IEEELogo from "../../assets/IEEE_Student_Club.jpg";
import GithubLogo from "../../assets/Octicons-mark-github.svg";
import PortfolioTree from "../../assets/Portfolio_Tree.jpg";

function Websites() {
    return (
            <div className={styles["flex-row"]}>

                <div className={styles["card"]} onClick={() => {window.open("/IEEE_Club")}}>
                    <div className={styles["flex-row"]}>
                        <img src={IEEELogo} alt="IEEE Student club logo" className={styles["logo-website"]}/>
                        <div className={styles["card2"]}>
                            <h1 className={styles["ch1"]}>IEEE Club</h1>
                        </div>
                    </div>
                </div>

                <div className={styles["card"]} onClick={() => {window.open("https://github.com/ClownKingWalrus?tab=repositories", "_blank")}}>
                    <div className={styles["flex-row"]}>
                        <img src={GithubLogo} alt="Github SVG Logo" className={styles["logo-website"]}/>
                        <div className={styles["card2"]}>
                            <h1 className={styles["ch1"]}>Reposotory</h1>
                        </div>
                    </div>
                </div>

                <div className={styles["card"]} onClick={() => {window.open("https://clownkingwalrus.github.io/Portfolio/", "_blank")}}>
                    <div className={styles["flex-row"]}>
                        <img src={PortfolioTree} alt="Portfolio Tree Image" className={styles["logo-website"]}/>
                        <div className={styles["card2"]}>
                            <h1 className={styles["ch1"]}>Portfolio</h1>
                        </div>
                    </div>
                </div>

            </div> 
    )
}

export default Websites