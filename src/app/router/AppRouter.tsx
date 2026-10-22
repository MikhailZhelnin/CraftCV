import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "../layouts/MainLayout";

import ResumesPage from "@/pages/resumes/ResumesPage";
import ProfilesPage from "@/pages/profiles/ProfilesPage";
import { ProfileEditorPage } from "@/pages/profile-editor/ProfileEditorPage";
import { ResumeEditorPage } from "@/pages/resume-editor/ResumeEditorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <ResumesPage /> },
            { path: "profiles", element: <ProfilesPage /> },
            { path: "profiles/new", element: <ProfileEditorPage /> },
            { path: "profiles/:id/edit", element: <ProfileEditorPage /> },
            { path: "resumes/:id/edit", element: <ResumeEditorPage /> },
        ],
    },
    { path: "*", element: <h1>Page not found</h1> },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
};