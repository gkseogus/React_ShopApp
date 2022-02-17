import React, { useState } from 'react';
import { InventoryCreate } from '../../store/inventory/types';

interface CartItemsProps {
    onCreate: (data:InventoryCreate) => void
}

const CreateItems:React.FC<CartItemsProps> = ({onCreate}) => {

    // 여러 state를 한 곳에 모아 보관
    const [inputData, setInputData] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        currentInventory: '',
    });

    // file 타입인 input의 상태만 따로 보관
    const [FileImage, setImage] = useState('')

    // 각 원본 상태를 복사한 뒤 그 상태를 target.value값으로 업데이트
    const changeInput = (e: any) => {
        setInputData({
            ...inputData,
            // 각 input의 name을 조회
            [e.target.name]: e.target.value
        })
    }

    const style = {
        width: '600px',
        margin: '20px',
        padding: '10px',
        border: '3px solid black'
    }
    
    // return 되기 전 onSubmit으로 아래 코드 실행
    const onSubmit = () => {
        // name, price 값이 없을 시 
        if( !inputData.name || !inputData.price ) {
            return alert("이름과 가격은 필수 기입")
        }
        else {
            console.log('inputData Check:',inputData)
        }

        // 데이터를 한번에 모아서 전송
        onCreate({
            name:String(inputData.name),price:String(inputData.price), image:String(FileImage), description:String(inputData.description),
            brand:String(inputData.brand), currentInventory:Number(inputData.currentInventory)
        })
    }

    const handleSubmit = async (e:any) => {
        // form이 실행됨과 동시에 초기화면으로 돌아오는 것(새로고침과 유사)을 막음
        e.preventDefault();
    }

    // input reset
    const handleClear = () => { 
        setInputData({
            ...inputData, name: "", price: "", description: "", brand: "", currentInventory: ""
        })
    };

    // onChange으로 input값의 내용 변경 감지, 감지하면 changeInput 함수가 실행 
    return (
        <div  style={style}>
            <form onSubmit={handleSubmit}>
            <label>
                ItemName:
            <input  name="name"
                value={inputData.name}
                onChange={changeInput}
                placeholder="name"
            />
            <br/>
            </label>
            &nbsp;&nbsp;
            <label>
                ItemPrice:
            <input  name="price"
                value={inputData.price}
                onChange={changeInput}
                placeholder="price"
            />
            &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemFile:
            <input
                type='file'
                accept="image/png, image/jpeg"
                placeholder="imageFile"
                //@ts-ignore
                // 파일객체(e.target.files[0])를 새로운 url로 바꾸어 image File로 띄우기
                onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} // ignore로 인해 코드오류 무시
            />     
            &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemDescription:              
            <input  name="description"
                value={inputData.description}
                onChange={changeInput}
                placeholder="description"
            />           
             &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemBrand:  
            <input  name="brand"
                value={inputData.brand}
                onChange={changeInput}
                placeholder="brand"
            />           
             &nbsp;&nbsp;
            <br/>
            </label>
            <label>
                ItemCurrentInventory:  
            <input  name="currentInventory"
                value={inputData.currentInventory}
                onChange={changeInput}
                placeholder="currentInventory"
            />           
             &nbsp;&nbsp;
            <br/>
            </label>
            <button onClick={onSubmit} >추가</button>
            <button onClick={handleClear} >리셋</button>
            </form>
        </div>
    );
}

export default CreateItems;