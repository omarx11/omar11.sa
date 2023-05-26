import Link from 'next/link'

export default function Footer() {
  return (<>
    <div>
      <Link
        className="text-gray-200 border-b-[1px] border-gray-400"
        href="https://omar11.sa">omar11.sa
      </Link>
      <p className="inline-block text-gray-400">&#160;- 2023 © Omar Abdulaziz</p>
    </div>
    <div>
      {/* source link and RSS feed */}
      <Link
        className="text-gray-200"
        href="https://github.com/omarx11/omar11.sa">src
      </Link>
      <span className="text-gray-400"> • </span>
      <Link
        className="text-gray-200"
        href="https://github.com/omarx11/omar11.sa">RSS
      </Link>
    </div>
  </>
  )
}
