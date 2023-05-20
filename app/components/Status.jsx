import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const Status = () => {
  return (<>
  <li>
    <status className='flex justify-center'>
      <Image
        src="./icons/location.svg"
        width={22}
        height={22}
        alt="Location" />
      <p className='text-[0.948rem]'>Not connected to the internet</p>
    </status>
  </li>
  <li>
    <status className='flex justify-center'>
      <Image
        src="./icons/location.svg"
        width={22}
        height={22}
        alt="Location" />
      <p className='text-[0.948rem]'>Saudi Arabia / Qassim / Buraydah</p>
    </status>
  </li>
  <li>
    <status className='flex justify-center'>
      <Image
        src="./icons/location.svg"
        width={22}
        height={22}
        alt="Location" />
      <p className='text-[0.948rem]'>Saudi Arabia / Qassim / Buraydah</p>
    </status>
  </li>
  <div className='flex flex-row gap-3 relative left-1'>
    <li className='border-2 border-gray-700 p-1'>
      <Link href="mailto:mail@omar11.sa">
        <Image
          src="./icons/email.svg"
          width={22}
          height={22}
          alt="Email" />
      </Link>
    </li>
    <li className='border-2 border-gray-700 p-1'>
      <Link href="https://discordredirect.discordsafe.com/users/582305812903493663">
        <Image
          src="./icons/discord.svg"
          width={22}
          height={22}
          alt="Discord" />
      </Link>
    </li>
    <li className='border-2 border-gray-700 p-1'>
      <Link href="https://twitter.com/dis_x0">
        <Image
          src="./icons/Twitter.svg"
          width={22}
          height={22}
          alt="Twitter" />
      </Link>
    </li>
    <li className='border-2 border-gray-700 p-1'>
      <Link href="https://github.com/omarx11">
        <Image
          src="./icons/github.svg"
          width={22}
          height={22}
          alt="Github" />
      </Link>
    </li>
  </div></>
  )
}

export default Status