import { lazy, Suspense } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { Layout as AuthModernLayout } from "src/layouts/auth/modern-layout";
import { paths } from "src/paths";
import { canAccessPage } from "src/utils/permissions";
import { getCachedUser } from "src/utils/cache";
import NotFound from "src/pages/error/404";

const IndexPage = lazy(() => import("src/pages/index"));
const LogInPage = lazy(() => import("src/pages/logIn"));
const PrivacyPolicy = lazy(() =>
  import("src/pages/terms-n-conditions/privacy-policy")
);
const Grades = lazy(() => import("src/pages/grades/index"));
const AddNewGrade = lazy(() => import("src/pages/grades/add"));
const EditGrade = lazy(() => import("src/pages/grades/edit"));
const ViewGrade = lazy(() => import("src/pages/grades/view"));
const GradesSections = lazy(() => import("src/pages/grades/sections"));
const ViewGradeSection = lazy(() => import("src/pages/grades/sections/view"));
const AssignTeacher = lazy(() =>
  import("src/pages/grades/sections/assign-teacher")
);
const Students = lazy(() => import("src/pages/students/index"));
const StudentDetails = lazy(() => import("src/pages/students/detail"));
const AddStudent = lazy(() => import("src/pages/students/add"));
const ImportSummaries = lazy(() => import("src/pages/students/import-summary"));
const ImportSummariesDetail = lazy(() =>
  import("src/pages/students/import-summary/detail")
);
const TakeGradeSectionAttendance = lazy(() =>
  import("src/pages/grades/sections/take-attendance")
);
const Adminstration = lazy(() => import("src/pages/adminstration"));
const Finance = lazy(() => import("src/pages/finance/index"));
const Teachers = lazy(() => import("src/pages/teachers/index"));
const AddTeacher = lazy(() => import("src/pages/teachers/add"));
const Attendance = lazy(() => import("src/pages/attendance/index"));
const GradeAttendanceDetails = lazy(() => import("src/pages/attendance/view"));

const cachedUser = getCachedUser();

const dashboardLayoutPages = [
  {
    index: true,
    path: paths.index,
    element: <IndexPage />,
  },
  {
    path: paths.sections,
    element: <GradesSections />,
  },
  {
    path: paths.assignClassSectionTeacher,
    element: <AssignTeacher />,
  },
  {
    path: paths.viewClassSection(":id"),
    element: <ViewGradeSection />,
  },
  {
    path: paths.takeClassSectionAttendance(":id"),
    element: <TakeGradeSectionAttendance />,
  },
  {
    path: paths.finance,
    element: <Finance />,
  },
  {
    path: paths.classes,
    element: <Grades />,
  },
  {
    path: paths.addClass,
    element: <AddNewGrade />,
  },
  {
    path: paths.viewClass(":id"),
    element: <ViewGrade />,
  },
  {
    path: paths.editClass(":id"),
    element: <EditGrade />,
  },
  {
    path: paths.students,
    element: <Students />,
  },
  {
    path: paths.addStudent,
    element: <AddStudent />,
  },
  {
    path: paths.viewStudent(":id"),
    element: <StudentDetails />,
  },
  {
    path: paths.teachers,
    element: <Teachers />,
  },
  {
    path: paths.viewTeacher(":id"),
    element: <Teachers />,
  },
  {
    path: paths.addTeacher,
    element: <AddTeacher />,
  },
  {
    path: paths.adminstration,
    element: <Adminstration />,
  },
  {
    path: paths.attendance,
    element: <Attendance />,
  },
  {
    path: paths.viewAttendance(":id"),
    element: <GradeAttendanceDetails />,
  },
  {
    path: paths.studentImportSummaries,
    element: <ImportSummaries />,
  },
  {
    path: paths.studentImportSummary(":id"),
    element: <ImportSummariesDetail />,
  },
]
  .filter((item) => canAccessPage(cachedUser, item.path))
  .map((item) => ({
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
