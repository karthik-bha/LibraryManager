import Link from "next/link"
import BookCover from "./BookCover"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"

const BookCard = ({ id, title, genre, color, cover, isLoanedBook = false }: Book) => (
    <li>
        <Link href={`/books/${id}`}>
            <BookCover coverColor={color} coverImage={cover}  />
        </Link>
        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
            <p>{title}</p>
            <p>{genre}</p>
        </div>
        {isLoanedBook && (
            <div className="mt-3 w-full">
                <div className="book-loaned">
                    <Image 
                    src="/icons/calendar.svg"
                    alt="calendar"
                    width={18}
                    height={18}
                    className="object-contain"
                    />
                    <p>11 days left to return</p>
                </div>
                <Button className="my-2 ">
                    Download reciept
                </Button>
            </div>
        )}
    </li>
)

export default BookCard