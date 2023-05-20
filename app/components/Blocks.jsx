import Link from 'next/link';

export default function Blocks() {
	return (<>
		<li>
			<Link href="/server" className='px-1 border-2 border-gray-600'>Server</Link>
		</li>
		<li>
			<Link href="/client" className='px-1 border-2 border-gray-600'>Client</Link>
		</li>
		<li>
			<Link href="#" className='px-1 border-2 border-gray-600'>test</Link>
		</li></>
	)
}