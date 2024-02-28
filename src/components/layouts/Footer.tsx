import Image from "next/image";
import Link from "next/link";
type FooterProps = React.ComponentProps<"footer">;

const Footer: React.FC<FooterProps> = () => {
  const links = [
    { name: "About the Course", href: "#about" },
    { name: "Syllabus & Topics Covered", href: "#syllabus" },
    { name: "Study Material Status", href: "#materials" },
  ];

  return (
    <section className="border-t border-black/20 sm:pt-5 pt-3 mt-auto">
      <div className="flex md:flex-row flex-col justify-between">
        <div className="">
          <p className="text-xl font-bold">Course Code</p>
          <p className={`text-xs lg:text-sm font-semibold max-w-[250px] mb-2`}>
            18CSE416
          </p>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="md:ml-5 mr-5 md:mr-0">
            <p className="text-xl font-bold">Links</p>
            <ul className="text-sm">
              {links.map((link, index) => (
                <li key={index} className="">
                  <Link
                    href={link.href}
                    className="transition ease-in-out duration:300 hover:transition hover:ease-in-out hover:duration-300 hover:text-accent-1 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center font-semibold my-2">
        © 2023 SRM Institute of Science and Technology, Kattankulathur
      </p>
    </section>
  );
};

export default Footer;
