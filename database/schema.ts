
import { uuid, varchar, integer, text, boolean, pgTable, pgEnum, date, timestamp } from "drizzle-orm/pg-core";
import { title } from "process";

// Defining enums for various things
export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
export const ROLE_ENUM = pgEnum('role', ['ADMIN', 'USER'])
export const BORROW_STATUS = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(), // Generate unique uuid
    fullName: varchar("full_name", { length: 255 }).notNull(), // Fullname of 255 characters
    email: text("email").notNull().unique(),
    universityId: integer("university_id").notNull().unique(),
    password: text("password").notNull(),
    universityCard: text("university_card").notNull(),
    status: STATUS_ENUM('status').default('PENDING'), //This will be of type enum
    role: ROLE_ENUM('role').default('USER'),
    lastActive: date("last_active").notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const books = pgTable("books", {
    id: uuid('id').unique().notNull().defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    genre: text('genre').notNull(),
    rating: integer('rating').notNull(),
    coverUrl: text('coverUrl').notNull(),
    coverColor: varchar('cover_color', { length: 7 }).notNull(),
    description: text('description').notNull(),
    totalCopies: integer('total_copies').notNull().default(1),
    availableCopies: integer('available_copies').notNull().default(0),
    videoUrl: text('video_url').notNull(),
    summary: text('summary').notNull(),
    isLoanedBook: boolean('isLoanedBook').notNull().default(false),
    createdAt:timestamp('created_at',{withTimezone:true}).defaultNow(),
})
