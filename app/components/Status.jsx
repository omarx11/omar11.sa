import Image from 'next/image'
import Media from './Media'

export default function Status() {
  return (<>
  <li>
    <div className='flex justify-center'>
      <Image
        src="/icons/location.svg"
        width={22}
        height={22}
        className="select-none drag-none w-[22px] h-[22px]"
        alt="location-icon" />
      <p className='text-[0.948rem]'>Not connected to the internet</p>
    </div>
  </li>
  <li>
    <div className='flex justify-center'>
      <p className='text-[0.948rem]'>-------------------</p>
    </div>
  </li>
  <li>
    <div className='flex border-2'>
      <Image
        src="/icons/location-pin.svg"
        width={22}
        height={22}
        className='select-none drag-none w-[22px] h-[22px]'
        alt="location-icon" />
      <p className='text-[0.948rem]'>Saudi Arabia / Buraydah</p>
    </div>
  </li>
  <Media /></>
  )
}
