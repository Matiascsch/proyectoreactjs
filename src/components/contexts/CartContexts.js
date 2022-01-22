import { addDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const { Provider } = CartContext;

const ProviderCart = ({children}) => {
    const [carritoProds, setCarritoProds] = useState([]);
    const [carritoTotal, setCarritoTotal] = useState(0);
    const [carritoPrecio, setCarritoPrecio] = useState(0);

    // Agregar al Carrito
    const addToCart = (articulo) => { // func Agregar un Producto
        const {id , producto, cantidad} = articulo;
        const {title} = producto;
        const exist = carritoProds.findIndex((i)=> i.id === id)
       
        if(exist > -1){
            toast.error(`El Producto ${title} ya esta en el Carrito!`);
            console.log(carritoProds)
        }else{
            toast.success(`${cantidad} ${title} Agregado/s al Carrito!`);
            setCarritoProds([...carritoProds, articulo])
        }
        carritoTotalProds();
    }   
    
    const carritoTotalProds = () =>{  //func Cantidad de Productos en el Carrito)
        setCarritoTotal(carritoProds.reduce((acum,i)=> acum + i.cantidad, 0));
    }

    const removeToCart = (item) => { // func Eliminar un Producto del Carrito
        setCarritoProds(carritoProds.filter(prod => prod.id !== item.id));
        toast.error(`Has eliminado ${item.producto.title}`);
    }

    const clearCart = () => { // func Vaciar el Carrito
        if(carritoProds.length !== 0){
            setCarritoProds([]);
            setCarritoTotal(0);
            toast.success("Has Vaciado El Carrito")
        }else{
            toast.error("El Carrito ya esta Vacio!")
        }
    }

    const updatePriceTotal = () => {
        setCarritoPrecio(carritoProds.reduce((acum, i) => acum + ((i.producto.price/i.producto.initial) * i.cantidad), 0))
    }

    const confirmBuy = (user, producto) => { // Confirmar Pedido, mandar a Firebase
        const usuario = {
            nombre : user.name,
            email : user.eamil,
            telefono : user.tel
        }
        const operacion = {
            buyer : usuario, 
            producto : producto,
            cantidad : producto.cantidad
        };

        addDoc("ventas", operacion);
    }
    
    // Lo que Quiero Exportar en CartContext
    const cartValues = {carritoProds, carritoTotal, carritoPrecio,  carritoTotalProds, addToCart, removeToCart, clearCart, updatePriceTotal};

    return (
        <Provider value={cartValues}>
            {children}
        </Provider>
    )
}

export default ProviderCart;