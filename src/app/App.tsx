import { RouterProvider } from "react-router-dom";
import { router, store } from "@/app";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
