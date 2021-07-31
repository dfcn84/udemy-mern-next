import axios from "axios";

const Index = ({ user, userFollowStats }) => {
    return(
        <div>
            Welcome back { user.email }
        </div>
    )
}

Index.getInitialProps = async (ctx) => {
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return { posts: res.data }
    }
    catch (err) {
        return { error: err }
    }
}

export default Index;