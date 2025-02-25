"use client"
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { z, ZodType } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { bookSchema } from '@/lib/validations'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/FileUpload'
import ColorPicker from './ColorPicker'


// T -> default value passed down
interface Props extends Partial<Book> {
    type?: 'create' | 'update';

}


const BookForm = ({ type}: Props) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            description: '',
            author: '',
            genre: '',
            rating: 1,
            totalCopies: 1,
            coverUrl: '',
            coverColor: '',
            videoUrl: '',
            summary: '',
        }
    })


    const onSubmit = async (values: z.infer<typeof bookSchema>) => { 
        console.log(values);
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Book Title
                            </FormLabel>
                            <FormControl>
                                <Input required 
                                type="text" 
                                placeholder='Book Title' 
                                {...field}
                                className='book-form_input'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name={"author"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Author
                            </FormLabel>
                            <FormControl>
                                <Input required 
                                type="text" 
                                placeholder='Book author' 
                                {...field}
                                className='book-form_input'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name={"genre"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Genre
                            </FormLabel>
                            <FormControl>
                                <Input required 
                                type="text" 
                                placeholder='Book genre' 
                                {...field}
                                className='book-form_input'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name={"rating"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Book Rating
                            </FormLabel>
                            <FormControl>
                                <Input 
                                type="number" 
                                min={1}
                                max={5}
                                placeholder='Book rating' 
                                {...field}
                                className='book-form_input'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"totalCopies"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Total Copies
                            </FormLabel>
                            <FormControl>
                                <Input 
                                type="number" 
                                min={0}
                                max={10000}
                                placeholder='Total copies' 
                                {...field}
                                className='book-form_input'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverUrl"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Book image
                            </FormLabel>
                            <FormControl>
                              <FileUpload 
                              type='image' 
                              placeholder='Upload book cover'
                              accept='image/*' 
                              folder='book/covers' 
                              variant='light'
                              onFileChange={field.onChange} 
                              value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"coverColor"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Primary Color
                            </FormLabel>
                            <FormControl>
                                <ColorPicker onPickerChange={field.onChange}
                                value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Book description
                            </FormLabel>
                            <FormControl>
                              <Textarea placeholder='Book Descriptio' {...field}
                              rows={10} className='book-form_input'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"videoUrl"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Book trailer
                            </FormLabel>
                            <FormControl>
                            <FileUpload 
                              type='video' 
                              placeholder='Upload book trailer'
                              accept='video/*' 
                              folder='books' 
                              variant='light'
                              onFileChange={field.onChange} 
                              value={field.value} />
                            
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"summary"}
                    render={({ field }) => (
                        <FormItem className='flex flex-col  gap-1'>
                            <FormLabel className='text-base font-normal text-dark-500'>
                                Book summary
                            </FormLabel>
                            <FormControl>
                              <Textarea placeholder='Book summary' {...field}
                              rows={10} className='book-form_input'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                    <Button type="submit"
                    className='book-form_btn text-white'>Add Book to Library</Button>
            </form>
        </Form>
    )

}

export default BookForm