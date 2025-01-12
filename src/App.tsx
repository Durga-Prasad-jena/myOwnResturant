import { createBrowserRouter,Outlet } from "react-router-dom";
import Resturant from "./features/resturant/Resturant";
import "./App.css"
import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./componets/Header";
import { Addresturant } from "./features/addresturant/Addresturant";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Resturant />,
      },
      {
        path: "/addResturant",
        element: <Addresturant />,
      },
     
      {
        path: "/addResturant/:id",
        element: <Addresturant />,
      },
     
    ],
  },
]);

function App() {
  return (
    <>
    <Provider store={store}>
         <Header/>
         <Outlet/>
    </Provider>
    </>
  );
}

export default App;
