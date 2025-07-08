import Image from "next/image";
import logo from "@/images/image.png"; // adjust path if needed

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex justify-center items-center py-4">
        <Image
          src={logo}
          alt="SpaceX Logo"
          width={160}
          height={40}
          className="object-contain"
          priority
        />
      </div>
      <hr className="border-t border-gray-200" />
    </header>
  );
};

export default Header;
