import { appConfig } from "src/config";
import {
  reqAnonGet,
  reqAnonPost,
  reqGet,
  reqPatch,
  reqPost,
  getAuthHeaders,
} from "../utils/requests";

const hostname = window.location.hostname;
const tenantHostPrefix = hostname.split(".")[0];
let apiBaseUrl = `http://${tenantHostPrefix}.localhost:5000`;

const apiCalls = {
  login: async (data) => await reqAnonPost(`${apiBaseUrl}/login/`, data),
  thisTenant: async () => await reqAnonGet(`${apiBaseUrl}/`),
  // getDashboardStats: async (params) =>
  //   await reqGet(`${apiBaseUrl}/dashboard-stats/`, params),
  // getUsers: async (params) => await reqGet(`${apiBaseUrl}/users/`, params),
  // getNonPagedUsers: async (params) =>
  //   await reqGet(`${apiBaseUrl}/users/no-page`, params),
  // createUsers: async (data) => await reqPost(`${apiBaseUrl}/users/`, data),
  // getStudents: async (params) =>
  //   await reqGet(`${apiBaseUrl}/students/`, params),
  // getStudentDetails: async (id) =>
  //   await reqGet(`${apiBaseUrl}/students/${id}/`),
  // getStudentFeeDetails: async (id) =>
  //   await reqGet(`${apiBaseUrl}/students/${id}/fee/`),
  // updateStudentFee: async (id, data) =>
  //   await reqPost(`${apiBaseUrl}/students/${id}/fee/`, data),
  // getStudentsImportSummaries: async () =>
  //   await reqGet(`${apiBaseUrl}/students-import-summary/`),
  // getStudentsImportSummaryDetail: async (id) =>
  //   await reqGet(`${apiBaseUrl}/students-import-summary/${id}/`),
  // getRecentlyAddedStudents: async (params) =>
  //   await reqGet(`${apiBaseUrl}/students/recently-added/`, params),
  // createStudents: async (data) =>
  //   await reqPost(`${apiBaseUrl}/students/`, data),
  // getStudentsStats: async (params) =>
  //   await reqGet(`${apiBaseUrl}/students/stats/`, params),
  // getGrades: async () => await reqGet(`${apiBaseUrl}/grades/`),
  // getGrade: async (id) => await reqGet(`${apiBaseUrl}/grades/${id}/`),
  // createGrade: async (data) => await reqPost(`${apiBaseUrl}/grades/`, data),
  // updateGrade: async (id, data) =>
  //   await reqPatch(`${apiBaseUrl}/grades/${id}/`, data),
  // getGradesQuickList: async () =>
  //   await reqGet(`${apiBaseUrl}/grades/quick-list/`),
  // getGradesSection: async (id) =>
  //   await reqGet(`${apiBaseUrl}/grade-sections/${id}/`),
  // updateGradesSection: async (id, data) =>
  //   await reqPatch(`${apiBaseUrl}/grade-sections/${id}/`, data),
  // saveGradesSectionAttendance: async (id, data) =>
  //   await reqPost(`${apiBaseUrl}/grade-sections/${id}/save-attendance/`, data),
  // getGradesSectionAllStudents: async (id) =>
  //   await reqGet(`${apiBaseUrl}/grade-sections/${id}/all-students/`),
  // getGradesSectionsList: async () =>
  //   await reqGet(`${apiBaseUrl}/grades/sections-list/`),
  // getAttendance: async (params) =>
  //   await reqGet(`${apiBaseUrl}/attendance/`, params),
  // getAttendanceStats: async (params) =>
  //   await reqGet(`${apiBaseUrl}/attendance/stats/`, params),
  // getDateRangeAttendance: async (params) =>
  //   await reqGet(`${apiBaseUrl}/attendance/in-date-range/`, params),
  // getGradesSectionAttendances: async (params) =>
  //   await reqGet(`${apiBaseUrl}/attendance/`, params),
  // getGradesSectionAttendanceDetails: async (id, params) =>
  //   await reqGet(`${apiBaseUrl}/attendance/${id}/`, params),
  // updatedStudentMarkedAttendance: async (id, data) =>
  //   await reqPost(`${apiBaseUrl}/attendance/${id}/update/`, data),
  // getTransactions: async (params) =>
  //   await reqGet(`${apiBaseUrl}/transactions/`, params),
  // getTransactionsStats: async (params) =>
  //   await reqGet(`${apiBaseUrl}/transactions/stats/`, params),
  // getTransactionDetails: async (id, params) =>
  //   await reqGet(`${apiBaseUrl}/transactions/${id}/`, params),
  // searchGlobally: async (params) =>
  //   await reqGet(`${apiBaseUrl}/global-search/`, params),
  // uploadStudents: async (data) =>
  //   await reqPost(`${apiBaseUrl}/students/import/`, data, {
  //     ...getAuthHeaders(),
  //     "Content-Type": "multipart/form-data",
  //   }),
  // uploadUsers: async (data) =>
  //   await reqPost(`${apiBaseUrl}/users/import/`, data, {
  //     ...getAuthHeaders(),
  //     "Content-Type": "multipart/form-data",
  //   }),
};

export default apiCalls;
