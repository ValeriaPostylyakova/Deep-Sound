import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import Home from './page/Home.tsx';

import './scss/app.scss';
import Chart from './page/Chart.tsx';
import Genres from './page/Genres.tsx';
import Collections from './page/Collections.tsx';
import Favorite from './page/Favorite.tsx';
import Player from './components/FullPlayer/Player.tsx';
import PlayerSlider from './components/PlayerSlider.tsx';
import Genre from './page/Genre.tsx';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Sidebar />

                <main className="main">
                    <div className="main__container">
                        {/*<Category />*/}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="chart" element={<Chart />} />
                            <Route path="genres" element={<Genres />} />
                            <Route
                                path="collections"
                                element={<Collections />}
                            />
                            <Route path="favorite" element={<Favorite />} />
                            <Route path="/genres/pop" element={<Genre />} />
                            <Route path="/genres/rock" element={<Genre />} />
                            <Route path="/genres/indie" element={<Genre />} />
                            <Route
                                path="/genres/alternative"
                                element={<Genre />}
                            />
                            <Route path="/genres/rep" element={<Genre />} />
                        </Routes>
                    </div>
                </main>
            </div>
            <Player />
            <PlayerSlider />
        </div>
    );
}

export default App;
