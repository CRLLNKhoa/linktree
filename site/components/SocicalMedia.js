import Link from 'next/link'
import React from 'react'

export default function SocicalMedia({data}) {
    const {facebook,instagarm, youtube, linkedin, github, twitter} = data
  return (
    <div className='flex flex-col gap-4'>
        <div className='bg-white w-12 h-12 p-2 flex justify-center items-center rounded-full'>
            <Link target="_blank" href={`https://facebook.com/${facebook}`}>
                <img className='w-6 h-6' src="/svg/fb.svg" alt=""/>
            </Link>
        </div>
        <div className='bg-white w-12 h-12 p-2 flex justify-center items-center rounded-full'>
        <Link target="_blank" href={`https://instagram.com/${instagarm}`}>
            <img className='w-6 h-6' src="/svg/ig.svg" alt=""/>
        </Link>
    </div>
    <div className='bg-white w-12 h-12 p-2 flex justify-center items-center rounded-full'>
        <Link target="_blank" href={`https://youtube.com/${youtube}`}>
            <img className='w-6 h-6' src="/svg/ytb.svg" alt=""/>
        </Link>
    </div>
    <div className='bg-white w-12 h-12 p-2 flex justify-center items-center rounded-full'>
        <Link target="_blank" href={`https://linkedin.com/${linkedin}`}>
            <img className='w-6 h-6' src="/svg/in.svg" alt=""/>
        </Link>
    </div>
    <div className='bg-white w-12 h-12 p-2 flex justify-center items-center rounded-full'>
        <Link target="_blank" href={`https://github.com/${github}`}>
            <img className='w-6 h-6' src="/svg/github.svg" alt=""/>
        </Link>
    </div>
    <div className='bg-white w-12 h-12 p-2 flex justify-center items-center rounded-full'>
        <Link target="_blank" href={`https://twitter.com/${twitter}`}>
            <img className='w-6 h-6' src="/svg/tw.svg" alt=""/>
        </Link>
    </div>
    </div>
  )
}
