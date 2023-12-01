import { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('http://localhost:3000/upload', formData);
            console.log('Image uploaded successfully. Image path:', response.data.imagePath);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage}>Upload Image</button>
        </div>
    );
};

export default ImageUpload;
