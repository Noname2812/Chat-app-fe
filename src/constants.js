import HomeComponent from "./pages/home";
import Profile from "./pages/profile";

export const routePrivate = [
  {
    path: "/",
    component: <HomeComponent />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
];
