import { Route, Routes } from "react-router-dom";
import "./styles/index.css";
import HomeComponent from "./pages/home";
import LoginPage from "./pages/login";
import { RequireAuth } from "./components/RequiredAuth";
import { useAppSelector } from "./redux/store";
import { getAuthState } from "./redux/reducers/authReducers";
import { useEffect } from "react";
import { HubConnection } from "./lib/HubConnection";
function App() {
  const { user } = useAppSelector(getAuthState);
  useEffect(() => {
    if (user) {
      HubConnection.connection(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} default />
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomeComponent />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<></>} />
        <Route path="/courses" element={<div>product</div>} />
        <Route path="/courses/:courseId" element={<div>detail</div>} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
