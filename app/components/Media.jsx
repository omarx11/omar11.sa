import Link from 'next/link'
import Image from 'next/image'

export default function Media() {
  return (
    <div className='flex flex-row gap-3 relative left-1 select-none drag-none'>
      <li className='dark:bg-[var(--tertiary-background-color)] p-[6px] rounded-full'>
        <Link href="mailto:mail@omar11.sa">
          <Image
            src="./icons/email.svg"
            width={20}
            height={20}
            className='select-none drag-none'
            alt="Email" />
        </Link>
      </li>
      <li className='dark:bg-[var(--tertiary-background-color)] p-[6px] rounded-full'>
        <Link href="https://twitter.com/dis_x0">
          <Image
            src="./icons/Twitter.svg"
            width={20}
            height={20}
            className='select-none drag-none'
            alt="Twitter" />
        </Link>
      </li>
      <li className='dark:bg-[var(--tertiary-background-color)] p-[6px] rounded-full'>
        <Link href="https://discordredirect.discordsafe.com/users/582305812903493663">
          <Image
            src="./icons/discord.svg"
            width={20}
            height={20}
            className='select-none drag-none'
            alt="Discord" />
        </Link>
      </li>
      <li className='dark:bg-[var(--tertiary-background-color)] p-[6px] rounded-full'>
        <Link href="https://github.com/omarx11">
          <Image
            src="./icons/github.svg"
            width={20}
            height={20}
            className='select-none drag-none'
            alt="Github" />
        </Link>
      </li>
    </div>
  )
}
