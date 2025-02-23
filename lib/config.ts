// Makes it easier to manage environment variables 
// ! is for TypeScript to know that the variable is not null
const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        },
        databaseUrl: process.env.DATABASE_URL!,
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
            redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!,
        },
        resendToken: process.env.RESEND_TOKEN!,
        emailJs: {
            emailjsServiceId: process.env.NEXT_PUBLIC_SERVICE_ID,
            emailjsTemplateId: process.env.NEXT_PUBLIC_TEMPLATE_ID,
            emailjsPublicKey: process.env.EMAILJS_KEY,
        }
    }
}

export default config;