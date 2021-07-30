import { Form, Segment, Image, Icon, Header } from "semantic-ui-react";


const ImageDragDrop = ({ 
        highlighted, 
        setHighlighted, 
        inputRef, 
        handleChange, 
        mediaPreview, 
        setMediaPreview,
        setMedia
    }) => {
    return (
        <>
            <Form.Field>
                <Segment placeholder basic secondary>
                    <input 
                        style={{display: "none"}}
                        type="file"
                        accept="images/*"
                        onChange={ handleChange }
                        name="media"
                        ref={ inputRef }
                    />
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setHighlighted(true)
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault();
                            setHighlighted(false)
                        }}       
                        onDrop={(e) => {
                            e.preventDefault();
                            setHighlighted(true);
                            const droppedFile = Array.from(e.dataTransfer.files);
                            setMedia(droppedFile[0]);
                            setMediaPreview(URL.createObjectURL(droppedFile[0]));
                        }}                 
                    >{ mediaPreview === null ? (
                        <>
                            <Segment color={ highlighted ? "green" : "" } placeholder basic>
                                <Header icon>
                                    <Icon 
                                        name="file image outline" 
                                        style={{ cursor: "pointer"}}
                                        onClick={ () => inputRef.current.click() }
                                    />
                                    Drag & drop or click to upload image
                                </Header>

                            </Segment>
                        </>
                        ) : (
                        <>
                            <Segment color="green" placeholder basic>
                                <Image src={ mediaPreview } 
                                    size="media" 
                                    centered 
                                    style={{ cursor: "pointer "}} 
                                    onClick={ () => inputRef.current.click() }
                                />
                            </Segment>
                        </>
                    )}</div>
                </Segment>
            </Form.Field>
        </>
    );
}

export default ImageDragDrop;
