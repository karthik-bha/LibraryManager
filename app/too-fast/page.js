const Page = () => {
    return (
        <div className="root-container flex min-h-screen flex-col items-center justify-center">
            <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
                Too Many Requests!
            </h1>
            <p className="font-bebas-neue text-xl my-2 text-light-400">
                You've attempted to request a resource too many times. Please wait for a while before attempting again.
            </p>
        </div>
    )
}

export default Page