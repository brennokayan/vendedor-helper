import { FormControlLabel, Switch } from "@mui/material";
import { useThemeContext } from "../../contexts/ThemeContext";
import ComponenteNavBar from "../../components/navBar";

export function Configuracoes() {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <div>
      <ComponenteNavBar section="Configurações" />
      <h1>Configurações</h1>
      <FormControlLabel
        control={
          <Switch
            checked={themeMode === "dark"}
            onChange={toggleTheme}
            color="primary"
          />
        }
        label={`Tema: ${themeMode === "light" ? "Claro" : "Escuro"}`}
      />
    </div>
  );
}
