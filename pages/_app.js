import Layout from "@/components/layout/Layout";
import store from "@/redux/store";

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }) {

  


  return (

    <SessionProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </Provider>
    </SessionProvider>

  );
}
