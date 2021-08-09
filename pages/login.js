import { useState, useEffect, useRef } from "react";
import { Form, Button, Message, Segment, TextArea, Divider } from "semantic-ui-react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { loginUser } from "../utils/authUser";
import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMessage";
import cookie from "js-cookie";

const Login = () => {
    const [ user, setUser ] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(null);
    const [submitDisabled, setSubmitDisabled] = useState(true);    

    const { email, password } = user;

    useEffect(() => {
        const isUser = Object.values({ email, password }).every(item => Boolean(item))
        isUser ? setSubmitDisabled(false) :  setSubmitDisabled(true);
    });    

    useEffect(() => {
        document.title= 'Welcome back';
        const userEmail = cookie.get("userEmail");
        if (userEmail) setUser(prev => ({ ...prev, email: userEmail }))
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        

        setUser(prev => ({
            ...prev, [name]: value
        }));
    };    

    const handleSubmit = async (e) => {
        await loginUser(user, setErrorMsg, setFormLoading);
    };


    return (
        <>
            <HeaderMessage />

                <Form loading={ formLoading } error={ errorMsg !== null } onSubmit={ handleSubmit }>
                    <Message 
                        error
                        header="Opps"
                        content={ errorMsg }
                        onDismiss={ () => setErrorMsg(null) }
                    />
                    <Segment>
                        <Form.Input 
                            required 
                            label="Email" 
                            placeholder="Email" 
                            name="email" 
                            value={ email } 
                            onChange={ handleChange } 
                            fluid 
                            icon="envelope" 
                            iconPosition="left" 
                            type="email" 
                        />
                        <Form.Input 
                            label="Password" 
                            placeholder="Password" 
                            name="password" 
                            value={ password } 
                            onChange={ handleChange } 
                            fluid 
                            icon={{ 
                                    name: 'eye', 
                                    circular: true, 
                                    link: true, 
                                    onClick:()=>setShowPassword(!showPassword)
                                }} 
                            iconPosition="left"
                            type={ showPassword? "text" : "password" }
                        />
                        <Divider hidden />

                        <Button 
                            icon="key"
                            content="Login" 
                            type="submit" 
                            color="orange" 
                            disabled={ submitDisabled } 
                        />                        
                    </Segment>
                </Form>
            <FooterMessage />
        </>
    );
}

export default Login