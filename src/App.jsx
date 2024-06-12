import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getAuthToken } from "./Hooks/LocalStorage";
import store from "./redux/store";
import "./reset.css";
import router from "./router/Router";
import useAuthStore from "./zustand/store";
const queryClient = new QueryClient();

function App() {
  const { token, setToken } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, [setToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
