export default function IndOrderPage({ order }) {
    return (
        <div className="min-h-screen" >
            <section className="text-gray-600 body-font overflow-hidden p-4">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-col md:flex-row flex-wrap-reverse space-y-4 md:space-y-0">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                Order ID: {order && order?.orderID}
                            </h2>
                            <h1 className={`text-gray-900 text-lg md:text-3xl title-font font-medium mb-4
                            ${order.payment_status === "paid" ? "block" : "hidden"}
                            `}>
                                Yayy! Order placed successfully 🎉
                            </h1>
                            <h1 className={`text-gray-900 text-lg md:text-3xl title-font font-medium mb-4
                            ${order.payment_status === "pending" ? "block" : "hidden"}
                            `}>
                                Oops! Payment failed 😔
                            </h1>
                            <div className="leading-relaxed mb-4">
                                Order placed on <b>{order &&
                                    new Date(order.updatedAt).toLocaleString()
                                }</b>. <br />
                                Your payment status is <b>{order && order.payment_status}</b>. <br />
                                <p className={` ${order.payment_status === "paid" ? "block" : "hidden"} `}>
                                    Your order has been placed successfully. You will receive an email with the order details.
                                </p>
                                <p className={` ${order.payment_status === "pending" ? "block" : "hidden"} `}>
                                    Your order is on hold as your payment is pending. Please try again.
                                </p>
                            </div>
                            <div className="my-4">
                                <div className="flex flex-row  mb-2 border-b-2 p-2">
                                    <span className="font-semibold w-1/3 text-center">Item</span>
                                    <span className="font-semibold w-1/3 text-center">Quantity</span>
                                    <span className="font-semibold w-1/3 text-center">Item Total</span>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    {
                                        order && order.products.map((order, index) => {
                                            return (
                                                <div className="flex flex-row border-b p-2" key={index} >
                                                    <span className="w-1/3 text-center my-auto">{order.name + " (" + order.size + "/" + order.color + ")"}</span>
                                                    <span className="w-1/3 text-center my-auto">{order.qty}</span>
                                                    <span className="w-1/3 text-center my-auto">
                                                        {order.qty + " X " + order.price + " = "}
                                                        ₹{order.price * order.qty}
                                                    </span>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-lg md:text-2xl text-gray-900">
                                    Total : ₹{order && order.amount}
                                </span>
                                <button className={` "flex ml-auto text-white bg-blue-500 border-0  rounded-md py-2 px-4 focus:outline-none hover:bg-blue-600" ${order.payment_status === "paid" ? "block" : "hidden"} `}>
                                    Track Order
                                </button>
                                <button className={` "flex ml-auto text-white bg-blue-500 border-0  rounded-md py-2 px-4 focus:outline-none hover:bg-blue-600" ${order.payment_status === "pending" ? "block" : "hidden"} `}>
                                    Try Again
                                </button>
                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                    </div>
                </div>
            </section>
        </div>
    )
}