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
import PlayerPlaylist from './components/PlayerPlaylist.tsx';
import Collection from './page/Collection.tsx';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Sidebar />

                <main className="main">
                    <div className="main__container">
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
                            <Route path="/genres/dance" element={<Genre />} />
                            <Route path="/genres/rap" element={<Genre />} />
                            <Route
                                path="/collections/hits"
                                element={<Collection />}
                            />
                            <Route
                                path="/collections/new_music"
                                element={<Collection />}
                            />
                            <Route
                                path="/collections/party"
                                element={<Collection />}
                            />
                            <Route
                                path="/collections/children"
                                element={<Collection />}
                            />
                        </Routes>
                    </div>
                </main>
            </div>
            <Player />
            <PlayerSlider />
            <PlayerPlaylist />
        </div>
    );
}

export default App;
