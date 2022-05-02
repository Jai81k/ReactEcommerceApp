import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import { AppstoreOutlined, UserOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";


const {subMenu} = Menu;

const Header = () => {
    const [current, setCurrent] = useState('settings'); // default menu key

    const handleClick = (e) => {
        console.log(e.key);
        setCurrent(e.key);
    }

    // Menu items
    const items = [
        {
            label: 'Home',
            key: 'home',
            icon: <AppstoreOutlined />,
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: <SettingOutlined />,
            children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                {
                    label: 'Option 1',
                    key: 'setting:1',
                },
                {
                    label: 'Option 2',
                    key: 'setting:2',
                },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                {
                    label: 'Option 3',
                    key: 'setting:3',
                },
                {
                    label: 'Option 4',  
                    key: 'setting:4',
                },
                ],
            },
            ],
        },
        


        {
            label: (
                <Link to="/register">Register</Link>
            ),
            key: 'register',
            icon: <UserAddOutlined />,
        },
        {
            label: (
                <Link to="/login">Login</Link>
            ),
            key: 'login',
            icon: <UserOutlined />
        },

        

    ];

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} />
    );
}

export default Header;