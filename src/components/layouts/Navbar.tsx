import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlMenu } from "react-icons/sl";
import { PiArrowBendDoubleUpLeftDuotone } from "react-icons/pi";
import { BiUser } from "react-icons/bi";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const user = useContext(AppContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const links = [
    { name: "About the Course", href: "#about" },
    { name: "Syllabus & Topics Covered", href: "#syllabus" },
    { name: "Study Material Status", href: "#materials" },
  ];

  const handleLogoClick = () => {
    if (user) {
      router.push("/dashboard");
    }
    router.push("/");
  };

  return (
    <header>
      <nav className="flex justify-between items-end border-b border-black/20 sm:pb-5 pb-3">
        <div className="">
          <h3 onClick={handleLogoClick} className="text-xl font-bold mr-2">
            BCFAC
          </h3>
          <p className="text-sm lg:text-md font-semibold">Course Portal</p>
        </div>
        {!user && (
          <div className="flex">
            <Link href="/login" className="font-semibold mr-2">
              Login
            </Link>
            <Link href="/register" className="font-semibold mx-2">
              Register
            </Link>
            <SlMenu onClick={handleMenu} className="md:hidden text-xl ml-2" />
          </div>
        )}
        {user && (
          <div className="flex items-end">
            {user.role === "admin" && (
              <>
                <Link
                  href="/admin/upload"
                  className="text-sm font-semibold mr-2"
                >
                  Upload
                </Link>
                <Link href="/admin" className="text-sm font-semibold mr-5">
                  Dashboard
                </Link>
              </>
            )}
            {user.role === "student" && (
              <>
                <Link href="/dashboard" className="text-sm font-semibold mr-5">
                  Dashboard
                </Link>
              </>
            )}
            <Link href="/account" className="flex items-center">
              <div className="flex flex-col items-end text-sm mr-3">
                <p className="uppercase text-xs">{user.role}</p>
                <p className="font-semibold text-sm">{user.name}</p>
              </div>
              <p className="bg-gray-300 rounded-full px-2 py-2">
                <BiUser />
              </p>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
