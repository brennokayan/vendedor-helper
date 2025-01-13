import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Configuracoes } from "../pages/configuracoes";
import { Dashboard } from "../pages/dashboard";
import { Financeiro } from "../pages/financeiro";
import { Mesas } from "../pages/mesas";
import { Produtos } from "../pages/produtos";
import { Balcao } from "../pages/balcao";


export function DefaultRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mesas" element={<Mesas />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/financeiro" element={<Financeiro />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/balcao" element={<Balcao />} />
            </Routes>
        </BrowserRouter>
    );
}
