import "./App.css";
// https://v5.reactrouter.com/web/guides/quick-start
import Home from "./screens/Home";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup";
import MyOrder from "./screens/MyOrder";
import ForgotPasswordForm from "./screens/ForgotPasswordForm.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import Feedback from "./screens/Feedback.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SendOtp from "./screens/SendOtp.jsx";
import OtpLogin from "./screens/OtpLogin.jsx";
import Carts from "./screens/Cart";
// add bootstrap
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; //npm i bootstrap-dark-5 boostrap
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>} />
          <Route exact path="/login" element={<Login></Login>} />
          <Route exact path="/createuser" element={<Signup></Signup>} />
          <Route exact path="/myOrder" element={<MyOrder></MyOrder>} />
          <Route
            exact
            path="/userProfile"
            element={<UserProfile></UserProfile>}
          />
          <Route exact path="/contact" element={<Feedback></Feedback>} />
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPasswordForm></ForgotPasswordForm>}
          ></Route>
          <Route exact path="/sendotp" element={<SendOtp></SendOtp>}></Route>
          <Route exact path="/otplogin" element={<OtpLogin></OtpLogin>}></Route>
          <Route exact path="/cart" element={<Carts></Carts>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
