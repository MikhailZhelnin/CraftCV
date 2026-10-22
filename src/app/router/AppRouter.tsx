import { Route, Routes } from 'react-router';

import MainLayout from '../layouts/MainLayout';

import ResumesPage from '@/pages/resumes/ResumesPage';
import ProfilesPage from '@/pages/profiles/ProfilesPage';
import { ProfileEditorPage } from '@/pages/profile-editor/ProfileEditorPage';
import { ResumeEditorPage } from '@/pages/resume-editor/ResumeEditorPage';

export function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index path="/" element={<ResumesPage />} />
                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="profiles/new" element={<ProfileEditorPage />} />
                <Route path="profiles/:id/edit" element={<ProfileEditorPage />} />
                <Route path="resumes/:id/edit"element={<ResumeEditorPage />}/>
            </Route>

            <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
    );
};