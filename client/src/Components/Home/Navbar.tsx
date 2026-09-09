import styles from "./Home.module.css";
import MD1400 from "../../assets/MD1400_1.jpg";

function NavBar() {
    return (
        <nav className={styles["navbar"]}>
            <img src={MD1400} alt="Simple Logo" className={styles["logo"]}/>
            <h1 className={styles["ch2"]}>Stack Crafted</h1>
            <img src={MD1400} alt="Simple Logo" className={styles["logo"]}/>
        </nav>
    )
}

export default NavBar