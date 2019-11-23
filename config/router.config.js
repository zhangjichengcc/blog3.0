/**
 * 路由配置
 *
 * @date 2019-06-25
 * @author zhangjicheng
 * 参看文档： https://github.com/ant-design/ant-design-pro/blob/master/config/router.config.js
 */

export default [
  {
    path: '/user',
    component: '../layouts/BlankLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BlankLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            name: 'home',
            icon: 'home',
            component: './Home',
          },
          {
            path: '/artical',
            component: './Artical',
          },
          {
            path: '/editor',
            name: 'editor',
            icon: 'home',
            component: './Editor',
          },
          {
            path: '/demo',
            name: 'demo',
            style: 'dark',
            icon: 'appstore',
            component: './Demo',
          },
          // {
          //   path: '/demo/plates',
          //   name: 'plates',
          //   hideInMenu: true,
          //   component: './Demo/Plates',
          // },
          {
            path: '/403',
            component: './403',
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
