import Link from 'next/link'
import Image from 'next/image'

export default function Blocks() {
	return (
		<>
			<li className="bg-[var(--tertiary-background-color)] rounded-[5px] group cursor-pointer border active:bg-blue-50 focus:bg-pink-300 focus:border-pink-500">
				<Link href="./" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Projects
					<Image
						src="/icons/project.svg"
						width={20}
						height={20}
						className="select-none drag-none"
						alt="project-icon" />
				</Link>
			</li>
			
			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/minecraft" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Minecraft
					<Image
						src="/icons/minecraft_94415.svg"
						width={18}
						height={18}
						className="select-none drag-none"
						alt="minecraft-icon" />
				</Link>
			</li>
			
			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/skills" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Skills
					<Image
						src="/icons/skills.svg"
						width={20}
						height={20}
						className="select-none drag-none"
						alt="computer-icon" />
				</Link>
			</li>
			
			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/guestbook" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Guestbook
					<Image
						src="/icons/book-open-fill.svg"
						width={21}
						height={21}
						className="select-none drag-none"
						alt="" />
				</Link>
			</li>
			
			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/about" className="flex flex-row items-center gap-1 py-1 px-[6px]">
					About
					<Image
						src="/icons/kindle.svg"
						width={20}
						height={20}
						className="select-none drag-none"
						alt="" />
					</Link>
			</li>

			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/anime" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Anime
					<Image
						src="/icons/stars.svg"
						width={21}
						height={21}
						className="select-none drag-none"
						alt="" />
				</Link>
			</li>

			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/specs" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Specs
					<Image
						src="/icons/linux.svg"
						width={21}
						height={21}
						className="select-none drag-none"
						alt="" />
				</Link>
			</li>
		</>
	)
}