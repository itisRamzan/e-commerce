import AddProducts from "./products/addProducts";
import AllProducts from "./products/allProducts";

export default function ProducstsPage({ props, searchParams }) {
    return (
        <>
            <div className="flex flex-col space-y-4">
                <AddProducts />
                <AllProducts searchParams={searchParams} />
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A, voluptate facere ea nisi ullam praesentium expedita at dignissimos consequatur nemo optio, non omnis porro eligendi impedit perspiciatis illo dicta quibusdam eius quidem inventore obcaecati illum harum quasi. Facere cupiditate rem repudiandae minus quibusdam in, ex dignissimos officia quam culpa distinctio!
                </div>
            </div>
        </>
    )
}