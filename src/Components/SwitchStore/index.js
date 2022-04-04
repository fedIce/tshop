import {  } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useGenderSwitch } from '../../GlobalContexts/GenderSwitch'

const SwitchStore = () => {
    const gender = useGenderSwitch()

  return (
    <div className='h-[70%] w-auto p-1 bg-gray-200 rounded-xl flex items-center justify-between'>
        <div onClick={() => gender.toggleGender('male')} className={`w-auto cursor-pointer h-full flex items-center font-normal p-2 rounded-xl justify-start ${gender.gender === 'male' && 'bg-blue-400 text-white font-medium'}`}>
            <span className='text-md mx-1'>👨🏾‍🦰</span>
            <span className='text-md mx-1'>Male</span>
        </div>
        <div onClick={() => gender.toggleGender('female')} className={`w-auto cursor-pointer h-full flex items-center font-normal p-2 rounded-xl justify-start ${gender.gender === 'female' && 'bg-pink-400 text-white font-medium'}`}>
            <span className='text-md mx-1 '>👩🏽‍🦱</span>
            <span className='text-md mx-1 '>Female</span>
        </div>
    </div>
  )
}

export default SwitchStore