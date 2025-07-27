"use client";
import { UserService } from "@/service/user/user.service";
import Link from "next/link";

export default function ClientLayout({
  userData,
  children,
}: {
  userData: any;
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    try {
      const userService = UserService.logout();
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        // console.log(error.response.data.message);
      }
      return null;
    }
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/">
                <h1 className="text-3xl font-bold text-red-600 hover:text-red-700 transition-colors">
                  Online Judge
                </h1>
              </Link>
              
              <nav className="flex items-center space-x-6">
                <Link 
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors" 
                  href="/"
                >
                  Home
                </Link>
                <Link 
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors" 
                  href="/contests"
                >
                  Contests
                </Link>
                <Link 
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors" 
                  href="/problems"
                >
                  Problems
                </Link>

                {userData ? (
                  <div className="relative group">
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors">
                      <span>{userData?.username}</span>
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Link
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        href={`/profile/${userData?.username}`}
                      >
                        Profile
                      </Link>
                      <Link 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        href="/settings"
                      >
                        Settings
                      </Link>
                      <Link 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        href="/author"
                      >
                        Author Dashboard
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors">
                      <span>Account</span>
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Link 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        href="/auth/login"
                      >
                        Login
                      </Link>
                      <Link 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        href="/auth/register"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Online Judge. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}