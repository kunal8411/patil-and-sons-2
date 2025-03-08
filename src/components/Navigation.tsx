import Link from "next/link";
// import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Button = dynamic(
  () => import("@/components/ui/button").then((mod) => mod.default),
  { ssr: false }
);

import { Phone } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://wa.me/+919657419302", "_blank");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center mr-2">
            <Link href="/">
              <Image
                src="/logo.png" // Update with the correct path to your PNG logo
                alt="Patil & Sons Logo"
                width={50} // Adjust width
                height={50} // Adjust height
                className="h-12 w-auto cursor-pointer" // Adjust styles
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link
              href="/properties"
              className="text-gray-700 hover:text-primary"
            >
              Properties
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={handleWhatsAppClick}
              className="cursor-pointer"
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
