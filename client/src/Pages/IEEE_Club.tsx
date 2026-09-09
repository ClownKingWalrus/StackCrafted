import { useEffect, useState } from "react"
import IEEE_Background from "../Components/IEEEClub/IEEE_Background"
import IEEE_Navbar from "../Components/IEEEClub/IEEE_Navbar"
import IEEE_Scheduled_Events from "../Components/IEEEClub/IEEE_Scheduled_Events"

type User = {
  id: number;
  username: string;
  isadmin: boolean;
};

function IEEE_Club() {
    const [user, setUser] = useState<User | null>(null);

    useEffect( () => {
        fetch("/api/getLogin", {
            credentials: "include",
        })
        .then(res => res.ok ? res.json() : null)
        .then(data => setUser(data?.user || null))
    }, [])

    return (
        <div className="home">
        
        {/* background */}
            <IEEE_Background />

        {/*Nav Bar (Add some sort of Notification Settings for email reminders of events)*/}
            <IEEE_Navbar user={user}/>

        {/*Scheduled Events*/}
            <IEEE_Scheduled_Events />
        
        {/*Suggestions*/}
        
        {/*Contact Us*/}

        </div>
    )
}

export default IEEE_Club