import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "../constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async() => {
  const res = await db.select().from(users);
  console.log(JSON.stringify(res));
  return (
    <div className="text-white">
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title ="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
        
      />
    </div>
  );
}
export default Home;