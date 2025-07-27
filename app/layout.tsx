import "./globals.css";
import { cookies } from "next/headers";
import { UserService } from "@/service/user/user.service";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Online judge",
  description: "Participate in contests and win exciting prizes",
};

async function getUserDetailsData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const userService = await UserService.getUserDetails({
      token: token!["value"],
    });

    const userData = userService.data.data;

    return userData;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserDetailsData();

  return <ClientLayout userData={userData}>{children}</ClientLayout>;
}
