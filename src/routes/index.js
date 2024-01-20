import { lazy, Suspense } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { Layout as AuthModernLayout } from "src/layouts/auth/modern-layout";
import { paths } from "src/paths";
import NotFound from "src/pages/error/404";
const IndexPage = lazy(() => import("src/pages/index"));
const AllProjects = lazy(() => import("src/pages/projects/AllProjects"));
const LogInPage = lazy(() => import("src/pages/logIn"));
const PrivacyPolicy = lazy(() =>
  import("src/pages/terms-n-conditions/privacy-policy")
);

const dashboardLayoutPages = [
  {
    index: true,
    path: paths.index,
    element: <IndexPage />,
  },
  {
    path: paths.projects,
    element: <AllProjects />,
  },
].map((item) => ({
  ...item,
  element: (
    <DashboardLayout>
      <Suspense>{item.element}</Suspense>
    </DashboardLayout>
  ),
}));

const FullPageLayoutPages = [
  {
    path: "*",
    element: <NotFound />,
  },
];

export const routes = [...dashboardLayoutPages, ...FullPageLayoutPages];

export const nonPrivateRoutes = [
  {
    index: true,
    element: (
      <AuthModernLayout>
        <LogInPage />
      </AuthModernLayout>
    ),
  },
];

export const publicRoutes = [
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
];
