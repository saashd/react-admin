import Wrapper from "../../components/Wrapper";
import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

function CreateProduct() {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
    });
    const [redirect, setRedirect] = useState(false);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({...product, [e.target.id]: e.target.value})

    };

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        axios.post('products', product).then(res => {
            if (res.status === 201) {
                setRedirect(true);
            }

        }).catch((err) => {
            console.log(err)

        })
    };

    if (redirect) {
        return <Navigate to={'/products'}/>;
    }

    return (<Wrapper>
        <form onSubmit={submit}>
            <div className="form-group">
                <label>Title</label>
                <input id="title" type="text" className="form-control"
                       onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea id="description" className="form-control"
                          onChange={(e)=>{ setProduct({...product, [e.target.id]: e.target.value})}}/>
            </div>
            <div className="form-group">
                <label>Image</label>
                <div className="input-group">
                    <input id="image" type="text" className="form-control"
                           value={product.image ?? ""}
                           onChange={handleChange}
                    />
                    <ImageUpload uploaded={url => setProduct({...product, image: url})}/>
                </div>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input id="price" type="text" className="form-control"
                       onChange={handleChange}
                />
            </div>

            <button className="btn btn-outline-secondary">Save</button>
        </form>
    </Wrapper>);
}

export default CreateProduct;