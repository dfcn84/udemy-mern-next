import { useState, useEffect, useRef } from "react";
import { Form, Button, Message, Segment, TextArea, Divider } from "semantic-ui-react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import FormFields from "../components/Common/FormFields";
import ImageDragDrop from "../components/Common/ImageDragDrop";
import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMessage";
import { registerUser } from "../utils/authUser";
import { uploadPhoto } from "../utils/uploadPicToCloudinary";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const Signup = () => {
    const [ user, setUser ] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
        facebook: "",
        youtube: "",
        twitter: "",
        instagram: "",
    });

    const { name, email, password, bio } = user;

    const [showSocialLinks, setShowSocialLinks] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(null);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [highlighted, setHighlighted] = useState(null);
    const inputRef = useRef();

    const [username, setUsername] = useState('');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);

    let cancel;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        let profilePhotoUrl;
        if (media !== null) {
            profilePhotoUrl = await uploadPhoto(media);
        }

        if (media !== null && !profilePhotoUrl)  {
            setFormLoading(false);
            return setErrorMsg("Error uploading image.")
        }

        await registerUser(user, profilePhotoUrl, setErrorMsg, setFormLoading);
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'media') {
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]));
        }

        setUser(prev => ({
            ...prev, [name]: value
        }));
    };

    useEffect(() => {
        const isUser = Object.values({ name, email, password, bio }).every(item => Boolean(item))
        isUser ? setSubmitDisabled(false) :  setSubmitDisabled(true);
    }, [user]);

    useEffect(() => {
        username === "" ? setUsernameAvailable(false) : checkUsername();
        console.log("ue username", username);
    }, [username]);

    const checkUsername = async () => {
        setUsernameLoading(true);
        try {
            cancel && cancel();
            const CancelToken = axios.CancelToken;

            const res = await axios.get(`${baseUrl}/api/signup/${username}`, { cancelToken: new CancelToken(canceler => {
                cancel = canceler;
            }) });

            if (errorMsg !== null) setErrorMsg(null);

            if (res.data === "Available") {
                setUsernameAvailable(true);
                setUser(prev => ({
                    ...prev,
                    username
                }));
            }
        }
        catch (err) {
            setErrorMsg("Username not available");
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    }

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
                    <ImageDragDrop 
                        mediaPreview={ mediaPreview }
                        setMediaPreview={ setMediaPreview }
                        setMedia={ setMedia }
                        inputRef={ inputRef }
                        highlighted={ highlighted }
                        setHighlighted= { setHighlighted }
                        handleChange={ handleChange }

                    />
                    <Form.Input 
                        required 
                        label="Name" 
                        placeholder="Name" 
                        name="name" 
                        value={ name } 
                        onChange={ handleChange } 
                        fluid 
                        icon="user" 
                        iconPosition="left" 
                    />
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
                    <Form.Input 
                        required 
                        label="Username" 
                        placeholder="Username" 
                        name="username" 
                        loading={ usernameLoading } 
                        error={ usernameAvailable } 
                        value={ username } 
                        onChange={ e => { 
                                setUsername(e.target.value); 
                                if (regexUserName.test(e.target.value)) 
                                    setUsernameAvailable(true);
                                else
                                    setUsernameAvailable(false);
                            } } 
                        fluid 
                        icon={ usernameAvailable? "check" : "close"} 
                        iconPosition="left" 
                    />

                    <FormFields 
                        user={ user } 
                        showSocialLinks={ showSocialLinks } 
                        setShowSocialLinks={ setShowSocialLinks }
                        handleChange={ handleChange }
                    />
                
                    <Divider />

                    <Button 
                        icon="signup"
                        content="Signup" 
                        type="submit" 
                        color="orange" 
                        disabled={ submitDisabled || !usernameAvailable } 
                    />
                </Segment>
            </Form>

            <FooterMessage />
        </>
    );
}

export default Signup