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
            // 首页
            path: '/',
            name: 'home',
            icon: 'home',
            component: './Home',
          },
          {
            // 文章详情
            path: '/artical',
            component: './Artical',
          },
          {
            // 文章编辑
            path: '/editor',
            name: 'editor',
            icon: 'home',
            component: './Editor',
          },
          {
            // 实例
            path: '/demo',
            name: 'demo',
            style: 'dark',
            icon: 'appstore',
            component: './Demo',
          },
          {
            // 文章管理
            path: '/articalManage',
            name: 'plates',
            component: './articalManage',
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
    ],
  },
  {
    component: './404',
  },
];
