import { Layout, Menu, Space, Dropdown, Button } from 'antd';
import { PieChartOutlined, MailOutlined } from '@ant-design/icons';
import { history, useRequest } from 'umi';
import { manus } from '../../config/routes'
import { useState } from 'react'
import { UserService } from '@/pages/user/service/UserService'
import { useLocation } from 'dva'

import styles from './index.less'


const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const BasicLayout = (props: any) => {
  const [user, setUser] = useState({})
  const { pathname } = useLocation()
  useRequest(UserService.info, {
    manual: false,
    onSuccess: (data) => {
      setUser(data)
    }
  })
  const openKeys = [`/${pathname.split("/")[1]}/${pathname.split("/")[2]}`]
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div>APISIX-ADMIN</div>
        <div style={{ marginTop: "-4px", zIndex: 9999 }}>
          <Space direction="vertical">
            <Space>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item key="login_out">
                    <Button size="small" type="link" onClick={() => {
                      history.push("/login")
                      localStorage.removeItem("token");
                    }}>退出登录</Button>
                  </Menu.Item>
                </Menu>
              } placement="bottomLeft">
                {/* @ts-ignore */}
                <Button ghost>{user?.name ? user?.name : 'unknown'}</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </Header>

      <Layout className={styles.innerlayout}>
        <Sider width={225} className={styles.innerspder}>
          <Menu
            mode="inline"
            theme="dark"
            defaultOpenKeys={openKeys}
            selectedKeys={[pathname]}
          >
            {
              manus.map(menu => menu.routes && menu?.routes.length > 0 ?
                <SubMenu key={menu.path} icon={<MailOutlined />} title={menu.name}>
                  {
                    menu?.routes.map(item => <Menu.Item key={item.path} onClick={() => {
                      history.push(item.path)
                    }}>{item.name}</Menu.Item>)
                  }
                </SubMenu>
                :
                <Menu.Item key={menu.path} icon={<PieChartOutlined />} onClick={() => { history.push(menu.path) }}>
                  {menu.name}
                </Menu.Item>
              )
            }
          </Menu>
        </Sider>
        <Content className="site-layout-background" style={{ marginLeft: 225 }}>
          <div style={{ padding: 24, background: '#fff', transition: 'color 0.3s' }}>
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )

}

export default BasicLayout;