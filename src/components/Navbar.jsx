"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const session = useSession();
  console.log(session);
  const links = [
    {
      title: "Posts",
      path: "/posts",
    },
    {
      title: "Meals",
      path: "/meals",
    },
    {
      title: "Gallary",
      path: "/gallary",
    },
    {
      title: "About",
      path: "/about",
    },
  ];
  const handler = () => {
    router.push("/api/auth/signin");
  };

  if (pathName.includes("dashboard"))
    return (
      <div className="bg-green-400 p-6">
        <h1>Dashboard Layout</h1>
      </div>
    );
  return (
    <nav className="bg-red-500 px-6 py-4 flex justify-between items-center">
      <h6 className="text-white uppercase font-bold text-4xl">Next Hero</h6>
      <ul className="flex justify-between items-center space-x-4">
        {/* <li><Link href={'/about'}>About</Link></li> */}
        {links?.map((link) => (
          <Link
            className={`${pathName === link?.path && "text-cyan-400"}`}
            key={link.path}
            href={link.path}
          >
            {link.title}
          </Link>
        ))}
      </ul>
      {session?.status !== "authenticated" ?
        <button onClick={handler} className="p-3 bg-white">
          Login
        </button>
        :
        <button className="p-3 bg-yellow-500">Logout</button>
      }
      <div className="flex justify-center items-center">
        {session?.data && (
          <div className="rounded-full mr-3 overflow-hidden size-12">
            <Image
              height={70}
              width={70}
              alt={session?.data?.user?.name}
              src={session?.data?.user?.image}
            />
          </div>
        )}
        <h6>
          {session?.data?.user?.name} <br />
          {session?.data?.user?.type}
        </h6>
      </div>
    </nav>
  );
};

export default Navbar;
