import Link from 'next/link'

export default function Blocks() {
	return (<>
		<li>
			<Link href="/server" className='bg-[var(--tertiary-background-color)] p-[6px] rounded-[5px]'>my projects</Link>
		</li>
		<li>
			<Link href="/client" className='bg-[var(--tertiary-background-color)] p-[6px] rounded-[5px]'>GitHub</Link>
		</li>
		<li>
			<Link href="#" className='p-[6px] border-2 border-gray-600'>test</Link>
		</li></>
	)
}