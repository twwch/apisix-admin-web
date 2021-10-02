import { Login } from '../vms/Login'
import { request } from '@/utils/request';


class LoginService {
  static login = (data: Login) => request('/apisix_admin/v1/organization/user/login', { method: 'POST', data })
}

export { LoginService }
export default LoginService