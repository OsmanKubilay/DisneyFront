import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import Category from "views/adminCategory";
import Movie from "views/adminMovie";
import User from "views/adminUser";
import Role from "views/adminRole";
import Series from "views/adminSeries";


import SelectProfile from "views/selectProfile";

var routes = [
  {
    path: "/category-list",
    name: "Kategori",
    icon: "nc-icon nc-single-02",
    component: <Category />,
    layout: "/admin",
  },
  {
    path: "/movie-list",
    name: "Film",
    icon: "nc-icon nc-single-02",
    component: <Movie />,
    layout: "/admin",
  },
  {
    path: "/series-list",
    name: "Dizi ",
    icon: "nc-icon nc-single-02",
    component: <Series />,
    layout: "/admin",
  },
  {
    path: "/user-list",
    name: "Kullanıcı",
    icon: "nc-icon nc-single-02",
    component: <User />,
    layout: "/admin",
  },
  {
    path: "/role-list",
    name: "Rol",
    icon: "nc-icon nc-single-02",
    component: <Role />,
    layout: "/admin",
  },
  {
    path: "/select-profile",
    name: "(Taşıncak)Profile ",
    icon: "nc-icon nc-single-02",
    component: <SelectProfile />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "(Taşınacak)User Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  }
];
export default routes;
