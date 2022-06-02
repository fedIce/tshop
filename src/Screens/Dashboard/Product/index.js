import React, { useEffect, useState } from 'react'
import AddForm from './AddForm'
import { Database } from '../../../databse'
import ProductListItem from './ProductListItem'



const data_store = new Database()


const Products = () => {

    const [products, setProducts] = useState(null)
    const [editData, setEditData] = useState(null)
    useEffect(() => {
        (async () => await data_store.getProducts().then(res => {
            setProducts(res)
        }))();
    }, [])

    const updateProducts = async (data) => {
        setProducts(data)
    }

    const handleEdit = (data) => {
        setEditData({
            id: data.id,
            name: data.title,
            image: data.image,
            price: data.price,
            gender: data.gender,
            category: data.categories,
            discount: data.discount_price,
            sizes: data.sizes
        })

    }

    return (
        <div className='flex h-full overflow-auto px-5'>
            <div className='w-[60%] h-full overflow-auto scrollbar-sm pb-[100px]'>
                Products
                <div className='flex flex-col'>
                    {
                        Array.isArray(products) ?
                            products?.map((product, indx) => {
                                return <ProductListItem key={indx} product={product} setProducts={setProducts} handleEdit={handleEdit} />
                            })
                            :
                            <div>{JSON.stringify(products)}</div>
                    }
                </div>
            </div>
            <div className='w-[40%] h-full overflow-auto scrollbar-sm pb-[100px]'>
                <AddForm setProducts={updateProducts} editData={editData} />
            </div>
        </div>
    )
}


export default Products