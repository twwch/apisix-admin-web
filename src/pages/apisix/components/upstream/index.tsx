import { Card } from 'antd';
import { useState, useEffect } from 'react'
import { useRequest } from 'umi';
import UpstreamService from '../../service/UpstreamService';
import { Upstreams, ListUpstream } from '../../vms/upstream'
import { Table } from 'antd';
import moment from 'moment'

const Upstream: React.FC<{}> = () => {
  const [upstreams, setUpstreams] = useState<Upstreams>()
  const list = useRequest(UpstreamService.list, {
    manual: true,
    onSuccess: (data) => {
      setUpstreams({ total: data.total, upstreams: data.upstreams })
    }
  })
  useEffect(() => {
    list.run(1, 2)
  }, [])

  const columns = [
    {
      title: 'RouteId',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      render: (text: string, record: ListUpstream) => record.value.id
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ListUpstream) => record.value?.name
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      render: (text: string, record: ListUpstream) => record.value?.desc
    },
    {
      title: '负载均衡',
      dataIndex: 'type',
      key: 'type',
      render: (text: string, record: ListUpstream) => record.value.type
    },
    {
      title: 'nodes',
      dataIndex: 'nodes',
      key: 'nodes',
      width: 200,
      render: (text: string, record: ListUpstream) => Object.keys(record.value.nodes).map(key => `{"${key}": ${record.value.nodes[key]}}`)
    },
    {
      title: 'upstreamsKey',
      dataIndex: 'key',
      key: 'key',
      width: 240,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
      render: (text: string, record: ListUpstream) => record.value.create_time ? moment.unix(record.value?.create_time).format('YYYY-MM-DD HH:mm:ss') : ''
    },
  ];
  return (
    <Card
      style={{ width: '100%' }}
      title="APISIX 上游服务管理"
      loading={list.loading}
    >
      {/* @ts-ignore */}
      <Table key="key" scroll={{ x: 1000, y: `calc(100vh - ${350}px)` }} columns={columns} dataSource={upstreams?.upstreams} />
    </Card>
  )
}
export default Upstream
export { Upstream }