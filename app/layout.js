import "./ui/globals.css";
import NextTopLoader from 'nextjs-toploader';


export const metadata = {
    title: "R & R",
    description: "An E-commerce website here to help you relax and rejuvenate.",
    keywords: "relax, rejuvenate, e-commerce",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NextTopLoader
                    showSpinner={false}
                />
                {children}
            </body>
        </html>
    );
}