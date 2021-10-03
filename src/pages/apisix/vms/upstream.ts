
interface Upstream {
  nodes: { [key: string]: number }
  name: string
  desc: string
}

interface UpstreamValue {
  scheme: string
  type: string
  update_time: number
  pass_host: string
  nodes: { [key: string]: number }
  id: string
  create_time: number
  desc?: string
  name?: string
}

interface ListUpstream {
  key: string
  value: UpstreamValue
}

interface Upstreams {
  total: number
  upstreams?: ListUpstream[]
}

export { Upstream, Upstreams, ListUpstream, UpstreamValue }
export default Upstream