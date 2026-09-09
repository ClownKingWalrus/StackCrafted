import IEEE_Background from "../Components/IEEEClub/IEEE_Background"
import IEEE_Login from "../Components/IEEEClub/IEEE_Login"

function IEEE_Club_Login() {
    return (
        <div className="home">
        
        {/* background */}
            <IEEE_Background />

        {/*Scheduled Events*/}
            <IEEE_Login />
        
        {/*Suggestions*/}
        
        {/*Forgot Password?*/}

        </div>
    )
}

export default IEEE_Club_Login