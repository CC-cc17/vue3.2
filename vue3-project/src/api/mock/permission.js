import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/console/home',
              name: 'home',
              label: '首页',
              icon: 'homeFilled',
              url: 'home/index'
            },
            {
              path: '/console/jobmatch',
              name: 'jobmatch',
              label: '职业配对',
              icon: 'video-play',
              url: 'jobmatch/index'
            },
            {
              path: '/console/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user/index'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/console/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'page1/index'
                },
                {
                  path: '/console/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'page2/index'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'peterzhang' && password === '6677') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/console/home',
              name: 'home',
              label: '首页',
              icon: 'homeFilled',
              url: 'home/index'
            },
            {
              path: '/console/jobmatch',
              name: 'jobmatch',
              label: '职业配对',
              icon: 'video-play',
              url: 'jobmatch/index'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}