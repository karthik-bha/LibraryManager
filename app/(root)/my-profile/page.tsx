import { sampleBooks } from "@/app/constants";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";


const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <form action={async () => {
        "use server";
        await signOut();
      }}>
        <Button>Logout</Button>
      </form >

      <BookList title="Borrowed Books" books={sampleBooks}/>
    </div>
  )
}

export default Page