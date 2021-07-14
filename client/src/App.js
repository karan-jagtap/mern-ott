import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Decider from "./components/decider/Decider";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Decider} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/admin-dashboard" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
