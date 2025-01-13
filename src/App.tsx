import { ThemeContextProvider } from "./contexts/ThemeContext";
import { DefaultRoutes } from "./routes/defaultRoutes";

export default function App() {
  return (
    <>
      <ThemeContextProvider>
        <DefaultRoutes />
      </ThemeContextProvider>
    </>
  );
}
