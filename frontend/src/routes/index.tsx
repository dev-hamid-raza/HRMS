import { LazyLoad } from "@/common/LazyLoad";
import { ROUTES } from "@/lib/constants/routes";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/Login"))

export const routes: RouteObject[] = [
    {
        path: ROUTES.LOGIN,
        element: LazyLoad(LoginPage)
    }
]