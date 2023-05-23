import Link from 'next/link'
import Image from 'next/image'

export default function Blocks() {
	return (<>
		<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
			<Link href="#" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Projects
				<Image
					src="/icons/project.svg"
					width={20}
					height={20}
					alt="project-icon" />
			</Link>
		</li>
		
		<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
			<Link href="#" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Minecraft
				<Image
					src="/icons/minecraft_94415.svg"
					width={20}
					height={20}
					alt="minecraft-icon" />
			</Link>
		</li></>
	)
}