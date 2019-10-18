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
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: 'home',
        icon: 'home',
        component: './Home',
      },
      {
        path: 'artical',
        // name: 'artical',
        icon: 'home',
        component: './Artical',
      },
      {
        path: '/editor',
        name: 'editor',
        icon: 'home',
        component: './Editor',
      },
      {
        path: '/403',
        component: './403',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
