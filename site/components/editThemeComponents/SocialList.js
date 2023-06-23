import React from 'react'

export default function SocialList() {
  return (
    <div className='flex gap-4'>
        <div className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:-translate-y-2 duration-500'>
            <img className='w-5 h-5' src="/svg/fb.svg" alt=""/>
        </div>
        <div className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:-translate-y-2 duration-500'>
            <img className='w-5 h-5' src="/svg/ig.svg" alt=""/>
        </div>
        <div className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:-translate-y-2 duration-500'>
            <img className='w-5 h-5' src="/svg/ytb.svg" alt=""/>
        </div>
        <div className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:-translate-y-2 duration-500'>
            <img className='w-5 h-5' src="/svg/github.svg" alt=""/>
        </div>
        <div className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:-translate-y-2 duration-500'>
            <img className='w-5 h-5' src="/svg/in.svg" alt=""/>
        </div>
        <div className='bg-white p-2 rounded-full cursor-pointer shadow-md hover:-translate-y-2 duration-500'>
            <img className='w-5 h-5' src="/svg/tw.svg" alt=""/>
        </div>
    </div>
  )
}
