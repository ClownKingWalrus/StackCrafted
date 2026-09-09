import styles from "./Home.module.css";

function NavBar() {
    return (
        <nav className={styles["navbar"]}>
            <img src="src/assets/MD1400_1.jpg" alt="Simple Logo" className={styles["logo"]}/>
            <h1 className={styles["ch2"]}>Stack Crafted</h1>
            <img src="src/assets/MD1400_1.jpg" alt="Simple Logo" className={styles["logo"]}/>
        </nav>
    )
}

export default NavBar