import Link from 'next/link'

export default function Footer() {
  return (<>
    <div>
      <Link
        href="https://omar11.sa"
        className="text-[var(--main-text-color)] hover:underline underline-offset-4">
          omar11.sa
      </Link>
      <p className="inline-block text-[var(--secondary-text-color)] text-[0.8rem]">
        &#160;- 2023 © Omar Abdulaziz
      </p>
    </div>
    <div>
      <Link
        href="https://github.com/omarx11/omar11.sa"
        className="text-[var(--main-text-color)] hover:underline underline-offset-4">
          source
      </Link>
      <span className="text-[var(--secondary-text-color)]"> • </span>
      <Link
        href="https://github.com/omarx11/omar11.sa"
        className="text-[var(--main-text-color)] hover:underline underline-offset-4">
          RSS
      </Link>
    </div>
  </>
  )
}
