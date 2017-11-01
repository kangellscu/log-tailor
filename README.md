nodejs project

How to use:
## 安装
git clone proj

## 配置
配置使用config module，参见config/default.json

## run
cd proj
node index.js

## 使用
使用浏览器打开服务地址，eg: localhost:3000/ls

1. 查看有哪些文件可以被tail
localhost:3000/ls

2. tail文件
从ls查询后，使用任意一个列出的文件名，按下面拼接
localhost:3000/tail/<file>

说明，tail目前只对打开后，实时写入的内容进行tail，历史数据不会显示


## todo
更多功能: clear, stop, retail 开发中
