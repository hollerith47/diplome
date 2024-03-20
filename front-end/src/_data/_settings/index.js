import {Bell, ClipboardText, Image, Info, Key, Keyboard, Lock, MarkerCircle} from "phosphor-react";
import React from "react";

export const Settings_Menu = [
    {
        key: 1,
        icon: <Bell size={20}/>,
        text: "Уведомления",
    },
    {
        key: 2,
        icon: <Lock size={20}/>,
        text: "Конфиденциальность",
    },
    {
        key: 3,
        icon: <Key size={20}/>,
        text: "Безопасность",
    },
    {
        key: 4,
        icon: <MarkerCircle size={20}/>,
        text: "Тема",
    },
    {
        key: 5,
        icon: <Image size={20}/>,
        text: "Фон чата",

    },
    {
        key: 6,
        icon: <ClipboardText size={20}/>,
        text: "Запросить информацию об аккаунте",
    },
    {
        key: 7,
        icon: <Keyboard size={20}/>,
        text: "Горячие клавиши",
    },
    {
        key: 8,
        icon: <Info size={20}/>,
        text: "Помощь",
    },
]
