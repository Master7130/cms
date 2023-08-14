import { getServerSession } from "next-auth/next";
import Signin from "@/components/Signin";
import Navbar from "@/components/Navbar";
import Models from "@/components/Models";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)

  if (!session) {
    return <Signin />;
  } else {
    return (
      <div className="">
        <div className="flex justify-center py-8">
          <Navbar />
        </div>
        <Models />
      </div>
    );
  }
}
