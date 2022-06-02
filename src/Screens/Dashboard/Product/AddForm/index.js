import React, { useEffect, useState } from 'react'
import DashboardFormField from '../../DashboardComponents/DashboardFormField'
import { DashboardFormDropDownList } from '../../DashboardFormFieldDropList'
import { Database } from '../../../../databse'
import { ReactComponent as Loader } from '../../../../assets/spinner.svg'
import { PlusIcon } from '@heroicons/react/outline'

const data_store = new Database()
const genderCategory = data_store.getGender()
const productCategory = data_store.getCategories()
const productSizes = data_store.getSizes()


const AddForm = ({ setProducts, editData }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [gender, setGender] = useState(genderCategory[0])
    const [category, setCategory] = useState(productCategory[0])
    const [discount, setDiscount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [sizes, setSizes] = useState([])
    const [editMode, setEditMode] = useState(false)


    const handleOnSave = () => {

        const data = {
            image: image,
            title: name,
            price: parseFloat(price),
            gender: gender.value,
            categories: [category.value],
            created_at: new Date(),
            sizes: sizes
        }


        if (discount > 0) {
            data['discount_price'] = parseFloat(discount)
        }

        setLoading(true)
        if (editMode) {
            const id = editData.id
            data_store.updateProduct(id, data).then(async () => {
                const pd = await data_store.getProducts()
                setProducts(pd)
                setLoading(false)

            })
        } else {
            data_store.addProduct(data)
            setTimeout(() => {
                setLoading(false)
                setProducts(data_store.products)
            }, 3000)
        }
    }


    useEffect(() => {
        if (editData) {
            setImage(editData.image)
            setName(editData.name)
            setPrice(editData.price)
            setGender(genderCategory.filter(i => i.value.toLowerCase() === editData.gender.toLowerCase())[0])
            setCategory(productCategory.filter(i => editData.category.includes(i.value.toLowerCase()))[0])
            setDiscount(editData.discount? editData.discount : 0)
            setSizes(editData.sizes)

            setEditMode(true)
        }
    }, [editData])


    return (
        <div className='w-full'>
            <DashboardFormField name="Product Name" placeholder="Example product" text={name} setText={setName} />
            <DashboardFormField name="Product Price" placeholder="0.00" text={price} setText={setPrice} />
            <DashboardFormField name="Product Image URL" placeholder="http://" text={image} setText={setImage} />
            <AddSizes sizes={sizes} setSizes={setSizes} />
            <DashboardFormField name="Product Discount" placeholder="0.00" text={discount} setText={setDiscount} />
            <DashboardFormDropDownList list={genderCategory} selectedInterval={gender} setSelectedInterval={setGender} name="Gender" />
            <DashboardFormDropDownList list={productCategory} selectedInterval={category} setSelectedInterval={setCategory} name="Product Category" />
            <div onClick={() => handleOnSave()} className={`w-auto h-12 cursor-pointer flex justify-center items-center rounded-xl  mx-2 my-4 space-x-2  ${loading ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-500'}`}>
                {loading && <Loader className='w-4 h-4 animate-spin' />}
                <span className="font-medium text-white cursor-pointer">Save</span>
            </div>
        </div>
    )
}


const AddSizes = ({ sizes, setSizes }) => {
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState('')
    const [size, setSize] = useState(productSizes[0])

    const addSize = () => {
        setSizes([...sizes, { size: size.value, colors: [color] }])
        setOpen(!open)
    }

    return (
        <div className='p-5'>
            <div className='flex space-x-4 w-full overflow-x-auto scrollbar-sm'>
                {
                    sizes.map((s, i) => {
                        return (
                            <div key={i} className='w-auto min-w-fit h-20 px-3 rounded-xl flex flex-col flex-wrap justify-center items-center border-2 border-dashed'>
                                <span>Size: {s.size}</span>
                                <span>color: {s.colors} </span>
                            </div>
                        )
                    })
                }
                <div onClick={() => setOpen(true)} className='w-auto h-20 px-3 rounded-xl flex flex-col justify-center items-center border-2 border-dashed'>
                    <span><PlusIcon className='w-5 h-5' /></span>
                    <span>Add Size </span>
                </div>
            </div>
            {
                open &&
                <div>
                    <DashboardFormField name="Product Color" placeholder="red" text={color} setText={setColor} />
                    <DashboardFormDropDownList list={productSizes} selectedInterval={size} setSelectedInterval={setSize} name="Product Size" />
                    <div onClick={() => addSize()} className='w-auto h-10 bg-green-400 text-white font-semibold flex justify-center items-center rounded-xl'>
                        Add Size
                    </div>
                </div>
            }
        </div>
    )
}




export default AddForm