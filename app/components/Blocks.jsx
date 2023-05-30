import Link from 'next/link'
import Image from 'next/image'

// try to use map function
export default function Blocks() {
	return (
		<ul className='flex flex-wrap gap-6 text-[var(--secondary-text-color)]'>
			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/" className="flex flex-row items-center gap-1 py-1 px-[6px]">
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
				<Link href="/skills" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Skills
					<Image
						src="/icons/skills.svg"
						width={20}
						height={20}
						className="select-none drag-none"
						alt="skills-icon" />
				</Link>
			</li>

			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/specs" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Specs
					<Image
						src="/icons/pc-display-horizontal.svg"
						width={16}
						height={16}
						className="select-none drag-none"
						alt="pc-icon" />
				</Link>
			</li>

			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/about" className="flex flex-row items-center gap-1 py-1 px-[6px]">
					About
					<Image
						src="/icons/draw-pen.svg"
						width={22}
						height={22}
						className="select-none drag-none"
						alt="pen-icon" />
					</Link>
			</li>

			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/anime" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Anime
					<Image
						src="/icons/alchemy-stars.svg"
						width={21}
						height={21}
						className="select-none drag-none"
						alt="anime-icon" />
				</Link>
			</li>

			<li className="bg-[var(--tertiary-background-color)] rounded-[5px]">
				<Link href="/games" className="flex flex-row items-center gap-1 py-1 px-[6px]">
				Games
					<Image
						src="/icons/game-die.svg"
						width={20}
						height={20}
						className="select-none drag-none"
						alt="game-icon" />
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
				<Link href="/guestbook" className="flex flex-row items-center gap-1 py-1 px-[6px]">
					Guestbook
				</Link>
			</li>
		</ul>
	)
}