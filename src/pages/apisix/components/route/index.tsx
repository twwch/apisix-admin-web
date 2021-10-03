import { Card, Button, Tag } from 'antd';
import { useState, useEffect } from 'react'
import { useRequest } from 'umi';
import RouteService from '../../service/RouteService';
import { Routes, Route as RouteVm } from '../../vms/route'
import { Table } from 'antd';
import { CreateDrawer } from './components/createDrawer'
import moment from 'moment'

const tagStyle = { marginLeft: 5, marginBottom: 5 }
const Route: React.FC<{}> = () => {
  const [routes, setRoutes] = useState<Routes>()
  const [visible, setVisible] = useState<boolean>(false)
  const list = useRequest(RouteService.list, {
    manual: true,
    onSuccess: (data) => {
      setRoutes({ total: data.total, routes: data.routes })
    }
  })
  useEffect(() => {
    list.run(1, 2)
  }, [])
  const onSave = () => {
    setVisible(false)
    list.refresh()
  }
  const deleteRoute = useRequest(RouteService.delete, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
      list.refresh()
    }
  })
  const onDelete = (route_id: string, upstream_id: string) => {
    deleteRoute.run(route_id, upstream_id)
  }

  const columns = [
    {
      title: 'RouteId',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 120,
      render: (text: string, record: RouteVm) => record.value.id
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      width: 120,
      render: (text: string, record: RouteVm) => record.value.desc
    },
    {
      title: '路由规则',
      dataIndex: 'uri',
      key: 'uri',
      width: 100,
      render: (text: string, record: RouteVm) => record.value.uri ?
        <Tag color="#f50"> {record.value.uri} </Tag>
        : record.value.uris?.map(i => <Tag key={i} style={tagStyle} color="#55acee">{i}</Tag>)
    },
    {
      title: 'IP限制',
      dataIndex: 'remote_addrs',
      key: 'remote_addrs',
      width: 120,
      render: (text: string, record: RouteVm) => record.value.remote_addrs?.map(i => <Tag key={i} style={tagStyle} color="#f50">{i}</Tag>)
    },
    {
      title: '域名限制',
      dataIndex: 'uri',
      key: 'uri',
      width: 150,
      render: (text: string, record: RouteVm) => record.value.hosts?.map(i => <Tag key={i} style={tagStyle} color="#87d068">{i}</Tag>)
    },
    {
      title: '方法限制',
      dataIndex: 'methods',
      key: 'methods',
      width: 150,
      render: (text: string, record: RouteVm) => record.value?.methods?.map(i => <Tag key={i} style={tagStyle} color="geekblue">{i}</Tag>)
    },
    {
      title: 'UpstreamId',
      dataIndex: 'upstream_id',
      key: 'upstream_id',
      width: 120,
      render: (text: string, record: RouteVm) => record.value.upstream_id
    },
    {
      title: 'routeKey',
      dataIndex: 'key',
      key: 'key',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
      render: (text: string, record: RouteVm) => moment.unix(record.value.create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    // {
    //   title: '操作',
    //   key: 'action',
    //   fixed: 'right',
    //   render: (text: string, record: RouteVm) => (
    //     <Space size="middle">
    //       <Button disabled onClick={() => onDelete(record.value.id, record.value.upstream_id)} type="link">删 除</Button>
    //     </Space>
    //   ),
    // },
  ];
  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="APISIX 路由管理"
        loading={list.loading}
        extra={<Button onClick={() => setVisible(true)} type="link">新建路由规则</Button>}
      >
        {/* @ts-ignore */}
        <Table key="key" scroll={{ x: 1000, y: `calc(100vh - ${350}px)` }} columns={columns} dataSource={routes?.routes} />
      </Card>
      <CreateDrawer
        visible={visible}
        setVisible={setVisible}
        onSave={onSave}
      />
    </>
  )
}
export default Route
export { Route }