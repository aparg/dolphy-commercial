import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./icons.css";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Public_Sans, Figtree } from "next/font/google";
import { Providers } from "./providers";
import { ComparisionFlagProvider } from "@/components/context/ComparisonFlagContext";

const public_sans = Public_Sans({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });

// export const metadata = {
//   alternates: {
//     canonical: `https://dolphy.ca/`,
//   },
//   title: "Dolphy - Commercial Real Estate for Sale in Ontario",
//   description:
//     "Find the latest Commercial Real Estate for sale in Ontario with the Ontario's most user-friendly portal. Search real estate to buy in Ontario.",
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 1,
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       noimageindex: true,
//     },
//   },
//   category: "real estate",
// };

async function getCities() {
  const res = await fetch("https://api.dolphy.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function RootLayout({ children }) {
  let cities = await getCities();
  return (
    <html lang="en">
      <body className={figtree.className} style={{ overflowX: "hidden" }}>
        <NextTopLoader
          color="#FFFFFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #00A1FF,0 0 5px #00A1FF"
        />
        <Providers>
          <ComparisionFlagProvider>
            <Navbar></Navbar>
            {children}
            <Footer cities={cities}></Footer>
          </ComparisionFlagProvider>
        </Providers>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
