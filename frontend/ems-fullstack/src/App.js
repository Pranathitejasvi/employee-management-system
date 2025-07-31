import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import LoginPage from "./component/LoginPage";

import ListEmployeeComponent from "./component/ListEmployeeComponent";

import EmployeeComponent from "./component/EmployeeComponent";

import Header from "./component/Header"; // ✅ IMPORT HEADER

import React from "react";



function PrivateRoute({ children }) {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/login" />;

}



// ✅ HIDE HEADER ON LOGIN PAGE

function AppLayout() {

  const location = useLocation();

  const hideHeader = location.pathname === "/login";



  return (

    <>

      {!hideHeader && <Header />}

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route

          path="/"

          element={

            <PrivateRoute>

              <ListEmployeeComponent />

            </PrivateRoute>

          }

        />

        <Route

          path="/add-employee"

          element={

            <PrivateRoute>

              <EmployeeComponent />

            </PrivateRoute>

          }

        />

        <Route

          path="/update-employee/:id"

          element={

            <PrivateRoute>

              <EmployeeComponent />

            </PrivateRoute>

          }

        />

      </Routes>

    </>

  );

}



function App() {

  return (

    <BrowserRouter>

      <AppLayout />

    </BrowserRouter>

  );

}



export default App;