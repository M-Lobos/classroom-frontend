import { Refine, /* WelcomePage */ } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import Dashboard from "./pages/Dashboard";
import { BookOpen, Building2, ClipboardCheck, GraduationCap, Home, Users } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./pages/subjects/List";
import SubjectsCreate from "./pages/subjects/Create";
import { dataProvider } from "./providers/restData";
import ClassesList from "./pages/classes/List";
import CreateClasses from "./pages/classes/Create";
import ClassesShow from "./pages/classes/Show";
import DepartmentsCreate from "./pages/departments/Create";
import DepartmentList from "./pages/departments/List";
import DepartmentShow from "./pages/departments/Show"
import FacultyList from "./pages/faculty/list"
import FacultyShow from "./pages/faculty/show"
import EnrollmentCreate from "./pages/enrollments/create"
import EnrollmentJoin from "./pages/enrollments/join";
import EnrollmentConfirm from "./pages/enrollments/confirm";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: {
                    label: 'Home',
                    icon: <Home />
                  }
                },
                {
                  name: 'subjects',
                  list: '/subjects',
                  create: '/subjects/create',
                  meta: {
                    label: 'Subjects',
                    icon: <BookOpen />
                  }
                },
                {
                  name: 'departments',
                  list: '/departments',
                  create: '/departments/create',
                  show: '/departments/show/:id',
                  meta: {
                    label: 'Departments',
                    icon: <Building2 />
                  }
                },
                {
                  name: "users",
                  list: "/faculty",
                  show: "/faculty/show/:id",
                  meta: {
                    label: "Faculty",
                    icon: <Users />,
                  },
                },
                {
                  name: "enrollments",
                  list: "/enrollments/create",
                  create: "/enrollments/create",
                  meta: {
                    label: "Enrollments",
                    icon: <ClipboardCheck />
                  }
                },
                {
                  name: 'classes',
                  list: '/classes',
                  create: '/classes/create',
                  show: '/classes/show/:id',
                  meta: {
                    label: 'Classes',
                    icon: <GraduationCap />
                  }
                },
              ]}
            >
              <Routes>
                <Route element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }>

                  <Route path="/" element={<Dashboard />} />

                  <Route path="/subjects">
                    <Route index element={<SubjectList />} />
                    <Route path="create" element={<SubjectsCreate />} />
                  </Route>


                  <Route path="/departments">
                    <Route index element={<DepartmentList />} />
                    <Route path="create" element={<DepartmentsCreate />} />
                    <Route path="show/:id" element={<DepartmentShow />} />
                  </Route>

                  <Route path="faculty">
                    <Route index element={<FacultyList />} />
                    <Route path="show/:id" element={<FacultyShow />} />
                  </Route>

                  <Route path="enrollments">
                    <Route path="create" element={<EnrollmentCreate />} />
                    <Route path="join" element={<EnrollmentJoin />} />
                    <Route path="confirm" element={<EnrollmentConfirm />} />
                  </Route>

                  <Route path="/classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<CreateClasses />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>


                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
