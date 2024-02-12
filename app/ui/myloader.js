const myloader = ({ size }) => {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="relative">
                    <div className="w-4 h-4 border-2 border-gray-300 border-solid rounded-full animate-spin " style={{ animation: 'spin 2s linear infinite' }}>
                        <div className={`
                        w-[0.1rem] h-[0.1rem] bg-blue-500 rounded-full absolute bottom-0 left-[0.72rem] transform -translate-x-1/2 -translate-y-1/2
                        ${size === "full" ? "h-60" : ""}
                        `}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default myloader