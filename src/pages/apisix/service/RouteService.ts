import { request } from '@/utils/request';
class RouteService {
  static list = (page: number, size: number) => request(`/apisix_admin/v1/apisix/route/get?page=${page}&size=${size}`, { method: 'GET' })
  static delete = (route_id: string, upstream_id: string) => request(`/apisix_admin/v1/apisix/route/delete?route_id=${route_id}&upstream_id=${upstream_id}`, { method: 'GET' })
}

export { RouteService }
export default RouteService