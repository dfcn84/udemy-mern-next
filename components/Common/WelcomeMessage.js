import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
    const router = useRouter();
    const signupRoute = router.pathnamr === "/signup";

    return (
        <Message 
            color="teal"
            attached    
            header={ signupRoute ? "Get Statrted" : "Welcome back" }
            icon={ signupRoute ? "settings" : "privacy" }
            content= { signupRoute ? "Create new account" : "Login with email and password"}
        />
    )
}

export const FooterMessage = () => {
    const router = useRouter();
    const signupRoute = router.pathname === "/signup";

    return (
        <>
            { signupRoute ? (
                <>
                    <Message attached="bottom" warning>
                        <Icon name="help" />
                        Exisiting User? <Link href="/login">Login here</Link>
                    </Message>
                    <Divider hidden />
                </>
            ) : (
                <>
                    <Message attached="bottom" info>
                        <Icon name="lock" />
                        <Link href="/reset">Forgot password?</Link>
                    </Message>

                    <Message attached="bottom" warning>
                        <Icon name="help" />
                        New User? <Link href="/signup">Signup here</Link>
                    </Message>                                    
                </>
            )}
        </>
    );
}