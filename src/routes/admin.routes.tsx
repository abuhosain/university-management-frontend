import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { Courses } from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import { OfferCourse } from "../pages/admin/courseManagement/OfferCourse";
import OfferedCourse from "../pages/admin/courseManagement/OfferedCourse";
import RegesteredSemester from "../pages/admin/courseManagement/RegesteredSemester";
import SemesterRegestration from "../pages/admin/courseManagement/SemesterRegestration";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import StudentTable from "../pages/admin/userManagement/StudentTable";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name : "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element : <CreateAcademicSemester />
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element : <AcademicSemester />
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-semester",
        element : <CreateAcademicSemester />
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element : <AcademicSemester />
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element : <CreateAcademicSemester />
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element : <AcademicSemester />
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "student-data",
        element: <StudentTable />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
    {
      name : "Semester Regestration",
      path : "semester-regestraion",
      element : <SemesterRegestration />
    },
      {
        name: "Regestered Semester",
        path: "regestered-semester",
        element: <RegesteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
    
      {
        name: "Offerf Course",
        path: "offerf-course",
        element: <OfferedCourse />,
      },
    
    ],
  },
];

// admin sidebar items

// export const adminSidebar = adminPaths.reduce((acc : TSidebarItem[], item) => {

//     if(item.path && item.name){
//         acc.push({
//             key : item.name,
//             label : <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
//         })
//     }

//     if(item.children){
//         acc.push({
//             key : item.name,
//             label : <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//             children : item.children.map((child) => ({
//                 key : child.name,
//                 label : <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
//             }))
//         })
//     }

//     return acc;
// }, []);

// progmatical way
// export const adminRoutes = adminPaths.reduce((acc : TRoute[], item) => {

//     if(item.path && item.element){
//         acc.push({
//             path : item.path,
//             element : item.element
//         })
//     }

//     if(item.children){
//         item.children.forEach((child) => {
//             acc.push({
//                 path : child.path,
//                 element : child.element
//             })
//         })
//     }

//     return acc;
// }, []);

// hard codded way

// export const adminPaths = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
// ];
