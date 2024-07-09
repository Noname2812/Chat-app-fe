import HomeComponent from "./pages/home";
import Profile from "./pages/profile";
import SearchPageComponent from "./pages/search/Index";

export const routePrivate = [
  {
    path: "/",
    component: <HomeComponent />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/search/:search",
    component: <SearchPageComponent />,
  },
];
