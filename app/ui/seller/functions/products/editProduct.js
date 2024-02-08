"use client"

export const EditButton = (props) => {
    return (
        <button className="text-blue-600 cursor-pointer"
            onClick={
                () => {
                    console.log("Edit from " + props.productID + " clicked!")
                }
            }
        >
            Edit
        </button>
    )
}