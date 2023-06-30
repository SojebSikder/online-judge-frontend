"use client";
import { CookieHelper } from "@/helper/cookie.helper";
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
      <body>
        <header className="flex m-4">
          <div>
            <Link href="/">
              <h1 className="text-center text-4xl font-bold text-red-600">
                SojebOJ
              </h1>
            </Link>
          </div>
        </header>

        <nav className="navbar">
          <Link className="nav-item" href="/">
            Home
          </Link>
          <Link className="nav-item" href="/contests">
            Contest
          </Link>
          <Link className="nav-item" href="/problems">
            Problems
          </Link>

          {userData ? (
            <>
              <Link
                className="nav-item"
                href={`/profile/${userData?.username}`}
              >
                {userData?.username}
              </Link>
              <Link className="nav-item" href="/administration">
                Administration
              </Link>
              <button className="nav-item" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-item" href="/auth/login">
                Login
              </Link>
              <Link className="nav-item" href="/auth/register">
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="mt-6"></div>

        {children}
      </body>
    </html>
  );
}
