import React from 'react'
import { useRouter } from "next/router";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

type Lecture = {
    id: string;
    lectureDate: string;
    topicsCovered: string[];
    recordingLinks: string[];
  };
  
type CardProps = {
    lecture: Lecture;
};

export default function AdminCard({ lecture }: CardProps) {
    const router = useRouter();

    const handleCardClick = (id: string) => {
        router.push(`/materials/${id}`);
    }

    return (
        <div className="shadow-md border border-black/10 rounded-md p-3 my-2">
            <div className="flex justify-between items-center border-b border-black/20 py-2">
                <h3 className="text-xl font-semibold">{lecture.lectureDate}</h3>
                <p className="flex justify-between items-center" onClick={() => handleCardClick(lecture.id)}>
                    <span className="text-sm pr-2 hover:-translate-x-1 transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300 font-semibold cursor-pointer">Click to Edit</span>
                    <HiOutlineArrowNarrowRight/>
                </p>
            </div>
            <div className='my-2'>
                <h4 className="text-md font-semibold">
                    Topics Covered:
                </h4>
                <ol className="text-sm">
                    {lecture.topicsCovered.map((topic, index) => (
                        <li key={index}>{`${index + 1}. ${topic}`}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
