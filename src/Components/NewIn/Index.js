import React, { useEffect, useState } from 'react'
import { Database } from '../../databse'
import { useGenderSwitch } from '../../GlobalContexts/GenderSwitch'
import PCard1 from '../ProductCards/PCard1'

const database = new Database()
const NewIn = ({ category }) => {
    const gender = useGenderSwitch()
    const [newIn, setNewIn] = useState(null)

    useEffect(() => {
        (async () => {
            const nIn = await database.loadStoreFront(gender.gender)
            setNewIn(nIn)
        })();
    }, [gender.gender])
    return (
        <div className='mt-10'>
            <div className='title-text my-5'>New In {category}</div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-y-4'>
                {
                    newIn?.map((item, key) => {
                        return <PCard1 id={item.id} title={item.title} image={item.image} price={item.price} discount_price={item.discount_price} key={key} />
                    })
                }
            </div>
        </div>
    )
}

export default NewIn