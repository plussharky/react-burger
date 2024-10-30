import Home from "./pages/home";
import Feed from "./pages/feed";
import { Order } from "./pages/order";
import { useEffect } from "react";
import Login from "./pages/login";
import { Profile } from "./pages/profile";
import { Register } from "./pages/register";
import { useDispatch } from "./hooks/react-redux";
import { Modal } from "./components/modal/modal";
import ResetPassword from "./pages/reset-password";
import ForgotPassword from "./pages/forgot-password";
import { checkUserAuth } from "./services/auth/actions";
import AppHeader from "./components/app-header/app-header";
import { loadIngredients } from "./services/ingredients/actions";
import { OnlyAuth, OnlyUnAuth } from "./components/protected-route";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { IngredientDetails } from "./components/burger-ingredients/ingredient-category/ingredient-card/ingredient-detalis/ingredient-details";
import { OrderInfo } from "./components/order-info/order-info";
import { ProfileOrders } from "./pages/profile-orders";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
        <Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrders />} />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<Order />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;