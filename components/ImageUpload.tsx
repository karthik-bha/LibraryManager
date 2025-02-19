"use client";
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

// Authenticates before using imagekit features
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorTxt = await response.text();
      throw new Error(errorTxt);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };

  } catch (error: any) {
    throw new Error(error)
  }
}

const { env: { imagekit: { publicKey, urlEndpoint } } } = config;

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error('Error uploading file', error);
    toast({
      title:"Image upload failed",
      description:`Image could not be uploaded, please try again.`,
      variant:"destructive"
    })

  }
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title:"Image uploaded",
      description:`${res.filePath} uploaded successfully`,
    })

  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}>

      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='text-upload.png'
      />

      <button className='upload-btn'
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}>

        <Image src="/icons/upload.svg" alt="upload" width={20} height={20} className='object-contain' />
        <p>Upload a File</p>

        {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>


      {file && (<IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />)}
    </ImageKitProvider>

  )
}

export default ImageUpload