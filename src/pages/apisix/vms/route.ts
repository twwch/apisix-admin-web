import { Upstream } from './upstream'
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
  methods?: string[]
}

interface Route {
  key: string
  value: RouteValue
}

interface Routes {
  total: number
  routes: Route[]
}

interface RouteCreate {
  uris: string[]
  hosts?: string[]
  name: string
  desc: string
  remote_addrs: string
  methods?: string[]
}
interface CreateRouteConf {
  route: RouteCreate
  upstream: Upstream
}

export {
  Routes, Route, RouteValue, RouteCreate, CreateRouteConf
}