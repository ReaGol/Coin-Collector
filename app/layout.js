import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "@components/Footer";

export const metadata = {
  title: "Coin Collection",
  description: "An app for coin collectors",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Navbar />
      {children}
      <Footer/>
    </body>
  </html>
);

export default RootLayout;
