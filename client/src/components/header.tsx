import { Link } from "wouter";
import { Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">VisualFind</h1>
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <a className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Browse
                </a>
              </Link>
              <a href="#" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Reviews
              </a>
              <a href="#" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
