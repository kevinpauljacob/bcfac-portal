import React from 'react'
import { useRouter } from "next/router";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

export default function Card() {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/admin/materials/12345`);
    }

    return (
        <div className="shadow-md border border-black/10 rounded-md p-3 my-2">
            <div className="flex justify-between items-center border-b border-black/20 py-2">
                <h3 className="text-xl font-semibold">1st September 2023</h3>
                <p className="flex justify-between items-center" onClick={handleCardClick}>
                    <span className="text-sm pr-2 hover:-translate-x-1 transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300 font-semibold">Click to Edit</span>
                    <HiOutlineArrowNarrowRight/>
                </p>
            </div>
            <div className='my-2'>
                <h4 className="text-md font-semibold">
                    Topics Covered:
                </h4>
                <ol className="text-sm">
                    <li>
                        1. Blockchain Foundation
                    </li>
                    <li>
                        2. Consensus Mechanisms
                    </li>
                </ol>
            </div>
        </div>
    )
}
