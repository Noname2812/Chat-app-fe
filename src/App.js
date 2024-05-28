import { Route, Routes } from "react-router-dom";
import "./styles/index.css";
import HomeComponent from "./pages/home";
import LoginPage from "./pages/login";
import { RequireAuth } from "./components/RequiredAuth";
function App() {
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
// https://viblo.asia/p/react-router-dom-v6-maGK7BQB5j2
