import AdminNavbar from "@/app/ui/admin/dashboard/Navbar";


export default async function AdminLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <div>{children}</div>
        </>
    );
}