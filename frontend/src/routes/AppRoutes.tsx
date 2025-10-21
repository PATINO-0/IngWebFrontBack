// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Vistas existentes
import HomePage from "../views/HomePage";
import ThreeDemoView from "../views/ThreeDemoView";
import LayoutsView from "../views/LayoutsView";
import SpeechDemoView from "../views/SpeechDemoView";
import GeometryExplorer from "../views/GeometryExplorer";
import SettingsView from "../views/SettingsView";
import TablasMul from "../views/TablasMul";
import ConversorUnid from "../views/ConversorUnid";
import ValidContrasena from "../views/ValidContrasena";
import ContadorClics from "../views/ContadorClics";
import ListaTareas from "../views/ListaTareas";

// Nuevas vistas API
import LoginView from "../views/LoginView";
import ProductsView from "../views/ProductsView";
import ProductDetailView from "../views/ProductDetailView";
import ProductCreateView from "../views/ProductCreateView";
import CategoriesView from "../views/CategoriesView";
import ProfileView from "../views/ProfileView";
import OrderBuilderView from "../views/OrderBuilderView";

import { Protected } from "./Protected";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* públicas existentes */}
        <Route index element={<HomePage />} />
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />
        <Route path="tablasmul" element={<TablasMul />} />
        <Route path="conversorunid" element={<ConversorUnid />} />
        <Route path="validcontrasena" element={<ValidContrasena />} />
        <Route path="contadorclics" element={<ContadorClics />} />
        <Route path="listareas" element={<ListaTareas />} />

        {/* API: públicas */}
        <Route path="api/login" element={<LoginView />} />
        <Route path="api/products" element={<ProductsView />} />
        <Route path="api/products/:id" element={<ProductDetailView />} />

        {/* API: protegidas */}
        <Route
          path="api/products/new"
          element={
            <Protected>
              <ProductCreateView />
            </Protected>
          }
        />
        <Route
          path="api/categories"
          element={
            <Protected>
              <CategoriesView />
            </Protected>
          }
        />
        <Route
          path="api/profile"
          element={
            <Protected>
              <ProfileView />
            </Protected>
          }
        />
        <Route
          path="api/order-builder"
          element={
            <Protected>
              <OrderBuilderView />
            </Protected>
          }
        />
      </Route>
    </Routes>
  );
}
