import Upload from "@/components/jsontoxml";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col p-4">
        <ul className="grid grid-block gap-2">
          <li className="bg-blue-200 w-full aspect-square hover:bg-blue-400 hover:text-white hover:font-semibold"><Link href="/jsontoxml" className="w-full h-full text-center  flex items-center justify-center">JSONTOXML</Link></li>
          <li className="bg-blue-200 w-full aspect-square hover:bg-blue-400 hover:text-white hover:font-semibold"><Link href="/formatjson" className="w-full h-full text-center  flex items-center justify-center">FORMATJSON</Link></li>
        </ul>
      </div>
  );
}
