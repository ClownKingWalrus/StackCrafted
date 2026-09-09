import Background from "../Components/Home/Background"
import NavBar from "../Components/Home/Navbar"
import Visitors from "../Components/Home/Visitors"
import Websites from "../Components/Home/Websites"
import styles from "../Components/Home/Home.module.css";

function Home() {
    return (
        <div className={styles["home"]}>
        
        {/* background */}
            <Background />

        {/*Nav Bar*/}
            <NavBar />

        {/*Visitors*/}
            <Visitors /> 

        {/*Scroll Down*/}
        <div className={styles["heroScroll"]}>
            <div className={styles["scroll-down"]}>
                <h2>Scroll Down</h2>
            </div>
        </div>

        {/*Website Cards*/}
        <Websites />
        
        {/*Contact Me*/}
        </div>
    )
}

export default Home