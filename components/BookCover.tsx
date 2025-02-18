import { cn } from "@/lib/utils";
import Image from "next/image";

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide'
};

interface Props {
    className?: string;
    variant?: BookCoverVariant;
    coverColor?: string;
    coverImage?: string;
}


const BookCover = ({
    className,
    variant = 'regular',
    coverColor = '#012B48',
    coverImage = 'https://placehold.co/400x600.png'
}: Props) => {
    return (
        <div
            className={cn("relative transition-all duration-300 rounded-md shadow-md overflow-hidden", 
                variantStyles[variant], 
                className
            )}            
        >
            <Image src={coverImage} alt="Book Cover" fill className="w-full h-full object-cover" />
        </div>
    );
};

export default BookCover;
