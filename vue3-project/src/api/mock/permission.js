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
              label: '职业配对管理',
              icon: 'suitcaseLine',
              url: 'jobmatch/index'
            },
            {
              path: '/console/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'user/index'
            },
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
              label: '职业配对',
              icon: 'suitcaseLine',
              children: [
                {
                  path: '/console/matchinfo',
                  name: 'matchinfo',
                  label: '配对信息',
                  icon: 'document',
                  url: 'matchinfo/index'
                },
                {
                  path: '/console/matchresult',
                  name: 'matchresult',
                  label: '配对结果',
                  icon: 'messageBox',
                  url: 'matchresult/index'
                }
              ]
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