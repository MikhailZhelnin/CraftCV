import { Outlet } from 'react-router-dom';

import AppHeader from './ui/AppHeader';

const MainLayout = () => {
    return (
        <div>
            <AppHeader />
            
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;