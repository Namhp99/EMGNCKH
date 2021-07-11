import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/Main',
    children: [{
      path: 'Main',
      name: 'Main',
      component: () => import('@/views/Main/index'),
      meta: { title: 'Trang chủ', icon: 'dashboard' }
    }]
  },
  {
    path: '/Bai-viet',
    component: Layout,
    redirect: '/Bai-viet/Danh-sach',
    name: 'BaiViet',
    meta: { title: 'Bài viết', icon: 'form' },
    children: [
      {
        path: 'Danh-sach',
        name: 'Baiviet',
        component: () => import('@/views/Baiviet/List/index'),
        meta: { title: 'Danh sách bài viết', icon: 'el-icon-document-copy' }
      },
      {
        path: 'Tao-bai-viet',
        name: 'Taobai',
        component: () => import('@/views/Baiviet/Create/index'),
        meta: { title: 'Tạo mới bài viết', icon: 'el-icon-edit' }
      }
    ]
  },
  {
    path: '/Khach-hang',
    component: Layout,
    redirect: '/Khach-hang/Danh-sach',
    name: 'Khachhang',
    meta: { title: 'Khách hàng', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'Danh-sach',
        name: 'Danhsach',
        component: () => import('@/views/KhachHang/List/index'),
        meta: { title: 'Danh sách', icon: 'el-icon-document-copy' }
      },
      {
        path: 'Thong-tin',
        name: 'Thongtin',
        component: () => import('@/views/profile/index'),
        meta: { title: 'Thông tin khách hàng', icon: 'el-icon-s-check' }
      }
    ]
  },
  {
    path: '/Tai-khoan',
    component: Layout,
    redirect: '/',
    name: 'Admin',
    meta: { title: 'Quản trị tài khoản', icon: 'el-icon-user' },
    children: [
      {
        path: 'Doi-mat-khau',
        name: 'DoiMatKhau',
        component: () => import('@/views/Admin/DoiMatKhau/index'),
        meta: { title: 'Đổi mât khẩu', icon: 'el-icon-document-copy' }
      },
      {
        path: 'Thong-tin',
        name: 'Thongtin',
        component: () => import('@/views/profile/index'),
        meta: { title: 'Thông tin cá nhân', icon: 'el-icon-s-check' }
      }
    ]
  },
  {
    path: 'Ho-tro',
    component: Layout,
    children: [
      {
        path: 'https://www.facebook.com/UpharmaVN/',
        meta: { title: 'Hỗ trợ', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
