import React from "react";
import logo from "./logo.svg";
import { Router } from "react-router-dom";
import { Layout } from "antd";
import AppRouter from "./app/router/AppRouter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
