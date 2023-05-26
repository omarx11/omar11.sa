import Image from 'next/image'
import { rgbDataURL } from './Tools'

export default function About() {
  return (
    <>
      <Image
        src="/avatar.jpeg"
        width={128}
        height={128}
        placeholder="blur"
        blurDataURL={rgbDataURL(237, 181, 6)}
        className='w-32 h-32 rounded-full object-cover bg-cover select-none drag-none'
        alt="my-avatar" />
      <div className='flex flex-col gap-2 ml-6'>
        <h1 className='items-center text-2xl font-bold'>
          Hey there, this is a test
          <Image
            src="/icons/1f44b-1f3fb.svg"
            width={24}
            height={24}
            className='absolute inline-block animate-wave origin-[70%_70%] ml-2 pt-[2px] select-none drag-none'
            alt="wave-icon" />
        </h1>
        <p className='font-normal text-[1.1rem] leading-[1.4rem]'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore vel odit itaque sunt quaerat aperiam fugiat dolor consequatur, unde mollitia.
        </p>
      </div>
    </>
  )
}
