import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
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
import CustomPlaylists from './page/CustomPlaylists.tsx';
import CreateCustomPlaylist from './page/CreateCustomPlaylist.tsx';

import { useTheme } from './hooks/theme.ts';
import PlayerCustomPlaylist from './components/PlayerCustomPlaylist.tsx';
import Registration from './page/Registration.tsx';
import Authorization from './page/Authorization.tsx';

function App() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="wrapper">
            <Header theme={theme} setTheme={setTheme} />
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
                            <Route
                                path="/custom"
                                element={<CustomPlaylists />}
                            />
                            <Route
                                path="/custom-playlist/:id"
                                element={<CreateCustomPlaylist />}
                            />
                            <Route
                                path="/registration"
                                element={<Registration />}
                            />
                            <Route
                                path="/authorization"
                                element={<Authorization />}
                            />
                        </Routes>
                    </div>
                </main>
            </div>
            <Player />
            <PlayerSlider />
            <PlayerPlaylist />
            <PlayerCustomPlaylist />
        </div>
    );
}

export default App;
