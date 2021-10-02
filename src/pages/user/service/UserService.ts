import { Login } from '../vms/Login'
import { request } from '@/utils/request';


class UserService {
  static login = (data: Login) => request('/apisix_admin/v1/organization/user/login', { method: 'POST', data })
  static info = () => request('/apisix_admin/v1/organization/user/info', { method: 'GET' })
}

export { UserService }
export default UserService