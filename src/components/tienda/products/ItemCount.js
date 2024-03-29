// CONTADOR DE PRODUCTOS
import { useEffect, useState } from "react";

const ItemCount = ({ stock , initial ,OnAdd }) => {
    
    const [contador, setContador] = useState(initial);

    useEffect(()=> {
        OnAdd(contador)                    
    })

    const aumentarCant = () =>{
        if (contador < stock) {
            setContador(contador + initial);
        }
    }

    const disminuirCant = () =>{
        if (contador > initial){
            setContador(contador - initial);
        }
    }

    return(
        <div className="contador">
            <p>Cantidad: {contador}</p>
            
            <div className="btnAumDis">
                <button onClick={aumentarCant}>+</button>
                <button onClick={disminuirCant}>-</button>
            </div>
        </div>
    );
}


export default ItemCount;