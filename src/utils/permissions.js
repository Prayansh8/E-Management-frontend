import { paths } from "src/paths";

export const navItems = {
    dashboard: "dashboard",
    classes: "classes",
    finance: "finance",
    students: "students",
    teachers: "teachers",
    attendance: "attendance",
    adminstration: "adminstration",
};

const teacherAccessibleNavItems = [navItems.classes];

const teacherAccessiblePages = [
    paths.classes,
    paths.sections,
    paths.attendance,
    paths.viewClass(":id"),
    paths.viewClassSection(":id"),
    paths.takeClassSectionAttendance(":id"),
    paths.viewStudent(":id"),
    paths.viewAttendance(":id"),
];

export const canSeeNavItem = (user, item) => {
    if (user.role === 'admin' || user.role === 'owner') {
        return true;
    } else if (user.role === 'teacher' && teacherAccessibleNavItems.includes(item)) {
        return true;
    }
    return false;
};

export const canAccessPage = (user, item) => {
    if (user.role === 'admin' || user.role === 'owner') {
        return true;
    } else if (user.role === 'teacher' && teacherAccessiblePages.includes(item)) {
        return true;
    }
    return false;
};
