import { createRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
  useNavigate,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import {actionScroll} from "./redux/actions/utils/utils"
import Menu from "./components/navigation/menusDashboard";
import Login from "./containers/pages/login";
import SignUp from "./containers/pages/signup";
import Shipments from "./containers/pages/shipments";
import Users from "./containers/pages/users";
import Payment from "./containers/pages/payment";
import PaymentSuccess from "./containers/pages/paymentSuccess";
import PaymentCancel from "./containers/pages/paymentCancel";
import Account from "./containers/pages/account";
import UserReset from "./containers/pages/userReset";
import AdminReset from "./containers/pages/adminReset";

import Pricing from "./containers/pages/pricing";
import Location from "./containers/pages/location";
import Contact from "./containers/pages/contact";
import Home from "./containers/pages/home";
import NotFound from "./containers/errors/error404";
import "./assets/css/bootstrap.css";
import "./assets/css/administrador.css";
import "./styles.css";
import "./assets/css/styles.css";
import "./assets/css/scroll.css";
import "./assets/css/utils.css";
import store from "./store";
import { Provider, useDispatch } from "react-redux";
import Footer from "./components/navigation/footer";
import Header from "./components/navigation/header";
const pagesWithoutMenuAndDiv = ["*","/location","/contact","/pricing","/login", "/signup", "/admin/login","/auth/user-reset-password/confirm","/auth/admin-reset-password/confirm",""];
const pagesWithoutMenuAndHeader = ["/login", "/signup", "/admin/login","/auth/user-reset-password/confirm","/auth/admin-reset-password/confirm",""];

const routes = [
  {
    path: "/pricing",
    value: "pricing-0",
    name: "Pricing",
    element: <Pricing />,
    nodeRef: createRef(),
    className: "Pricing",
  },
    {
    path: "/account",
    value: "account-0",
    name: "Account",
    element: <Account />,
    nodeRef: createRef(),
    className: "Account",
  },    
{
  path: "/auth/user-reset-password/confirm",
  value: "userReset-0",
  name: "UserReset",
  element: <UserReset />,
  nodeRef: createRef(),
  className: "UserReset",
},
{
  path: "/auth/admin-reset-password/confirm",
  value: "adminReset-0",
  name: "AdminReset",
  element: <AdminReset />,
  nodeRef: createRef(),
  className: "AdminReset",
},

  {
    path: "/admin/account",
    value: "account-0",
    name: "Account",
    element: <Account />,
    nodeRef: createRef(),
    className: "Account",
  },
  {
    path: "/contact",
    value: "contact-0",
    name: "Contact",
    element: <Contact />,
    nodeRef: createRef(),
    className: "Contact",
  },
  {
    path: "/location",
    value: "location-0",
    name: "Location",
    element: <Location />,
    nodeRef: createRef(),
    className: "Location",
  },
  {
    path: "/shipments",
    value: "shipments-0",
    name: "Shipments",
    element: <Shipments />,
    nodeRef: createRef(),
    className: "Shipments",
  },
  {
    path: "/admin/shipments",
    value: "shipments-0",
    name: "Shipments",
    element: <Shipments />,
    nodeRef: createRef(),
    className: "Shipments",
  },
  {
    path: "/admin/users",
    value: "users-0",
    name: "Users",
    element: <Users />,
    nodeRef: createRef(),
    className: "Users",
  },
  {
    path: "/payment",
    value: "payment-0",
    name: "Payment",
    element: <Payment />,
    nodeRef: createRef(),
    className: "Payment",
  },
    {
    path: "/payment/success",
    value: "paymentsuccess-0",
    name: "PaymentSuccess",
    element: <PaymentSuccess />,
    nodeRef: createRef(),
    className: "PaymentSuccess",
  },
      {
    path: "/payment/cancel",
    value: "paymentcancel-0",
    name: "PaymentCancel",
    element: <PaymentCancel />,
    nodeRef: createRef(),
    className: "PaymentCancel",
  },
  {
    path: "/admin/login",
    value: "login-0",
    name: "Login",
    element: <Login />,
    nodeRef: createRef(),
    className: "Login",
  },
  

  {
    path: "/signup",
    value: "signup-0",
    name: "SignUp",
    element: <SignUp />,
    nodeRef: createRef(),
    className: "SignUp",
  },

  {
    path: "/",
    value: "0-0",
    name: "Home",
    element: <Home />,
    nodeRef: createRef(),
    className: "Home",
  },
  
 

  {
    path: "*",
    value: "NotFound",
    name: "NotFound",
    element: <NotFound />,
    nodeRef: createRef(),
    className: "NotFound",
  },
  
];
const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function Example() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentOutlet = useOutlet();
  const pathname = location.pathname.replace(/\/+$/, ""); // quita "/" final
  const isAdmin = pathname.includes("/admin");

  const routecorrect = routes.find((route) => {
    const routePath = route.path.replace(/\/+$/, "");
    return pathname === routePath;
  });

  const routeclass = routecorrect?.value || "unknown";
  const nodeRef = routecorrect?.nodeRef || null;

  const handleRightClick = (event) => {
    if (event.target.classList.contains('cardcatalogo')) {
      event.preventDefault();
    }
  };

  const onScroll = (event) => {
    dispatch(actionScroll(event.currentTarget.scrollTop));
  };
  //console.log( routecorrect?.name)
  const isNotFoundPage = !routecorrect; // Si no encuentra ruta, asumimos que es 404
  const shouldShowMenu = !isNotFoundPage && !pagesWithoutMenuAndDiv.includes(pathname);
  const shouldShowMenuAndHeaderFooter = !pagesWithoutMenuAndHeader.includes(pathname);
  console.log(shouldShowMenuAndHeaderFooter)
  console.log(shouldShowMenu)
  
  const divClassName = shouldShowMenu ? "div_contentmaster" : "";
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // Ajusta el ancho según tu break-point

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024); // Menor o igual a tablet
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <>
      {/* Mostrar Menu si corresponde */}

      {shouldShowMenu && shouldShowMenuAndHeaderFooter && (
  <Menu
  valuenav={routeclass.split("-")[0]}
  subvalue={routeclass.split("-")[1]}
  isAdmin={isAdmin}
  isMobile={isMobile}
/>
)}

     
  
      {/* Contenido de la página */}
      <div
        onScroll={onScroll}
        onContextMenu={handleRightClick}
        className={isMobile? "":divClassName}
      >
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={200}
            classNames="page"
            unmountOnExit
          >
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
  
    
    </>
  );
  
}


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
