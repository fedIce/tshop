import { CheckIcon, CreditCardIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import DashboardFormField from '../../../Dashboard/DashboardComponents/DashboardFormField'
import { ReactComponent as Loader } from '../../../../assets/spinner.svg'
import { numberWithCommas, User } from '../../../../databse'
import { useAuth } from '../../../../GlobalContexts/AuthProvider'
import { Link } from 'react-router-dom'

const user = new User()

const CheckOut = ({ total }) => {
    const [card_num, setCardNum] = useState('')
    const [card_date, setCardDate] = useState('')
    const [card_cvv, setCardCvv] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editPersonalDetails, setEditPersonalDetails] = useState(false)
    const [editAddress, setEditAddress] = useState(false)

    const auth = useAuth();
    const userIsAvailable = auth.user !== null
    const userData = auth.user_data

    useEffect(() => {
        if (card_num !== '' && card_cvv.length === 3 && card_date !== '' && userData?.address && userData?.firstname) {
            setReady(true)
        } else {
            setReady(false)
        }
    }, [card_cvv, card_date, card_num, userData])

    const handleCheckout = () => {
        const data = {
            email: userData.email,
            amount: total
        }
        if (!(ready && !loading)) return
        setLoading(true)
        setTimeout(async () => {
            const url = await user.makePayment(data)
            window.location = url.authorization_url
            setLoading(false)
        }, 2000)
    }

    const updateAddress = () => {
        if (!userData) return
        const data = {
            address: address,
        }
        console.log(data)
        auth.setUserData({ ...userData, ...data })
        user.update_user(userData.id, data)
        setEditAddress(!editAddress)
    }

    const updatePerson = () => {
        if (!userData) return
        const data = {
            firstname: name.split(" ")[0],
            lastname: name.split(" ")[name.split(" ").length - 1],
            phone: phone
        }
        console.log(data)
        auth.setUserData({ ...userData, ...data })
        user.update_user(userData.id, data)
        setEditPersonalDetails(!editPersonalDetails)
    }



    return (
        <div className='flex flex-col space-y-4'>
            <div className='border-2 rounded w-full h-fit'>
                <div className='px-5 py-3  flex items-center justify-start'>
                    <div className='mr-4 w-5 h-5 flex items-center justify-center border-2 border-gray-200 rounded-full'>a</div>
                    <div className='flex flex-col text-sm font-medium'>
                        <div className='flex items-center space-x-4'>
                            <span className='font-bold'>LOGIN</span>
                            {userIsAvailable && <span><CheckIcon className='w-3 h-3' /></span>}
                        </div>
                        {
                            userIsAvailable ?
                                <div className='flex items-center space-x-4 text-xs '>
                                    <span>{userData?.firstname} {userData?.lastname} - {userData?.email}</span>
                                    <span>{userData?.phone}</span>
                                </div>
                                :
                                <div className='flex items-center space-x-4 text-xs '>
                                    <span className='text-gray-400'>No User Available</span>
                                </div>
                        }
                    </div>
                    <div className='flex ml-auto items-center py-2 px-3 rounded bg-gray-100 text-sm font-medium'>
                        {(!editPersonalDetails && auth.user) && <span onClick={() => setEditPersonalDetails(!editPersonalDetails)}>CHANGE</span>}
                        {(editPersonalDetails && auth.user) && <span onClick={() => updatePerson()}>DONE</span>}
                        {(!auth.user) && <Link to="/signin" >Login To Continue</Link>}

                    </div>
                </div>
                {
                    editPersonalDetails &&
                    <div>
                        <DashboardFormField name="Full Name" placeholder="John Micheal Doe" setText={setName} text={name} />
                        <DashboardFormField name="Phone Number" placeholder="+00 000 0000 000" mode="tel" setText={setPhone} text={phone} />
                    </div>
                }
            </div>
            <div className='border-2 rounded w-full'>
                <div className='px-5 py-3 flex items-center  justify-start'>
                    <div className='mr-4 w-5 h-5 flex items-center justify-center border-2 border-gray-200 rounded-full'>b</div>
                    <div className='flex flex-col text-sm font-medium'>
                        <div className='flex items-center space-x-4'>
                            <span className='font-bold'>SHIPPING ADDRESS</span>
                            {userData?.address && <span><CheckIcon className='w-3 h-3' /></span>}
                        </div>
                        <div className='flex items-center space-x-4 text-xs w-[70%]'>
                            <span>{userData?.address}</span>
                            {!userData?.address && <span className='text-gray-400'>No Address</span>}

                        </div>
                    </div>
                    <div className='flex ml-auto items-center py-2 px-3 rounded bg-gray-100 text-sm font-medium'>
                        {(!editAddress && auth.user) && <span onClick={() => setEditAddress(!editAddress)}>CHANGE</span>}
                        {(editAddress && auth.user) && <span onClick={() => updateAddress()}>DONE</span>}
                        {(!auth.user) && <Link to="/signin" >Login To Continue</Link>}
                    </div>
                </div>
                {
                    editAddress &&
                    <div>
                        <DashboardFormField name="Shipping Address" placeholder="Near East University, North Cyprus" setText={setAddress} text={address} />
                    </div>
                }
            </div>
            <div className='px-5 py-3 border-2 flex items-center rounded justify-start bg-gray-200'>
                <div className='mr-4 w-5 h-5 flex items-center justify-center border-2 text-white bg-black border-gray-200 rounded-full'>c</div>
                <div className='flex flex-col text-sm font-medium'>
                    <div className='flex items-center space-x-4'>
                        <span className='font-bold'>PAYMENT METHOD</span>
                        {!auth.user && <span className='font-light'>(Login To Continue)</span>}
                    </div>
                </div>
            </div>
            {
                auth.user &&
                <div>
                    <div className='px-5 py-3 flex items-center rounded justify-start'>
                        <div className='mr-4 w-5 h-5 flex items-center justify-center border-2 text-white bg-black border-gray-200 rounded-full'></div>
                        <div className='flex flex-col text-sm font-medium'>
                            <div className='flex items-center space-x-4'>
                                <span className='w-16 h-16 flex items-center justify-center border-2 rounded-xl'><CreditCardIcon className='w-10 h-10' /></span>
                                <span className='font-medium'>Credit / Debit Card Payment</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[60%]'>
                        <DashboardFormField name="Card Number *" placeholder="0000 0000 0000 0000" mode="numeric" setText={setCardNum} text={card_num} />
                        <div className='flex items-center space-x-4'>
                            <DashboardFormField name="Card Date *" placeholder="01/01/2022" setText={setCardDate} text={card_date} />
                            <DashboardFormField name="CVV *" setText={setCardCvv} placeholder="123" mode="numeric" max={3} text={card_cvv} />
                        </div>
                        <div onClick={() => handleCheckout()} className={`w-auto ${(ready && !loading) ? "bg-black cursor-pointer hover:bg-gray-900" : "bg-gray-300 cursor-not-allowed"} space-x-2 font-bold text-md p-4 text-white rounded-xl flex items-center justify-center`}>
                            {loading && <Loader className='w-5 h-5 animate-spin' />}
                            <span>Pay</span>
                            <span>₦{numberWithCommas(total)}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CheckOut