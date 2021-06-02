import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import '../admin.css'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Category from '../Category/Category';
import { Link } from 'react-router-dom';
import ProductAdmin from '../Product/ProductAdmin';
function HomeAdmin() {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const [keyCheck, setKeyCheck] = useState('1')
  const toggler = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => toggler()}>
          {!collapsed && (<div className="edit-logo">
            <i style={{ paddingRight: '5px' }} class="fa fa-google-wallet"></i>
            <b>SHOP ADMIN</b>
          </div>)}
          {collapsed && (<div className="edit-logo">
            <i class="fa fa-google-wallet"></i>
          </div>)}
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item onClick={() => setKeyCheck('1')} key="1" icon={<PieChartOutlined />}>
              <Link to="/home-admin">DashBoard</Link>
            </Menu.Item>
            <Menu.Item onClick={() => setKeyCheck('2')} key="2" icon={<DesktopOutlined />}>
              <a>Products</a>
            </Menu.Item>
            <Menu.Item onClick={() => setKeyCheck('3')} key="3" icon={<PieChartOutlined />}>
              <a>Category</a>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div >
              <div className="d-flex justify-content-end">
                <Link to="/">View Home</Link>
              </div>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {keyCheck === '1' && <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
              <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link onClick={() => setKeyCheck('1')} to="/home-admin">Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>dashBoard</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              dashBoard
            </div>}
            {keyCheck === '2' && <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link onClick={() => setKeyCheck('1')} to="/home-admin">Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>Products</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <ProductAdmin />
            </div>}
            {keyCheck === '3' && <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link onClick={() => setKeyCheck('1')} to="/home-admin" >Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>Category</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <Category />
            </div>}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default HomeAdmin
