import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  AuthLayout,
  HomePageInLogout,
  NotUserThenHistory,
} from "../components";

import {
  CreatePlaylist,
  DashboardPage,
  HomePage,
  LoginPage,
  NotUserThenYouPage,
  SignupPage,
  UploadVideoPage,
  UserProfilePage,
  VideoWatchPage,
  ViewPlaylistPage,
  WatchHistoryPage,
  YouPage,
} from "../pages";
import NotUserSubscriptionPage from "../pages/not-login-pages/NotUserSubscriptionPage";
import NotUserThenLikedVidPage from "../pages/not-login-pages/NotUserThenLikedVidPage";
import ErrorPage from "../components/ErrorPage";
import VideoEditPage from "../pages/videos/VidoeEditPage";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        // element: <HomePageInLogout />,
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/feed/you",
        element: (
          <AuthLayout authentication={false}>
            <NotUserThenYouPage />
          </AuthLayout>
        ),
      },
      {
        path: "/feed-you",
        element: (
          <AuthLayout authentication={true}>
            <YouPage />
          </AuthLayout>
        ),
      },
      {
        path: "/feed/history",
        element: (
          <AuthLayout authentication={false}>
            <NotUserThenHistory />
          </AuthLayout>
        ),
      },
      {
        path: "/feed/subscriptions",
        element: (
          <AuthLayout authentication={false}>
            <NotUserSubscriptionPage />
          </AuthLayout>
        ),
      },
      {
        path: "/feed/liked-videos",
        element: (
          <AuthLayout authentication={false}>
            <NotUserThenLikedVidPage />
          </AuthLayout>
        ),
      },
      {
        path: "/watch/:videoId",
        element: <VideoWatchPage />,
      },
      {
        path: "/upload",
        element: (
          <AuthLayout authentication={true}>
            <UploadVideoPage />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <DashboardPage />
          </AuthLayout>
        ),
      },
      {
        path: "/watch-history",
        element: (
          <AuthLayout authentication={true}>
            <WatchHistoryPage />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-video/:videoId",
        element: (
          <AuthLayout authentication={true}>
            <VideoEditPage />
          </AuthLayout>
        ),
      },
      {
        path: "/profile/:userId",
        element: (
          <AuthLayout authentication={true}>
            <UserProfilePage />
          </AuthLayout>
        ),
      },
      {
        path: "/playlist/:playlistId",
        element: (
          <AuthLayout authentication={true}>
            <ViewPlaylistPage />
          </AuthLayout>
        ),
      },
      {
        path: "/playlist/:playlistId/create",
        element: (
          <AuthLayout authentication={true}>
            <CreatePlaylist />
          </AuthLayout>
        ),
      },
      {
        path: "/videos",
        element: (
          <AuthLayout authentication={true}>
            <HomePage />
          </AuthLayout>
        ),
      },
    ],
  },
]);
