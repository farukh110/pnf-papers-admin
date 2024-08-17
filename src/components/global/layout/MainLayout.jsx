import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, List, Menu, theme } from 'antd';
import { RiCustomerService2Line, RiDashboard3Line, RiProductHuntLine } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineBgColors } from 'react-icons/ai';
import { GoDot } from 'react-icons/go';
import { PiClipboardText } from 'react-icons/pi';
import { TbBrandAirtable, TbBrandBlogger } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';
const { Header, Sider, Content } = Layout;
import logo from '../../../assets/images/logo/pnf-papers.png';
import './index.scss';
import { IoIosNotificationsOutline } from 'react-icons/io';

const MainLayout = () => {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const data = [
        {
            title: 'Farukh Sajjad',
        },
    ];

    return (
        <Layout>
            <Sider className='custom-sidebar' trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />

                <Link to='/admin'>
                    <img className='img-fluid logo my-md-4' src={logo} alt='Pnf Papers' />
                </Link>

                <Menu
                    theme="dark"
                    mode="inline"
                    className='mt-md-2'
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key) {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <RiDashboard3Line className='sidebar-icon' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <HiOutlineUsers className='sidebar-icon' />,
                            label: 'Customers',
                        },
                        {
                            key: 'products',
                            icon: <RiProductHuntLine className='sidebar-icon' />,
                            label: 'Products',
                            children: [
                                {
                                    key: 'add-product',
                                    icon: <GoDot />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'products',
                                    icon: <GoDot />,
                                    label: 'Products',
                                },
                            ]
                        },
                        {
                            key: 'brands',
                            icon: <TbBrandAirtable className='sidebar-icon' />,
                            label: 'Brands',
                            children: [
                                {
                                    key: 'add-brand',
                                    icon: <GoDot />,
                                    label: 'Add Brand',
                                },
                                {
                                    key: 'brands',
                                    icon: <GoDot />,
                                    label: 'Brands',
                                },
                            ]
                        },
                        {
                            key: 'category',
                            icon: <BiCategory className='sidebar-icon' />,
                            label: 'Category',
                            children: [
                                {
                                    key: 'add-category',
                                    icon: <GoDot />,
                                    label: 'Add Category',
                                },
                                {
                                    key: 'categories',
                                    icon: <GoDot />,
                                    label: 'Categories',
                                },
                            ]
                        },
                        {
                            key: 'colors',
                            icon: <AiOutlineBgColors className='sidebar-icon' />,
                            label: 'Colors',
                            children: [
                                {
                                    key: 'add-color',
                                    icon: <GoDot />,
                                    label: 'Add Color',
                                },
                                {
                                    key: 'colors',
                                    icon: <GoDot />,
                                    label: 'Colors',
                                },
                            ]
                        },
                        {
                            key: 'orders',
                            icon: <PiClipboardText className='sidebar-icon' />,
                            label: 'Orders',
                        },
                        {
                            key: 'blogs',
                            icon: <TbBrandBlogger className='sidebar-icon' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'add-blog',
                                    icon: <GoDot />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blogs',
                                    icon: <GoDot />,
                                    label: 'Blogs',
                                },
                            ]
                        },
                        {
                            key: 'blog-categories',
                            icon: <BiCategory className='sidebar-icon' />,
                            label: 'Blog Categories',
                            children: [
                                {
                                    key: 'add-blog-category',
                                    icon: <GoDot />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blogs-categories',
                                    icon: <GoDot />,
                                    label: 'Blog Categories',
                                },
                            ]
                        },
                        {
                            key: 'enquiries',
                            icon: <RiCustomerService2Line className='sidebar-icon' />,
                            label: 'Enquiries',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className='row justify-content-between ps-2 pe-0'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >

                    <div className='col-md-8'>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </div>

                    <div className='col-md-1 notifications'>
                        <div className='position-relative float-end'>
                            <IoIosNotificationsOutline className='notify-icon' />
                            <span className='badge bg-danger notify-badge rounded-circle p-1 position-absolute'>
                                3
                            </span>
                        </div>

                    </div>

                    <div className='col-md-3 header-right-area'>

                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item key={index}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAw436esCuqhWhF6QPU_r2FKQmpnscithCVg&s`} />}
                                        title={<p className='mb-0'>{item.title}</p>}
                                        description={<p className='mb-0 text-dark'>farukhsajjad110@gmail.com</p>}

                                    />
                                </List.Item>
                            )}
                        />

                    </div>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;
