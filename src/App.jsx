import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getAuthToken } from "./Hooks/LocalStorage";
import { UserInfoApi } from "./api/api.Auth";
import store from "./redux/store";
import "./reset.css";
import router from "./router/Router";
import useAuthStore from "./zustand/store.Auth";
import useUserStore from "./zustand/store.User";
const queryClient = new QueryClient();

function App() {
  const { token, setToken } = useAuthStore();
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = getAuthToken();
      if (token && token != null) {
        setToken(token);
        const userInfo = await UserInfoApi(token);
        console.log(userInfo);
        setUser(userInfo);
      }
      setLoading(false);
    };
    init();
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
