主要技术：
环境：nodejs
前端框架：react，antd，typescript，html，css
后端框架：express
数据库：mysql

## 数据库表设计

### roleTable 角色信息表

```ts
{
    account:string,//账户id
    psw:string,//密码
    role:string//角色
}
```

### studentInfoTable 学生信息表

```ts
{
    stuId:string, // 学生卡id
    stuName:string, //学生姓名
    stuCollege:string, //学生学院专业信息
}
```

### 请假表 leaveTable

```ts
{
    id:number,//id
    name:string,//姓名
    reason:string,//请假事由
    startTime:string;//开始时间
    endTime:string;//结束时间
    approver:string, //批准人
    state:string,//请假状态
    approveState:string,//批准状态
}
```

### counselorInfoTable 辅导员表

```ts
{
    counselorId:number,//辅导员id
    counselorName:string,//辅导员姓名
}
```

### teacherInfoTable 教师表

```ts
{
    teacherId:number,//教师id
    teacherName:string,//教师姓名

}
```

### 年级表

```ts
{
    grade:number,//年级
    majorNo:number,//专业编号
    major:string,//专业名称
    collegeNo:number,//学院编号
    college:string//学院名称
}
```

### news 新闻表

```ts
{
    newTitle:string, //新闻标题
    newContent:string, //新闻内容
    updateTime:string, //更新时间
}
```

### message 留言板

```ts
{
    msgTitle:string, //留言板标题
    msgContent:string, //留言板内容
    update:string, //留言时间
    name:string, //留言学生
    comments:string[], //评论回复
}
```

## 数据结构

### studnetLeaveTable

```ts
{
    stuId:string, // 学生卡id
    stuName:string, //学生姓名
    grade:number,//年级
    majorNo:number;//专业编号
    major:string,//专业名称
    collegeNo:number,//学院编号
    college:string//学院名称
    leave:{
        reason:string,//请假事由
        leaveType:string;//请假类型
        leaveCourse?:courseTable[];//请假课程
        startTime:string;//开始时间
        endTime:string;//结束时间
        approver:string, //批准人
        state:string,//请假状态
        approveState?:string,//批准状态
    }[]
}
```

### courseTable

```ts
{
    courseName:string,//课程名称
    courseTime:string,//课程时间
    courseTeacher:string,//课程教师
}
```

## 接口

### 通用说明

-   字段中所有与日期时间相关的字段，其值均采用 13 位时间戳字符串

### error 通用错误

| 值  |          说明          |
| :-: | :--------------------: |
|  0  |          成功          |
| 400 | 请求地址错误，路由错误 |
| 401 |   传递参数错误或为空   |

### (v1.0 版本接口)

### - 用户登录(完成)

url: /login
method:POST
请求参数:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
| account| string | N| 用户名 |
| password| string|N|密码|

返回值:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
|error| int| N|返回值错误码 0|
|msg| string| Y|返回值描述|
|data|user 对象|N|数据|

user 对象
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
| account | string | N | 用户名 |
| role | string | N | 用户角色 |

### - 获取学生请假信息(学生)(完成)

url: /getStudentInfoById
method:GET
请求参数:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
| stuId | number | N | 学生 id |

返回值:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
|error| int| N|返回值错误码 |
|msg| string| Y|返回值描述|
|data|studnetLeaveTable[]|Y|学生请假信息数据|

### - 学生提交请假信息(完成)

url: /handleStudentInfo
method:POST
请求参数:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
| stuId | number | N | 学生 id |
| stuName | string | N | 学生姓名 |
| college | string | N | 学院 |
| major | string | N | 专业 |
| grade | number | N | 年级 |
| reason | string | N | 请假事由 |
| startTime | string | N | 请假时间 |
| endTime | string | N | 结束时间 |
| approver | string | N | 批准人 |
| state | string | N | 请假状态 |

返回值:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
|error| int| N|返回值错误码 |
|msg| string| Y|返回值描述|

### - 获取学生请假信息(辅导员)

url: /getStudentInfoByCollege

method:GET
请求参数:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
| collegeNo | number | N | 学院编号 |

返回值:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
|error| int| N|返回值错误码 |
|msg| string| Y|返回值描述|
|data|studnetLeaveTable[]|Y|学生请假信息数据|

### - 获取学生请假信息(教师)

url: /getStudentInfoByMajor

method:GET
请求参数:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
| majorNo | number | N | 专业编号 |

返回值:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
|error| int| N|返回值错误码 |
|msg| string| Y|返回值描述|
|data|studnetLeaveTable[]|Y|学生请假信息数据|

### - 教师,辅导员批准学生请假

url: /updateStudentLeave
method:POST
请求参数:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
| id | number | N | 教师或辅导员 id |
| approveState | string | N | 批准状态 |

返回值:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
|error| int| N|返回值错误码 |
|msg| string| Y|返回值描述|

### - 获取新闻

url: /getNews
method:GEt
请求参数:
返回值:
| 名称 | 类型 | 允许空 | 说明|
| --- | --- | :---: | --- |
|error| int| N|返回值错误码 |
|msg| string| Y|返回值描述|
| data | news[] | Y | 新闻详情 |

### 学校领导查看

### 保卫处查看

### 除学生端外，其他角色增加查询
1. 根据姓名查找
2. 根据学号查找
3. 辅导员查询自己学院的学生
4. 教师查找自己班级的学生
5. 正在审批状态的学生
## - 留言板功能 (完成)

### 获取全部留言

### 学生提交留言

### 获取留言回复

### 提交留言回复

### (v2.0 版本接口)

### - 获取教师请假信息

### - 校领导获取教师请假信息

### - 校领导批准教师请假信息

```
async function getStudentLeaveInfoById(stuId: string): Promise<Array<IStudentInfo>> {
    return new Promise((resolve, reject) => {
        const sql = `select * from leaveTable where stuId=${stuId}`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                const studentInfos = result.map((studentInfo: IStudentInfo) => {
                    const { stuId, stuName, major, college, reason, leaveType, startTime, endTime, state, approveState, approver } = studentInfo;
                    return {
                        stuId: stuId,
                        stuName: stuName,
                        collegeInfo: `${college}${major}`,
                        reason: reason,
                        leaveType: leaveType,
                        startTime: startTime,
                        endTime: endTime,
                        state: state,
                        approveState: approveState,
                        approver: approver,
                    };
                });
                resolve(studentInfos);
            }
        });
    });
}
```
