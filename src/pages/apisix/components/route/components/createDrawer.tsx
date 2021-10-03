import { Drawer, message } from 'antd';
import { Form, Input, Card, Button, Space, InputNumber, Checkbox, Row, Col } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { RouteService } from '../../../service/RouteService'
import { useRequest } from 'umi';

import styles from './createDrawer.less'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};


const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


const CreateDrawer: React.FC<{
  visible: boolean
  onSave: () => void
  setVisible: (visible: boolean) => void
}> = ({ visible, onSave, setVisible }) => {
  const [form] = Form.useForm();

  const create = useRequest(RouteService.create, {
    manual: true,
    onSuccess: () => {
      onSave()
      form.resetFields()
    }
  })

  const onFinish = (values: any) => {
    if (!values.route?.uris || values.route?.uris?.length === 0) {
      message.error('请检查route path配置')
      return
    }
    if (!values.nodes || values.nodes?.length === 0) {
      message.error('请检查Upstream node配置')
      return
    }
    const nodes: { [key: string]: number } = {}
    values.nodes.forEach((item: any) => {
      nodes[String(item.node_key)] = Number(item.node_value)
    });
    create.run({
      route: {
        uris: values.route.uris,
        hosts: values.route.hosts,
        name: values.route.name,
        remote_addrs: values.route.remote_addrs,
        desc: values.route.desc,
        methods: values.route.methods
      },
      upstream: {
        nodes: nodes,
        name: values.upstream.name,
        desc: values.upstream.desc,
      },
    })
  };
  const closeHandle = () => {
    setVisible(false)
    form.resetFields()
  }
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE']
  return (
    <Drawer visible={visible} width={600} title='新建路由规则' onClose={closeHandle} >
      <Form form={form} name="create_route" className={styles.container}  {...layout} onFinish={onFinish}>
        <Card title="Route 配置" >
          <Form.Item name={['route', 'name']} label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['route', 'desc']} label="描述" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.List name={['route', 'uris']}  >

            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'PATH' : ''}
                    required={true}
                    key={field.key}
                  >
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="/api/v1" style={{ width: '90%' }} />
                    </Form.Item>
                    {
                      fields.length > 1 &&
                      <MinusCircleOutlined
                        className={styles.dynamicDeleteButton}
                        onClick={() => remove(field.name)}
                      />
                    }
                  </Form.Item>
                ))}

                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '90%' }}
                    icon={<PlusOutlined />}
                  >
                    添加URI
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>

              </>
            )}
          </Form.List>


          <Form.List name={['route', 'hosts']}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'HOSTS' : ''}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      style={{ marginBottom: 0 }}
                      noStyle
                    >
                      <Input placeholder="127.0.0.1" style={{ width: '90%' }} />
                    </Form.Item>
                    <MinusCircleOutlined
                      className={styles.dynamicDeleteButton}
                      onClick={() => remove(field.name)}
                    />

                  </Form.Item>
                ))}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '90%' }}
                    icon={<PlusOutlined />}
                  >
                    添加HOST
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>

              </>
            )}
          </Form.List>

          <Form.List name={["route", "remote_addrs"]}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'IPS' : ''}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      style={{ marginBottom: 0 }}
                      noStyle
                    >
                      <Input placeholder="127.0.0.1" style={{ width: '90%' }} />
                    </Form.Item>
                    <MinusCircleOutlined
                      className={styles.dynamicDeleteButton}
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                ))}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '90%' }}
                    icon={<PlusOutlined />}
                  >
                    添加RemoteAddrs
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>

              </>
            )}
          </Form.List>
          <Form.Item name={["route", "methods"]} label="方法">
            <Checkbox.Group>
              <Row>
                {
                  methods.map(item => <Col key={item} span={8}>
                    <Checkbox value={item} style={{ lineHeight: '32px' }}>
                      {item}
                    </Checkbox>
                  </Col>)
                }

              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Card>

        <Card style={{ marginTop: 15 }} title="Upstream 配置" >
          <Form.Item name={['upstream', 'name']} label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['upstream', 'desc']} label="描述" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.List name="nodes">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(field => (
                  <Space key={field.key}>
                    <Form.Item
                      {...field}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      label="NODE"
                      name={[field.name, 'node_key']}
                      fieldKey={[field.fieldKey, 'node_key']}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="127.0.0.1:80" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="权重"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      name={[field.name, 'node_value']}
                      fieldKey={[field.fieldKey, 'node_value']}
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={1} max={10} />
                    </Form.Item>
                    {
                      fields.length > 1 &&
                      <MinusCircleOutlined
                        className={styles.dynamicDeleteButton2}
                        onClick={() => remove(field.name)}
                      />
                    }
                  </Space>
                ))}

                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加NODE
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
        <div className={styles.submit}>
          <Button loading={create.loading} type="primary" htmlType="submit">
            保存
          </Button>
        </div>
      </Form>

    </Drawer>
  )
}
export default CreateDrawer
export { CreateDrawer }