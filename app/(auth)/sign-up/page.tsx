
"use client"
import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/validations';
import React from 'react'

const Page = () => {
  return (
    <div>
        <AuthForm type="SIGN_UP" schema={signUpSchema} defaultValues={{email:"", password:"", fullName:"",  universityId:"", universityCard:""}} 
        onSubmit={() => {}}/>
    </div>
  )
}

export default Page;