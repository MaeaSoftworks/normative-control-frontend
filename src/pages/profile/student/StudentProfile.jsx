import css from './StudentProfile.module.css';
import Header from "../../../components/header/Header.jsx";
import Footer from "../../../components/footer/Footer.jsx";
import React from "react";
import {useLocation} from "react-router-dom";
import Verilog from "./verilog/Verilog.jsx";
import EditProfile from "../commonComponents/edit/EditProfile.jsx";
import Menu from "../commonComponents/menu/Menu.jsx";

export default function StudentProfile() {
    const location = useLocation();
    const menuElements = [
        {
            title: 'Изменить личные данные',
            path: '/profile/edit'
        },
        {
            title: 'Мои проверки',
            path: '/profile/list'
        }
    ];

    return (
        <div>
            <Header/>
            <Menu elements={menuElements}/>
            {location.pathname === menuElements[0].path && <EditProfile/>}
            {(location.pathname === menuElements[1].path || location.pathname === '/profile') && <Verilog/>}
            <Footer/>
        </div>
    );
}