import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: require('@/components/DashboardPage'),
            children: [
                {
                    path: 'welcome',
                    name: 'welcome',
                    component: require('@/components/WelcomePage')
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: require('@/components/Goods/GoodsPage')
                },
                {
                    path: 'goods/add',
                    name: 'goods_add',
                    component: require('@/components/Goods/GoodsAddPage')
                },
                {
                    path: 'nature',
                    name: 'nature',
                    component: require('@/components/Nature/NaturePage')
                },
                {
                    path: 'specification/detail',
                    name: 'specification_detail',
                    component: require('@/components/Specification/SpecificationAddPage')
                },
                {
                    path: 'category',
                    name: 'category',
                    component: require('@/components/Category/CategoryPage')
                },
                {
                    path: 'category/add',
                    name: 'category_add',
                    component: require('@/components/Category/CategoryAddPage')
                },
                {
                    path: 'order',
                    name: 'order',
                    component: require('@/components/Order/OrderPage')
                },
                {
                    path: 'order/detail',
                    name: 'order_detail',
                    component: require('@/components/Order/OrderDetailPage')
                },
                {
                    path: 'user',
                    name: 'user',
                    component: require('@/components/User/UserPage')
                },
                {
                    path: 'user/add',
                    name: 'user_add',
                    component: require('@/components/User/UserAddPage')
                },
                {
                    path: 'shipper',
                    name: 'shipper',
                    component: require('@/components/Shipper/ShipperPage')
                },
                {
                    path: 'shipper/list',
                    name: 'shipper_list',
                    component: require('@/components/Shipper/ShipperListPage')
                },
                {
                    path: 'shipper/add',
                    name: 'shipper_add',
                    component: require('@/components/Shipper/ShipperAddPage')
                },
                {
                    path: 'freight',
                    name: 'freight',
                    component: require('@/components/Freight/FreightPage')
                },
                {
                    path: 'except_area',
                    name: 'except_area',
                    component: require('@/components/Freight/ExceptAreaPage')
                },
                {
                    path: 'except_area/add',
                    name: 'except_area_add',
                    component: require('@/components/Freight/ExceptAreaAddPage')
                },
                {
                    path: 'freight/add',
                    name: 'freight_add',
                    component: require('@/components/Freight/FreightAddPage')
                },
                {
                    path: 'notice',
                    name: 'notice',
                    component: require('@/components/Settings/NoticePage')
                },
                {
                    path: 'ad',
                    name: 'ad',
                    component: require('@/components/Ad/AdPage')
                },
                {
                    path: 'ad/add',
                    name: 'ad_add',
                    component: require('@/components/Ad/AdAddPage')
                },
                {
                    path: 'shopcart',
                    name: 'shopcart',
                    component: require('@/components/ShopCart/ShopCartPage')
                },
                {
                    path: 'keywords',
                    name: 'keywords',
                    component: require('@/components/Keywords/KeywordsPage')
                },
                {
                    path: 'keywords/add',
                    name: 'keywords_add',
                    component: require('@/components/Keywords/KeywordsAddPage')
                },
                {
                    path: 'goodsgalleryedit',
                    name: 'goodsgalleryedit',
                    component: require('@/components/GoodsGallery/GoodsGalleryEditPage')
                },
                {
                    path: 'admin',
                    name: 'admin',
                    component: require('@/components/Admin/AdminPage')
                },
                {
                    path: 'admin/add',
                    name: 'admin_add',
                    component: require('@/components/Admin/AdminAddPage')
                },
                {
                    path: 'settings/showset',
                    name: 'showset',
                    component: require('@/components/Showset/ShowSetPage')
                }
            ]
        },
        {
            path: '/wap',
            name: 'wap',
            component: require('@/components/WapPage'),
            children: [
                {
                    path: '/',
                    name: 'goods',
                    component: require('@/components/Wap/GoodsPage')
                },
                {
                    path: 'order',
                    name: 'order',
                    component: require('@/components/Wap/OrderPage')
                },

            ]
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/components/LoginPage')
        },
        {
            path: '*',
            redirect: '/dashboard'
        }
    ]
})
