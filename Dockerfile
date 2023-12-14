# 使用 Node.js 作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org/

# 复制应用程序代码
COPY . .

# 构建生产环境的应用程序
RUN npm run build

# 暴露容器的端口
EXPOSE 3000

# 运行应用程序
CMD [ "npm", "start" ]
