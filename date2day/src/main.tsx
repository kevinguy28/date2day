import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import Form from "./pages/Form.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ProtectedRoute } from "./protectedRoutes/ProtectedRoutes.tsx";
import Signup from "./pages/Signup.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CreateDate from "./pages/CreateDate.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <App />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dateform"
                        element={
                            <ProtectedRoute>
                                <CreateDate />
                            </ProtectedRoute>
                        }
                    />
                    {/* Catch-all route for non-existent paths */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
