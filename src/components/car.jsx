
import { useEffect, useState } from 'react';
import styleCar from './../css/car.module.css';

export function Car(){

    const [products,setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        async function getProducts(){
            let data = await fetch('https://blackisp.herokuapp.com/products');
            data = await data.json();
            setProducts(data);
            let total = 0;
            data.forEach(el => {
                total += +el.price;
            });
            setTotalPrice(total);
        }
        getProducts();
    },[])

    function formatPrice(price){
        let aux = (""+price).split("");
        aux.splice(aux.length-3,0,",");
        aux.unshift("$");
        return aux.join("");
    }

    return <div id={styleCar.container}>
        <header id={styleCar.header}>
            <p>RESUMEN DE LA ORDEN</p>
        </header>
        <main id={styleCar.main}>
            {
                (products.length > 0)?
                    products.map(el=>{
                        return <article className={styleCar.product}>
                            <img src={el.image}></img>
                            <p className={styleCar.name}>{el.name}</p>
                            <p className={styleCar.price}>{formatPrice(el.price)}.<span className={styleCar.min}>00</span></p>
                        </article>
                    })
                    :
                    null
            }
        </main>
        <input type="button" value="Editar" id={styleCar.button}></input>
        <div id={styleCar.preview}>
            <p>SUBTOTAL</p>
            <p className={styleCar.price}>{formatPrice(totalPrice)}.<span className={styleCar.min}>00</span></p>
            <p>ENVIO</p>
            <p>A calcular</p>
        </div>
        <footer id={styleCar.footer}>
            <p>TOTAL</p>
            <p>{formatPrice(totalPrice)}.<span className={styleCar.min}>00</span></p>
        </footer>
    </div>
}

export default Car;