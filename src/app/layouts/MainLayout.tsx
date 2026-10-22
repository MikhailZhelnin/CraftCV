import { Outlet } from 'react-router-dom';

import AppHeader from './ui/AppHeader';

const MainLayout = () => {
    return (
        <div className="flex h-dvh flex-col overflow-hidden">
            <AppHeader />

            <main className="min-h-0 flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;