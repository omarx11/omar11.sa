import Link from 'next/link'
import Image from 'next/image'

export default function Blocks() {
	return (<>
		<li>
			<Link href="/server" className='bg-[var(--tertiary-background-color)] p-[6px] rounded-[5px]'>my projects</Link>
			<Image
        src="/icons/project.svg"
				className="inline-block"
        width={20}
        height={20}
        alt="/" />
		</li>
		<li>
			<Link href="/client" className='hover:bg-[var(--tertiary-background-color)] p-[6px] rounded-[5px]'>GitHub</Link>
		</li>
		<li>
			<Link href="#">test 123</Link>
		</li></>
	)
}