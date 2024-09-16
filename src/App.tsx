import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import Home from './page/Home.tsx';

import './scss/app.scss';
import Category from './components/Category.tsx';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Sidebar />
                <main className="main">
                    <div className="main__container">
                        <Category />
                        <Home />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
