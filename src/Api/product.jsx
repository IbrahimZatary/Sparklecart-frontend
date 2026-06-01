import axios from "axios"
// for ttest
import { useState, useEffect } from "react"

 export default function Product() {

    const [product, SetProduct] = useState([]);

    const getProducts = async () => {
        try {
             
            const { data, status } = await axios.get(
                'https://localhost:7161/api/product'
            );

            SetProduct(data);

            console.log("the status is :", status);

        } catch (error) {

            console.log("there is an error", error);

        }
    }

    useEffect(() => {
        const fn = async ()=> {
            await getProducts();
        }

        fn();
    }, [])

     return (
        <>
            <h2>The products are :</h2>

            {product.map((el) => {
                return (
                    <h3 key={el.id}>
                        {el.name} - {el.quantity}
                    </h3>
                )
            })}
        </>
     )
 }