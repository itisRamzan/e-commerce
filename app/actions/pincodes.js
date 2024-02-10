export async function getServicablePincode(pincode) {
    let servicablePincodes = [
        "500016",
        "500017",
        "500018",
    ]
    if (servicablePincodes.includes(pincode)) {
        return true
    }
    return false
}

export async function getPincodeDetails(pincode) {
    let servicablePincodes = {
        "500016": {
            city: "Hyderabad",
            state: "Telangana",
            country: "India"
        },
        "500017": {
            city: "Secunderabad",
            state: "Telangana",
            country: "India"
        },
        "500018": {
            city: "Khairatabad",
            state: "Telangana",
            country: "India"
        }
    }
    if (servicablePincodes[pincode]) {
        return servicablePincodes[pincode]
    }
    return false;
}