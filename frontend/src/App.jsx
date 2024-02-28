import { Provider } from "react-redux";
import Layout from "./components/Layout";
import Store from "./components/Store";

export default function App() {
  return (
    
    <Provider store={Store}>

    <Layout/>
    </Provider>
  )
}
