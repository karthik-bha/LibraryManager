import { sampleBooks } from "@/app/constants";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { getBorrowedBooks } from "@/lib/actions/borrow";


const Page = async () => {

  const session = await auth();
  const userId = session?.user?.id; 

  const borrowedBooks = await getBorrowedBooks(userId || "");


  return (
    <div className="flex flex-col gap-4">
      <form action={async () => {
        "use server";
        await signOut();
      }}>
        <Button>Logout</Button>
      </form >

      <BookList title="Borrowed Books" books={borrowedBooks}/>
    </div>
  )
}

export default Page