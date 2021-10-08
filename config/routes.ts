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
    routes: [
      {
        path: '/admin/apisix/route',
        name: 'ROUTE管理',
        component: '@/pages/apisix/components/route',
      },
      {
        path: '/admin/apisix/upstream',
        name: 'UPSTREAM管理',
        component: '@/pages/apisix/components/upstream',
      },
    ]
  },
  /* {
    path: '/admin/service',
    name: '服务管理',
    routes: [
      {
        path: '/admin/service/order',
        name: '工单管理',
        component: '@/pages/index',
      },
      {
        path: '/admin/service/create',
        name: '服务声明',
        component: '@/pages/index',
      },
    ]
  }, */
]

export default [
  {
    path: '/',
    component: '@/pages/user/components/login',
  },
  {
    path: '/login',
    component: '@/pages/user/components/login',
  },
  {
    path: '/admin',
    component: '@/layouts/index',
    routes: manus
  },

];
