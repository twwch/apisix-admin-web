import { Form, Input, Button, Card } from 'antd';
import { UserService } from '../../service/UserService'
import { useRequest, history } from 'umi';

import styles from './index.less'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Login: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const login = useRequest(UserService.login, {
    manual: true,
    onSuccess: (data) => {
      if (data.token !== "") {
        localStorage.setItem("token", data.token);
        history.push('/admin')
      }

    }
  })
  const onFinish = (values: any) => {
    login.run({ account: values.account, password: values.password })
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className={styles.loginContainer}>
      <Card>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            label="邮箱"
            name="account"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button loading={login.loading} type="primary" htmlType="submit">
              登录
            </Button>
            <Button style={{ marginLeft: 10 }} htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
export { Login }