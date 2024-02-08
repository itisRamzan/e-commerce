import LoadingBar from "react-top-loading-bar";
import "./ui/globals.css";


export const metadata = {
    title: "R & R",
    description: "An E-commerce website here to help you relax and rejuvenate.",
    keywords: "relax, rejuvenate, e-commerce",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}