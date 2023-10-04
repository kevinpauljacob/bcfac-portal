import React from "react";

// type CardProps = {
// 	title: string;
// 	description: string;
// 	link: string;
// };

const MainCard: React.FC = () => {
	return (
		<div className="shadow-md border border-black/10 rounded-md p-3 my-2 h-4/5">
			<div className="flex justify-between items-center border-b border-black/20 py-2">
				<h2 className="text-5xl font-semibold">This Course</h2>
			</div>
            <div className="my-2">
			<p className="w-3/4 text-xl text-left my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, id? Autem, earum. Explicabo dignissimos veniam ratione fuga molestias sapiente ab Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, hic sequi. Totam rerum commodi, quidem in minus dignissimos deleniti minima. Impedit facere distinctio sequi nemo, laborum hic veritatis quidem quos, illo natus perferendis repellendus nesciunt modi reprehenderit </p>
			<a href="/" target="_blank" rel="noopener noreferrer" className="">
				Go To Lectures
			</a>
            </div>
		</div>
	);
};

export default MainCard;
