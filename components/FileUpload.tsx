"use client";
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  value?:string;
  onFileChange: (filePath: string) => void;
}

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

const FileUpload = ({ type, accept, placeholder, folder, variant, value, onFileChange }: Props) => {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null } | null>({filePath: value ?? null});
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-300 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  }

  const onError = (error: any) => {
    console.error('Error uploading file', error);
    toast({
      title: `${type} upload failed`,
      description: `${type} could not be uploaded, please try again.`,
      variant: "destructive"
    })

  }
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} uploaded`,
      description: `${res.filePath} uploaded successfully`,
    })

  }

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 20MB",
          variant: "destructive"
        })
        return false;
      }
    }
    else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 50MB",
          variant: "destructive"
        })
        return false;
      }
    }
    return true;

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
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        onSuccess={onSuccess}
      />

      <button className={cn('upload-btn', styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}>

        <Image src="/icons/upload.svg" alt="upload" width={20} height={20}
          className={cn('text-base', styles.placeholder)} />
        <p>{placeholder}</p>       
      </button>

      {progress > 0 && progress < 100 && (
        <div className='w-full rounded-full bg-green-200'>
          <div className='progress' style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (
          (type === 'image' ? (
          <IKImage alt={file.filePath ??""} path={file.filePath??""} width={500} height={300} />
        ) :
          type === 'video'?
          (
            <IKVideo
           
            path={file.filePath ??""} 
            controls={true}
            className='h-96 w-full rounded-xl'
            />

          ):
          null))
          }
    </ImageKitProvider>

  )
}

export default FileUpload