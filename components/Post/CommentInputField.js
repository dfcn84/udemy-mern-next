import  { useState } from "react";
import { Form } from "semantic-ui-react";

const CommentInputField = ({ postId, user, setComments }) => {

    const [ text, setText ] = useState("");
    const [ loading, setLoading ] = useState(false);
    return (
        <Form reply>
            <Form.Input 
                value= { text }
                onChange={ e => setText(e.target.value) }
                placeholder="Add a comment"
                action={{
                    color: 'blue',
                    icon: 'edit',
                    loading,
                    disabled: text === "" || loading
                }}
            />
        </Form>
    )
}

export default CommentInputField;