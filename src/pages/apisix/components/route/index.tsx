import { Card, Button, Tag } from 'antd';
import { useState, useEffect } from 'react'
import { useRequest } from 'umi';
import RouteService from '../../service/RouteService';
import { Routes, Route as RouteVm } from '../../vms/route'
import { Table, Space } from 'antd';
import moment from 'moment'

const Route: React.FC<{}> = () => {
  const [routes, setRoutes] = useState<Routes>()
  const list = useRequest(RouteService.list, {
    manual: true,
    onSuccess: (data) => {
      setRoutes({ total: data.total, routes: data.routes })
    }
  })
  useEffect(() => {
    list.run(1, 2)
  }, [])

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
      render: (text: string, record: RouteVm) => record.value.id
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      render: (text: string, record: RouteVm) => record.value.desc
    },
    {
      title: '路由规则',
      dataIndex: 'uri',
      key: 'uri',
      render: (text: string, record: RouteVm) => record.value.uri ?
        <Tag color="#f50"> {record.value.uri} </Tag>
        : record.value.uris?.map(i => <Tag style={{ marginLeft: 5 }} color="#55acee">{i}</Tag>)
    },
    {
      title: 'IP限制',
      dataIndex: 'remote_addrs',
      key: 'remote_addrs',
      render: (text: string, record: RouteVm) => record.value.remote_addrs?.map(i => <Tag style={{ marginLeft: 5 }} color="#f50">{i}</Tag>)
    },
    {
      title: '域名限制',
      dataIndex: 'uri',
      key: 'uri',
      render: (text: string, record: RouteVm) => record.value.hosts?.map(i => <Tag style={{ marginLeft: 5 }} color="#87d068">{i}</Tag>)
    },
    {
      title: 'UpstreamId',
      dataIndex: 'upstream_id',
      key: 'upstream_id',
      render: (text: string, record: RouteVm) => record.value.upstream_id
    },
    {
      title: 'routeKey',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text: string, record: RouteVm) => moment.unix(record.value.create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: RouteVm) => (
        <Space size="middle">
          <Button disabled onClick={() => onDelete(record.value.id, record.value.upstream_id)} type="link">删 除</Button>
        </Space>
      ),
    },
  ];
  return (
    <Card
      style={{ width: '100%' }}
      title="APISIX 路由管理"
      loading={list.loading}
      extra={<a href="#">新建路由规则</a>}
    >
      <Table columns={columns} dataSource={routes?.routes} />
    </Card>
  )
}
export default Route
export { Route }