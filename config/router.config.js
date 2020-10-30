/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-10-31 05:35:32
 * @LastEditors: zhangjicheng
 * @Description: In User Settings Edit
 * @FilePath: \blog3.0\config\router.config.js
 */
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
            name: 'HOME',
            icon: 'home',
            component: './Home',
          },
          {
            path: '/homepage',
            redirect: '/',
          },
          {
            // 文章详情
            path: '/ARTICAL',
            component: './Artical',
          },
          {
            // 文章编辑
            path: '/editor',
            name: 'EDIT',
            icon: 'form',
            component: './Editor',
          },
          {
            // 实例
            path: '/demo',
            name: 'DEMO',
            style: 'dark',
            icon: 'appstore',
            component: './Demo',
          },
          {
            // 文章管理
            path: '/articalManage',
            name: 'MANAGE',
            icon: 'project',
            component: './articalManage',
          },
          {
            // 测试
            path: '/test',
            name: 'TEST',
            icon: 'deployment-unit',
            routes: [
              {
                name: '403',
                path: '/403',
                component: './403',
              },
              {
                name: '404',
                component: './404',
              },
            ]
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
