import {Provider} from "react-redux"
import Layout from "../components/Layout"

import store from "../store"

import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  ) 
}
