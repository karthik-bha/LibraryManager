"use client"
import AuthForm from '@/components/AuthForm';
import { signInWithCredentials } from '@/lib/actions/auth';
import { signInSchema } from '@/lib/validations';
import React from 'react'

const Page = () => {
  return (
    <div>
        <AuthForm type="SIGN_IN" schema={signInSchema} 
        defaultValues={{email:"", password:""}} 
        onSubmit={signInWithCredentials}/> 
        {/* Calls server action  */}
    </div>
  )
}

export default Page;