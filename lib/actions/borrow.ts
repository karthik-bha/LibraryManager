
import { eq, and } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";

export const getBorrowedBooks = async (userId: string) => {
    return await db
        .select({
            id: books.id,
            title: books.title,
            author: books.author,
            genre: books.genre,
            rating: books.rating,
            totalCopies: books.totalCopies,  
            availableCopies: books.availableCopies, 
            coverColor: books.coverColor, 
            coverUrl: books.coverUrl, 
            videoUrl: books.videoUrl, 
            summary: books.summary,
            description: books.description,
            createdAt: books.createdAt,
        })
        .from(borrowRecords)
        .innerJoin(books, eq(borrowRecords.bookId, books.id))
        .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.status, "BORROWED")));
};
