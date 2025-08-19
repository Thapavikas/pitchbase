import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold"> PITCHBASE </h1>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl 
             border-2 border-blue-500 text-blue-500 font-medium 
             transition-all duration-200
             hover:bg-blue-500 hover:text-white hover:shadow-lg
             active:scale-95 active:bg-blue-600"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl 
             border-2 border-red-500 text-red-500 font-medium 
             transition-all duration-200
             hover:bg-red-500 hover:text-white hover:shadow-lg
             active:scale-95 active:bg-red-600"
                >
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
