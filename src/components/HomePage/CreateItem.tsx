import React, { useState } from 'react';
import { InventoryCreate } from '../../store/inventory/types';

interface CartItemsProps {
    onCreate: (data:InventoryCreate) => void
}

const CreateItems:React.FC<CartItemsProps> = ({onCreate}) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [currentInventory, setCurrentInventory] = useState('')

    const style = {
        width: '600px',
        margin: '20px',
        padding: '10px',
        border: '3px solid black'
    }

    const onSubmit = () => {
        onCreate({
            name,price, image, description, brand, currentInventory:Number(currentInventory)
        })
        setName('')
        setPrice('')
        setImage('')
        setDescription('')
        setBrand('')
        setCurrentInventory('')
    }

    return (
        <div  style={style}>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
            />
            &nbsp;&nbsp;
            <input
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="price"
            />
            &nbsp;&nbsp;
            <input
                placeholder="image"
                value={image}
                onChange={e => setImage(e.target.value)}
            />            &nbsp;&nbsp;
            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="description"
            />            &nbsp;&nbsp;
            <input
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="brand"
            />            &nbsp;&nbsp;
            <input
                value={currentInventory}
                onChange={e => setCurrentInventory(e.target.value)}
                placeholder="currentInventory"
            />            &nbsp;&nbsp;
            <button onClick={onSubmit} >추가</button>
        </div>
    );
}

export default CreateItems;