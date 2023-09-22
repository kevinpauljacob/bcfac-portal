import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SlMenu } from 'react-icons/sl'
import { PiArrowBendDoubleUpLeftDuotone } from 'react-icons/pi'

export default function Navbar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleMenu = () => {
        setShowMenu(!showMenu);
    }

    const links = [
        {name: "About the Course", href: "#about"},
        {name: "Syllabus & Topics Covered", href: "#syllabus"},
        {name: "Study Material Status", href: "#materials"},
    ];

    return (
        <header>
            <nav className="flex justify-between items-end border-b border-black/20 sm:pb-5 pb-3">
                <div className="">
                    <Link href="/">
                        <h3 className="text-xl font-bold mr-2">
                            Blockchain Foundations, Architecture and Consensus Mechanisms
                        </h3>
                    </Link>
                    <p className="text-sm lg:text-md font-semibold">
                        Course Portal
                    </p>
                </div>
                <div className="flex">
                    <Link href="/login" className="font-semibold mr-2">Login</Link>
                    <Link href="/register" className="font-semibold mx-2">Register</Link>
                    <SlMenu onClick={handleMenu} className="md:hidden text-xl ml-2"/>
                </div>
            </nav>
            <div className={`${showMenu ? "md:hidden left-0 transition ease-in duration-500" : "left-0 -translate-x-[700px] transition ease-out duration-500"} fixed z-20 top-0 flex justify-center items-center h-screen bg-white text-black rounded-l-md shadow-2xl min-h-screen sm:w-[385px] w-full`}>
                <ul className="flex flex-col justify-center items-center md:hidden mb-[3px]">
                        {
                            links.map((link, index) => (
                                <Link key={index} href={link.href} className="text-md lg:text-md font-semibold underline m-2">{link.name}</Link>
                            ))
                        }
                </ul>
                <button onClick={handleMenu} className="fixed top-5 left-5 text-3xl">
                    <PiArrowBendDoubleUpLeftDuotone/>
                </button>
            </div>
        </header>
    )
}
