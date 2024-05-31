import "@/styles/globals.css";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
}
