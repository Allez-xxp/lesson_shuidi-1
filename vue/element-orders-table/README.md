1. 前端分页 大量数据要显示 分页嘛 el-table > el-table-column
后端分页 exec  limit skip
2. pagination el-pagination 
3. from 表单，查询条件 下拉 根据state 查询

4. 组件内部的current-page的值与外面的listQuery.page，.sync表示父子组件的props的关系
:current-page.sync="listQuery.page"
同步父子组件 父组件中就是data,子中就是props 通过.sync关联 不是v-model的关系

作业：
请大家 添加一个作者input   根据作者查询，
添加一个排序 select    根据id  倒序  顺序排列