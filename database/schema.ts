
import { uuid, varchar, integer, text, boolean, pgTable, pgEnum, date, timestamp } from "drizzle-orm/pg-core";

// Defining enums for various things
export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
export const ROLE_ENUM = pgEnum('role', ['ADMIN','USER'])
export const BORROW_STATUS = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(), // Generate unique uuid
    fullName: varchar("full_name",{length:255}).notNull(), // Fullname of 255 characters
    email: text("email").notNull().unique(),
    universityId: integer("university_id").notNull().unique(),
    password: text("password").notNull(),
    universityCard: text("university_card").notNull(),
    status:STATUS_ENUM('status').default('PENDING'), //This will be of type enum
    role: ROLE_ENUM('role').default('USER'), 
    lastActive: date("last_active").notNull().defaultNow(),
    createdAt: timestamp("created_at",{withTimezone:true}).defaultNow(),
}); 
