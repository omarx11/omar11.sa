import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="h-24 border-2 border-blue-600">
      <Link href="/server">Server</Link>;
    </div>
  )
}