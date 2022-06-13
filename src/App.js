import "./App.css";
import React from "react";
import ScaryTeacher from "./ScaryTeacher";
import Minting from "./Minting";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navigate} from "react-router-dom";


function App() {
    console.log()
    return (
        <div className="App overflow-hidden">
            {/* <ScaryTeacher/> */}
            <Router>
                <Routes>
                    <Route path="/" element={<Minting/>}>
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
