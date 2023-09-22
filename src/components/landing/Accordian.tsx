import React, { useState } from 'react'

export default function Accordian() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="border border-black/20 rounded-md my-2">
            <div className="flex justify-between items-center border-b border-black/20 py-2 px-3 cursor-pointer" onClick={toggleAccordion}>
                <h3 className="text-lg font-semibold">Topic Name</h3>
                <svg className={`transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
            <div className={`px-3 pb-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-500 ease-in-out delay-100 min-w-fit pt-1`}>
                <p className="text-sm py-1">Topic Content</p>
                <p className="text-sm py-1">Topic Content</p>
                <p className="text-sm py-1">Topic Content</p>
            </div>
        </div>
    )
}

