import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { RiCustomerService2Line, RiDashboard3Line, RiProductHuntLine } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { AiOutlineBgColors } from 'react-icons/ai';
import { GoDot } from 'react-icons/go';
import { PiClipboardText } from 'react-icons/pi';
import { TbBrandAirtable, TbBrandBlogger } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';
const { Header, Sider, Content } = Layout;
import './index.scss';

const MainLayout = () => {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />



                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={(key) => {

                        if (key == "signup") {

                        } else {

                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <RiDashboard3Line className='fs-3' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <HiOutlineUsers className='fs-3' />,
                            label: 'Customers',
                        },
                        {
                            key: 'products',
                            icon: <RiProductHuntLine className='fs-3' />,
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
                            icon: <TbBrandAirtable className='fs-3' />,
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
                            icon: <BiCategory className='fs-3' />,
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
                            icon: <AiOutlineBgColors className='fs-3' />,
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
                            icon: <PiClipboardText className='fs-3' />,
                            label: 'Orders',
                        },
                        {
                            key: 'blogs',
                            icon: <TbBrandBlogger className='fs-3' />,
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
                            icon: <BiCategory className='fs-3' />,
                            label: 'Blog Categories',
                            children: [
                                {
                                    key: 'add-blog-category',
                                    icon: <GoDot />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-categories',
                                    icon: <GoDot />,
                                    label: 'Blog Categories',
                                },
                            ]
                        },
                        {
                            key: 'enquiries',
                            icon: <RiCustomerService2Line className='fs-3' />,
                            label: 'Enquiries',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
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
                    Content
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;
