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

    // return 되기 전 onSubmit으로 아래 코드 실행
    const onSubmit = () => {
        // name, price 값이 없을 시 
        if( !name || !price ) {
            return alert("이름과 가격은 필수 기입")
        }

        // 데이터를 한번에 모아서 전송
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

     // form이 실행됨과 동시에 초기화면으로 돌아오는 것(새로고침과 유사)을 막음
    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    // onChange으로 input값의 내용 변경 감지
    return (
        <div  style={style}>
            <form onSubmit={handleSubmit}>
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
                type='file'
                accept="image/png, image/jpeg"
                placeholder="image"
                //@ts-ignore
                onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} // ignore로 인해 코드오류 무시
            />       
            <input
                placeholder="image"
                value={image}
                onChange={e => setImage(e.target.value)}
            />       
            &nbsp;&nbsp;
            <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="description"
            />           
             &nbsp;&nbsp;
            <input
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="brand"
            />           
             &nbsp;&nbsp;
            <input
                value={currentInventory}
                onChange={e => setCurrentInventory(e.target.value)}
                placeholder="currentInventory"
            />           
             &nbsp;&nbsp;
            <button onClick={onSubmit} >추가</button>
            </form>
        </div>
    );
}

export default CreateItems;