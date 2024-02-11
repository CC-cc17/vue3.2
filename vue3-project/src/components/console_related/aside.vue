<script>
import{useRouter} from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore()
        const list = [
            {
                path: '/console/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                path: '/others',
                label: '其他',
                icon: 'location',
                children: [
                    {
                        path: '/console/page1',
                        name: 'page1',
                        label: '页面1',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/console/page2',
                        name: 'page2',
                        label: '页面2',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    }
                ]
            }
        ];

        const router = useRouter();

        const noChildren = () => {
            return list.filter((item) => !item.children);
        };

        const hasChildren = () => {
            return list.filter((item) => item.children);
        };

        const clickMenu = (item) => {
            router.push({
                name: item.name,
            });
            //vuex 来管理
            store.commit('selectMenu', item);
        }

        return {
            noChildren,
            hasChildren,
            clickMenu,
        }
    },
}


</script>

<template>
    <el-aside :width="$store.state.isCollapse ? '200px':'64px' ">
        <el-menu class="el-menu-vertical-demo" 
        background-color="#545c64" 
        text-color='#fff' 
        :collapse="!$store.state.isCollapse"
        :collapse-transition="false"
        >
        <h3 v-show="$store.state.isCollapse">后台管理</h3>
        <h3 v-show="!$store.state.isCollapse">后台</h3>
            <el-menu-item :index="item.path"
             v-for="item in noChildren()" 
             :key="item.path"
             @click="clickMenu(item)"
             >
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
}
.el-menu{
    border-right: none;
    h3{
        line-height: 48px;
        color:#fff;
        text-align: center;
    }
}
</style>