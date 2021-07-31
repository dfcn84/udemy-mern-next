import axios from 'axios';

const uploadPhoto = async (media) => {
    try {
        const form = new FormData();
        form.append('file', media);
        form.append('upload_preset', 'u_smedia');
        form.append('cloud_name', 'dwr3giu9n');

        const res = await axios.post(process.env.CLOUDINARY_URL, form);
        return res.data.url;
    }
    catch (err) {
        return;
    }
}

export default uploadPhoto;