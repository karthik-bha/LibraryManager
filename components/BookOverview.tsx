import Image from "next/image"
import { Button } from "./ui/button"
import BookCover from "./BookCover"
import BorrowBook from "./BorrowBook"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

interface Props extends Book{
    userId:string,
}
const BookOverview = async ({ title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor, coverUrl,
    id,
    userId
}: Props) => {  //These props are of type Book defined in types.d.ts 

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    const borrowingEligibility ={
        isEligible: availableCopies>0 && user?.status === 'APPROVED',
        message: availableCopies <=0 ? 'Book is not available' : 'You are not eligible to borrow books',
    }

    return (
        <section className="book-overview">
            <div className="flex flex-1 flex-col gap-5">
                <h1>{title}</h1>
                <div className="book-info">
                    <p>By <span className="font-semibold text-light-200">{author}</span></p>
                    <p>Category <span className="font-semibold text-light-200">{genre}</span></p>
                </div>
                <div className="flex flex-row gap-1">
                    <Image src="/icons/star.svg" alt="star" width={22} height={22} />
                    <p className="font-semibold text-light-200">{rating}</p>
                </div>
                <div className="book-copies">
                    <p>Total Copies <span>{totalCopies}</span></p>
                    <p>Available Copies <span>{availableCopies}</span></p>
                </div>
                <p className="text-white">Description: <span>{description}</span></p>
                
                {user && <BorrowBook bookId={id} userId ={userId} borrowingEligibility={borrowingEligibility}/>}

            </div>
            <div className="relative">
                <div className="relative">
                    <BookCover
                        variant="wide"
                        className="z-10"
                        coverColor={coverColor}
                        coverImage={coverUrl}
                    />
                </div>
                <div className="absolute  left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
                    <BookCover
                        variant="wide"
                        coverColor={coverColor}
                        coverImage={coverUrl}
                    />
                </div>
            </div>
        </section>
    )
}

export default BookOverview