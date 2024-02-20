import { cookies } from "next/headers";
import UserAddressForm from "./UserAddressForm";
import { getUser } from "@/app/actions/userAuth";
import UnauthorizedPage from "../../Unauthorized";

export default async function UserInfoPage() {
    const data = await getUser(cookies().get("userToken").value);
    if (data.status === 200) {
        return (
            <>
                <UserAddressForm user={JSON.parse(JSON.stringify(data?.user))} />
            </>
        )
    }
    else {
        return (
            <UnauthorizedPage />
        )
    }
}