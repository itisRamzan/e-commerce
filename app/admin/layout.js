import AdminNavbar from "@/app/ui/admin/dashboard/Navbar";


export default async function DashboardLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <div>{children}</div>
        </>
    );
}