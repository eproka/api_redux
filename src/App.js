import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./routes/Registration";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Notes from "./routes/Notes";
import CreateNote from "./routes/CreateNote";
import EditNote from "./routes/EditNote";
import ViewNote from "./routes/ViewNote";
import NotFound from "./routes/NotFound";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Router>

          <div className="app-container">
            <Routes>
              <Route path="/" element={<Navigate to="/registration" />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/edit-note/:noteId" element={<EditNote />} />
              <Route path="/view-note/:noteId" element={<ViewNote />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <footer className="footer">
              <div className="footer-left">Created by: Proka Egor</div>
              <div className="footer-right">BSU : 2023</div>
            </footer>
          </div>
      </Router>
    </Provider>
  );
}
