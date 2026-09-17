import { RouterProvider } from "react-router-dom";
import { router, store } from "@/app";
import { Provider } from "react-redux";
import AuthInitializer from "@/components/auth/AuthInitializer";

const App = () => {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;