import { LazyLoad } from "@/common/LazyLoad";
import MainLayout from "@/layout/MainLayout";
import { ROUTES } from "@/lib/constants/routes";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/Login"))
const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const DepartmentsPage = lazy(() => import('@/pages/Departments'))

export const routes: RouteObject[] = [
    {
        path: ROUTES.LOGIN,
        element: LazyLoad(LoginPage)
    },
    {
        path: '/*',
        element: <MainLayout />,
        children: [
            {
                path: ROUTES.DASHBOARD,
                element: LazyLoad(DashboardPage)
            },
            {
                path: ROUTES.DEPARTMENTS,
                element: LazyLoad(DepartmentsPage)
            },
        ]
    }
]