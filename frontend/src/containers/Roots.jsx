import { useState, useCallback } from "react";
import MainNav from "../components/navigation/MainNav";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <>
            <MainNav />
            <main>
                <Outlet />
            </main>
        </>
    );
}