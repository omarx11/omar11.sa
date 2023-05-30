import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-between pt-4 pb-12 text-sm">
      <div className="flex flex-row items-center">
        <Link href="https://omar11.sa" className="text-[var(--main-text-color)] hover:underline underline-offset-4">omar11.sa</Link>
        <p className="text-[var(--secondary-text-color)] text-[0.8rem]">
          &#160;- 2023 © Omar Abdulaziz
        </p>
      </div>
      <div className="flex flex-row items-center gap-1">
        <Link href="https://github.com/omarx11/omar11.sa" className="text-[var(--main-text-color)] hover:underline underline-offset-4">source</Link>
        <span className="text-[var(--secondary-text-color)]">•</span>
        <Link href="https://github.com/omarx11/omar11.sa" className="text-[var(--main-text-color)] hover:underline underline-offset-4">RSS</Link>
        <span className="text-[var(--secondary-text-color)]">•</span>
        <Link href="https://omar11.sa" className="text-[var(--main-text-color)] hover:underline underline-offset-4">
          <Image
            src="/icons/license.svg"
            width={16}
            height={16}
            className="select-none drag-none"
            alt="license-icon" />
        </Link>
      </div>
    </footer>
  )
}
