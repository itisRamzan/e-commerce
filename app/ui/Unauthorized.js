import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col">
            <h1 className="text-5xl text-center mt-20">Unauthorized</h1>
            <p className="text-center mt-5">
                You are not authorized to view this page.
            </p>
            <Link href={"/"}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer m-2 p-2 rounded-lg text-white text-center w-24 mx-auto mt-5 md:w-32 md:p-3 "
            >
                Go Home
            </Link>

        </div>
    );
}