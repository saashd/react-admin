import axios from "axios";
import React from "react";
import handleError from "../api";

function ImageUpload(props: { uploaded: (url: string) => void }) {
    const upload = async (files: FileList | null) => {
        if (files === null) {
            return;
        }
        const formData = new FormData();
        formData.append('image', files[0]);
        try {
            const {data} = await axios.post("upload", formData);
            props.uploaded(data.url)
        } catch (error){
            handleError(error)
        }
    };
    return (<label className="btn btn-primary">
        Upload <input type="file" hidden
                      onChange={(e) => upload(e.target.files)}/></label>);

}

export default ImageUpload;