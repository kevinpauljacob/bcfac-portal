import Link from "next/link";
const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full mt-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-1">
          Welcome to BCFAC Online Portal
        </h1>
        <p className="text-lg font-semibold text-gray-600 mb-8">
          A one stop platform for all your study materials
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Subject info */}
        <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md mb-4 md:mb-0 md:mr-2">
          <h2 className="text-2xl font-semibold mb-2">About the Subject</h2>
          <p className="text-lg">
            Blockchain Foundations, Architecture, and Consensus Mechanisms
            provide a comprehensive exploration of blockchain technology.
            Students delve into decentralized principles, architectural
            intricacies, and key consensus mechanisms like Proof of Work and
            Proof of Stake. This subject offers a succinct yet insightful
            understanding of blockchain&apos;s core concepts and its practical
            applications across industries.
          </p>
        </div>

        {/* Portal info */}
        <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md md:ml-2">
          <h2 className="text-2xl font-semibold mb-2">
            How does the portal work?
          </h2>
          <p className="text-lg">
            By students, for students—our portal offers seamless access to
            recorded lectures, presentation files, books, and various study
            materials. Stay updated weekly with the latest resources. Simply
            create an account to unlock a wealth of educational content.
            Empowering your learning journey effortlessly.
          </p>
        </div>
      </div>

      {/* <div className="my-8">
          <Link href="/login">
            <a className="text-lg font-semibold bg-white text-black border-2 border-black rounded-md hover:bg-black hover:text-white transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 p-2">
              Get Started
            </a>
          </Link>
        </div> */}
    </div>
  );
};

export default Landing;
