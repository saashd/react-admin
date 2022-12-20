import Wrapper from "../../components/Wrapper";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import {Permission} from "../../models/permission";

function EditProduct() {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
    });
    const [redirect, setRedirect] = useState(false);
    const params = useParams();
    let id = params.id;

    useEffect(() => {
        (async () => {

                const {data} = await axios.get(`products/${id}`);
                setProduct({
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    price: data.price
                })

            }
        )()
    }, [id]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({...product, [e.target.id]: e.target.value})

    };

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        axios.put(`products/${id}`, product).then(res => {
            if (res.status === 202) {
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
                       value={product.title}
                       onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea id="description" className="form-control"
                          value={product.description}
                          onChange={(e) => {
                              setProduct({...product, [e.target.id]: e.target.value})
                          }}/>
            </div>
            <div className="form-group">
                <label>Image</label>
                <div className="input-group">
                    <input id="image" type="text" className="form-control"
                           value={product.image}
                           onChange={handleChange}
                    />
                    <ImageUpload uploaded={url => setProduct({...product, image: url})}/>
                </div>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input id="price" type="text" className="form-control"
                       value={product.price}
                       onChange={handleChange}
                />
            </div>

            <button className="btn btn-outline-secondary">Save</button>
        </form>
    </Wrapper>);
}

export default EditProduct;