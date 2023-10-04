import Link from "next/link";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-4 md:px-8 lg:px-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to BCFAC Online Portal
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 mb-8">
          A one-stop platform for all your study materials
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Subject info */}
        <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md mb-4 md:mr-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
            About the Subject
          </h2>
          <p className="text-lg lg:text-xl">
            "Blockchain Foundations, Architecture, and Consensus Mechanisms
            provides a comprehensive exploration of blockchain technology.
            Students delve into decentralized principles, architectural
            intricacies, and key consensus mechanisms like Proof of Work and
            Proof of Stake. This subject offers a succinct yet insightful
            understanding of blockchain's core concepts and its practical
            applications across industries."
          </p>
        </div>

        {/* Portal info */}
        <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md md:ml-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
            How does the portal work?
          </h2>
          <p className="text-lg lg:text-xl">
            "By students, for students—our portal offers seamless access to
            recorded lectures, presentation files, books, and various study
            materials. Stay updated weekly with the latest resources. Simply
            create an account to unlock a wealth of educational content.
            Empowering your learning journey effortlessly."
          </p>
        </div>
      </div>

      {/* <div className="my-8">
        <Link href="/login">
          <a className="text-lg md:text-xl lg:text-2xl font-semibold bg-white text-black border-2 border-black rounded-md hover:bg-black hover:text-white transition ease-in-out duration-500 hover:transition hover:ease-in-out hover:duration-500 p-2 md:p-3">
            Get Started
          </a>
        </Link>
      </div> */}
    </div>
  );
};

export default Landing;
