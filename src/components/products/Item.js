import React from "react";

const Item = ({ producto }) =>{
    const { title , price , imgURL } = producto;
    
    return (
        <div className="item">
            <img src={imgURL} alt="Foto de Producto"/> 

            <div className="infoItem">
                <h2>{title}</h2>

                <p>${price}</p>  
            </div>
        </div>
    );
}

export default Item;