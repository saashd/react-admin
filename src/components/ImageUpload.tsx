import axios from "axios";
import React from "react";

function ImageUpload(props: { uploaded: (url: string) => void }) {
    const upload = (files: FileList | null) => {
        if (files === null) {
            return;
        }
        const formData = new FormData();
        formData.append('image', files[0]);

        axios.post("upload", formData).then(r => {
            console.log(r)
            if (r.status == 200) {
                props.uploaded(r.data.url)
            }


        }).catch(err => {
            console.log(err)
        })


    };
    return (<label className="btn btn-primary">
        Upload <input type="file" hidden
                      onChange={(e) => upload(e.target.files)}/></label>);

}

export default ImageUpload;