import Image from 'next/image'
import avatarImg from 'public/avatar.jpg'
import React from 'react'

const Avatar = () => {
  return (
    <Image
      src={avatarImg}
      className='rounded-full object-cover bg-cover select-none'
      width={128}
      height={128}
      alt="/" />
  )
}

export default Avatar