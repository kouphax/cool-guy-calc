import * as React from "react";
import {Link, Route, Routes} from "react-router-dom";
import {App as Sums} from './App';

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/times/:numbers" element={<Sums/>}/>
            </Routes>
        </div>
    );
}

function LandingPage() {
    return (
        <>
            <main>
                <h1>COOL:GUY:CALC</h1>
                <h2 className="subheader">YOU CAN DO THIS I BELIEVE IN YOU</h2>
            </main>
            <nav className="times-button-container">
                <Link to="/times/1"><div className="times-button">1 ✖</div></Link>
                <Link to="/times/2"><div className="times-button">2 ✖</div></Link>
                <Link to="/times/3"><div className="times-button">3 ✖</div></Link>
                <Link to="/times/4"><div className="times-button">4 ✖</div></Link>
                <Link to="/times/5"><div className="times-button">5 ✖</div></Link>
                <Link to="/times/6"><div className="times-button">6 ✖</div></Link>
                <Link to="/times/7"><div className="times-button">7 ✖</div></Link>
                <Link to="/times/8"><div className="times-button">8 ✖</div></Link>
                <Link to="/times/9"><div className="times-button">9 ✖</div></Link>
                <Link to="/times/10"><div className="times-button">10 ✖</div></Link>
                <Link to="/times/1,2,3,4,5,6,7,8,9,10"><div className="times-button times-button-wider">﹡✖</div></Link>
            </nav>
        </>
    );
}

export default App;