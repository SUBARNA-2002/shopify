import AppNavigation from "./src/navigation/index";
import { CartProvider } from "./src/context/CartContext";
const App = () => {
  return (
    <CartProvider>
      <AppNavigation />
    </CartProvider>
  );
};

export default App;
