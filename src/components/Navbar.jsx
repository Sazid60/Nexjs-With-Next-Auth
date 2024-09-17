'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const pathName = usePathname()
    const router = useRouter()
    const links = [
        {
            title: "Posts",
            path: "/posts"
        },
        {
            title: "Meals",
            path: "/meals"
        },
        {
            title: "Gallary",
            path: "/gallary"
        },
        {
            title: "About",
            path: "/about"
        },

    ]
    const handler = () => {
        router.push('/login')
    }

    if (pathName.includes('dashboard'))
        return (
            <div className='bg-green-400 p-6'>
                <h1>Dashboard Layout</h1>
            </div>
        )
    return (
        <nav className="bg-red-500 px-6 py-4 flex justify-between items-center">
            <h6 className='text-white uppercase font-bold text-4xl'>Next Hero</h6>
            <ul className='flex justify-between items-center space-x-4'>
                {/* <li><Link href={'/about'}>About</Link></li> */}
                {
                    links?.map((link) => <Link className={`${pathName === link?.path && 'text-cyan-400'}`} key={link.path} href={link.path}>{link.title}</Link>)
                }
            </ul>
            <button onClick={handler} className='p-3 bg-white'>Login</button>
        </nav>
    );
};

export default Navbar;