import { Layout, Menu, Space, Dropdown, Button } from 'antd';
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { manus } from '../../config/routes'
import styles from './index.less'

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const BasicLayout = (props: any) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div>APISIX-ADMIN</div>
        <div style={{ marginTop: "-4px" }}>
          <Space direction="vertical">
            <Space>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                      退出登录
                    </a>
                  </Menu.Item>
                </Menu>
              } placement="bottomLeft">
                <Button ghost>admin</Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </Header>

      <Layout className={styles.innerlayout}>
        <Sider width={225} className={styles.innerspder}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            {
              manus.map(menu => menu.routes && menu?.routes.length > 0 ?
                <SubMenu key="sub1" icon={<MailOutlined />} title={menu.name}>
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