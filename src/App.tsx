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
import Favorite from './page/Favorite.tsx';
import Player from './components/FullPlayer/Player.tsx';
import PlayerSlider from './components/PlayerSlider.tsx';
import GenresPop from './page/GenresPop.tsx';

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
                            <Route path="genres/pop" element={<GenresPop />} />
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
