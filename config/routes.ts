// config/routes.ts
interface Meun {
  path: string
  name: string
  routes?: Meun[]
  component?: string
}
export const manus: Meun[] = [
  {
    path: '/admin/apisix',
    name: 'APISIX管理',
    component: '@/pages/index',
  },
]

export default [
  {
    path: '/',
    component: '@/pages/login',
  },
  {
    path: '/admin',
    component: '@/layouts/index',
    routes: manus
  },

];
