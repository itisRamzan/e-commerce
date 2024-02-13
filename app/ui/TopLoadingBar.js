"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import LoadingBar from "react-top-loading-bar"

export default function TopLoadingBar() {
    const [progress, setProgress] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    useEffect(() => {
        setProgress(50)
        setTimeout(() => {
            setProgress(100)
        }, 100);

    }, [pathname, searchParams])



    return (
        <>
            <LoadingBar
                color="#0000ff"
                progress={progress}
                waitingTime={800}
                onLoaderFinished={() => setProgress(0)}
            />
        </>
    )

}