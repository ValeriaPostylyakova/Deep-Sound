import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import Category from './components/Category.tsx';
import Home from './page/Home.tsx';

import './scss/app.scss';
import Chart from './page/Chart.tsx';
import Genres from './page/Genres.tsx';
import Collections from './page/Collections.tsx';

function App() {
    const [activePlayer, setActivePlayer] = React.useState<boolean>(false);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Sidebar />

                <main className="main">
                    <div className="main__container">
                        <Category />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="chart" element={<Chart />} />
                            <Route path="genres" element={<Genres />} />
                            <Route
                                path="collections"
                                element={<Collections />}
                            />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
