import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';
import { Chat, PencilLine } from 'phosphor-react';

export const items = [
    {
        title: 'Обзор',
        path: '/',
        icon: (
          <SvgIcon fontSize="small">
              <ChartBarIcon/>
          </SvgIcon>
        )
    },
    {
        title: 'Пользователи',
        path: '/users',
        icon: (
          <SvgIcon fontSize="small">
              <UsersIcon/>
          </SvgIcon>
        )
    },

    {
        title: 'Сообщения',
        path: '/messages',
        icon: (
          <SvgIcon fontSize="small">
              <Chat/>
          </SvgIcon>
        )
    },
    {
        title: 'Регистрация пользователя',
        path: '/add/user',
        icon: (
          <SvgIcon fontSize="small">
              <UserPlusIcon/>
          </SvgIcon>
        )
    },
    {
        title: 'Ред. пользователей',
        path: '/edit/user',
        icon: (
          <SvgIcon fontSize="small">
              <PencilLine />
          </SvgIcon>
        )
    },
    {
        title: 'Настройки',
        path: '/settings',
        icon: (
          <SvgIcon fontSize="small">
              <CogIcon/>
          </SvgIcon>
        )
    },
];
