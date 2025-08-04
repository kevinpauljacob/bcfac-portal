import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLink } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";
import Accordian from "@/components/landing/Accordian";

export default function Home() {
  return (
    <div className="">
      <header className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-16 pt-28 text-center">
          <div className="mx-auto max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 flex justify-center dark:text-white md:text-4xl">
              18CSE416T	Block Chain Foundations, Architecture and Consensus Mechanics & 18CSE427T	Blockchain Architecture and Programming Smart Contracts
            </h1>

            <p className="mt-6 text-gray-500 dark:text-gray-300">
              Welcome to the course portal.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block  rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                href={"/login"}
              >
                Login
              </Link>

              <Link
                className="block  rounded border border-blue-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500"
                href={"/register"}
              >
                Register
              </Link>
            </div>
          </div>

          {/* srm lgo  */}
          <div className="mx-auto mt-28 max-w-screen-xl">
            <div className="flex justify-center items-center">
              <div className=" flex items-center justify-between">
                <Image
                  className=" h-32 w-36 pr-4 md:h-46 md:w-46 text-gray-500 dark:text-gray-300"
                  src={"/srmlogo.png"}
                  alt="SRM logo"
                  width={600}
                  height={600}
                />
              </div>

              <div className="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
                <Image
                  className=" h-32 w-36 pl-4 md:h-46  md:w-46  text-gray-500 dark:text-gray-300"
                  src={"/dsbs_logo_sm.png"}
                  alt="DSBS Department logo"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* our professors section  */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 pt-28">
          <h1 className="text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">
            Our Professors
          </h1>

          <p className="my-6 max-w-2xl text-gray-500 dark:text-gray-300">
            Meet the academics who will teach you the course.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-16 xl:grid-cols-4">
            <div className="group flex transform cursor-pointer flex-col items-center rounded-xl p-8 transition-colors duration-300 hover:bg-blue-600">
              <Image
                className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-300"
                src="https://media.licdn.com/dms/image/v2/D5603AQGESuksK572Zg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672236340085?e=1756944000&v=beta&t=RH72WOz7yjQeKj10aL3PmJeO44rlLg_JF6b4VreKYCM"
                alt=""
                height={100}
                width={100}
              />

              <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white">
                Dr K Shantha
              </h1>
              <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white">
                Kumari
              </h1>

              <p className="mt-2 capitalize text-gray-500 group-hover:text-gray-300 dark:text-gray-300">
                Associate Professor
              </p>

              <div className="-mx-2 mt-3 flex">
                <a
                  href="https://www.srmist.edu.in/faculty/dr-k-shantha-kumari/"
                  className="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="website"
                >
                  <FaLink className="h-6 w-6 fill-current" />
                </a>

                <a
                  href="https://www.linkedin.com/in/shanthakumari/"
                  className="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="linkdin"
                >
                  <SiLinkedin className="h-6 w-6 fill-current" />
                </a>
              </div>
            </div>
            <div className="group flex transform cursor-pointer flex-col items-center rounded-xl p-8 transition-colors duration-300 hover:bg-blue-600">
              <Image
                className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-300"
                src="https://media.licdn.com/dms/image/v2/D5603AQFvRZaqnqy9gw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1680500578974?e=1756944000&v=beta&t=f3QuwjrXSu5rihquP2nhTgHgOljsGW1tXiJCimWO1v0"
                alt=""
                height={100}
                width={100}
              />

              <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white">
                Dr Kanmani 
              </h1>
              <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white">
                Kumari
              </h1>

              <p className="mt-2 capitalize text-gray-500 group-hover:text-gray-300 dark:text-gray-300">
                Assistant Professor
              </p>

              <div className="-mx-2 mt-3 flex">
                <a
                  href="https://www.srmist.edu.in/faculty/dr-p-kanmani/"
                  className="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="website"
                >
                  <FaLink className="h-6 w-6 fill-current" />
                </a>

                <a
                  href="https://www.linkedin.com/in/kanmanipalaniappan/"
                  className="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="linkdin"
                >
                  <SiLinkedin className="h-6 w-6 fill-current" />
                </a>
              </div>
            </div>
            <div className="group flex transform cursor-pointer flex-col items-center rounded-xl p-8 transition-colors duration-300 hover:bg-blue-600">
              <img
                className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-300"
                src="https://raghavamukkamala.github.io//images/raghava-passport.png"
                alt=""
              />

              <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white">
                Dr Raghava Rao
              </h1>
              <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white">
                Mukkamala
              </h1>

              <p className="mt-2 capitalize text-gray-500 group-hover:text-gray-300 dark:text-gray-300">
                Associate Professor
              </p>

              <div className="-mx-2 mt-3 flex">
                <a
                  href="https://raghavamukkamala.github.io/"
                  className="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="website"
                >
                  <FaLink className="h-6 w-6 fill-current" />
                </a>

                <a
                  href="https://www.linkedin.com/in/raghavamukkamala/"
                  className="mx-2 text-gray-600 hover:text-gray-500 group-hover:text-white dark:text-gray-300 dark:hover:text-gray-300"
                  aria-label="linkdin"
                >
                  <SiLinkedin className="h-6 w-6 fill-current" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*about the course syllabus */}
      <section>
        <Accordian />
      </section>

      {/* about the course section  */}

      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-28">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            About the Course
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16 xl:grid-cols-3">
            <div>
              <div className="inline-block rounded-lg bg-blue-600 p-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  What is the course About?
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Blockchain Architecture and Programming Smart Contracts
                  provide a comprehensive exploration of blockchain technology.
                  Students delve into decentralized principles, architectural
                  intricacies, and key consensus mechanisms like Proof of Work
                  and Proof of Stake. This subject offers a succinct yet
                  insightful understanding of blockchain&apos;s core concepts
                  and its practical applications across industries.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-block rounded-lg bg-blue-600 p-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  What will be the program outcome of this course?
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  After finishing the course, students will have a comprehensive
                  knowledge of blockchain technology, covering decentralized
                  principles, architectural complexities, and consensus methods.
                  They will acquire critical thinking skills, understand
                  practical applications across various industries, and build
                  ethical and regulatory awareness. By working together, they
                  will improve their communication skills and be prepared to
                  contribute to the advancement of blockchain technology.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-block rounded-lg bg-blue-600 p-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  How does the portal work?
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Our portal provides students with easy access to recorded
                  lectures, presentation files, books, and other study tools.
                  Receive weekly updates on the most recent resources. Register
                  an account to access a wide range of instructional material.
                  Facilitating your educational progress with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
