import React from "react";
import UserManager from "./components/UserManager";
import SearchHistoryManager from "./components/SearchHistoryManager";
import "./App.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import Search from './components/Search';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [showGrid, setShowGrid] = React.useState(false);
    

    React.useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`App${isDarkMode ? ' dark' : ''}`}>
            <div className="red-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ margin: 0 }}>契約書</h1>
                <IconButton onClick={() => setIsDarkMode((prev) => !prev)}>
                    <DarkModeIcon />
                </IconButton>
            </div>
            <div style={{ margin: '24px 0', display: 'flex', justifyContent: 'center' }}>
                <Search onSearch={() => setShowGrid(true)} />
            </div>
            <div className="content">
                {showGrid && <UserManager isDarkMode={isDarkMode} />}
                <SearchHistoryManager />
            </div>
        </div>
    );
};

export default App;