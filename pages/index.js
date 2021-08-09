import { useEffect } from "react";
import axios from "axios";

const Index = ({ user, userFollowStats }) => {

    useEffect(() => {
        document.title = `Welcome, ${ user.name.split(" ")[0] }`;
    }, []);

    return(
        <div>
            Welcome back { user.email }
        </div>
    )
}

export default Index;