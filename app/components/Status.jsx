import Image from 'next/image'
import Media from './Media'

export default function Status() {
  return (
    <>
      <li>
        <div className='flex items-start'>
          <Image
            src=""
            width={22}
            height={22}
            className="select-none drag-none"
            alt="" />
          <p className='text-lg'>Not connected to the internet</p>
        </div>
      </li>
      <li>
        <div className='flex justify-center'>
          <p>-----------------------------</p>
        </div>
        <br />
        <br />
        <p>-----------------------------</p>
      </li>
      <li>
        <div className='flex items-start'>
          <Image
            src="/icons/location.svg"
            width={20}
            height={20}
            className='select-none drag-none w-[20px] h-[20px]'
            alt="location-icon" />
          <p className="ml-1">Saudi Arabia / Buraydah</p>
        </div>
      </li>
      <Media />
    </>
  )
}
