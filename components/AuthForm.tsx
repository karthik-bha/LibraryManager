"use client"
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/app/constants'
import FileUpload from './FileUpload'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'


// T -> default value passed down
interface Props<T extends FieldValues> {
    type: "SIGN_IN" | "SIGN_UP";
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    schema: ZodType<T>;

}


const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit, }: Props<T>) => {
    const router = useRouter();
    const isSignIn = type === "SIGN_IN";


    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })


    const handleSubmit: SubmitHandler<T> = async (data) => {

        const result = await onSubmit(data);

        if (result.success) {
            toast({
                title: "Success",
                description: isSignIn
                    ? "You have successfully signed in."
                    : "You have successfully signed up.",
            });

            router.push("/");
        } else {
            toast({
                title: `Error ${isSignIn ? "signing in" : "signing up"}`,
                description: result.error ?? "An error occurred.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-white'>Welcome to the Library Manager</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full">
                    {Object.keys(defaultValues).map((field) => (

                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='captialize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                    <FormControl>
                                        {field.name === "universityCard" ? (
                                            <FileUpload type="image" accept="image/*"
                                                placeholder="Upload your university card"
                                                folder="ids" variant="dark"
                                                onFileChange={field.onChange} />
                                        ) : (
                                            <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}{...field}
                                                className='form-input' />
                                        )}

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <Button type="submit" className='form-btn'>{isSignIn ? "Sign In" : "Sign Up"}</Button>
                </form>
            </Form>
            <p className='text-center text-base font-medium'>
                {isSignIn ? "New to LibraryManager?" : "Already have an account?"}
                <Link
                    href={isSignIn ? "/sign-up" : "/sign-in"}
                    className='text-primary font-bold mx-1'>

                    {isSignIn ? "Create an account" : "Sign in"}

                </Link>
            </p>
        </div>
    )

}

export default AuthForm