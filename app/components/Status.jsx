import React from 'react'
import Image from 'next/image'
import Media from './Media'

const Status = () => {
  return (<>
  <li>
    <div className='flex justify-center'>
      <Image
        src="./icons/location.svg"
        className='select-none drag-none'
        width={22}
        height={22}
        alt="Location" />
      <p className='text-[0.948rem]'>Not connected to the internet</p>
    </div>
  </li>
  <li>
    <div className='flex justify-center'>
      <p className='text-[0.948rem]'>-------------------</p>
    </div>
  </li>
  <li>
    <div className='flex justify-center'>
      <Image
        src="./icons/location.svg"
        className='select-none drag-none'
        width={22}
        height={22}
        alt="Location" />
      <p className='text-[0.948rem]'>Saudi Arabia / Buraydah</p>
    </div>
  </li>
  <Media /></>
  )
}

export default Status