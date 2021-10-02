
interface RouteValue {
  id: string
  create_time: number
  remote_addrs?: string[]
  update_time: number
  uri: string
  uris?: string[]
  upstream_id: string
  desc: string
  hosts?: string[]
}

interface Route {
  key: string
  value: RouteValue
}

interface Routes {
  total: number
  routes: Route[]
}

export {
  Routes, Route, RouteValue
}