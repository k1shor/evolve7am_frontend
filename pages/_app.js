import "@/styles/globals.css";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import StoreProvider from "./StoreProvider";

export default function App({ Component, pageProps }) {
  return <>
    <StoreProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </StoreProvider>
  </>
}
