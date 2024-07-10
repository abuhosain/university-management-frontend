import { ReactNode } from "react";

export type TSidebarItem = {
    key : string;
    label : ReactNode;
    children? : TSidebarItem[];
}

export type TUsersPath = {
    name: string,
    path?: string,
    element?: ReactNode,
    children? : TUsersPath[];
}

export type TRoute = {
    path: string;
    element: ReactNode;
  };
  