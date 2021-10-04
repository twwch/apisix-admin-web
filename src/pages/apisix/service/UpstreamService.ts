import { request } from '@/utils/request';
class UpstreamService {
  static list = (page: number, size: number) => request(`/apisix_admin/v1/apisix/upstream/list?page=${page}&size=${size}`, { method: 'GET' })
}

export { UpstreamService }
export default UpstreamService