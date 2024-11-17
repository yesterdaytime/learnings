# 


# 查看当前镜像
npm config get registry
yarn config get registry
pnpm config get registry

# 切换淘宝镜像
npm config set registry https://registry.npmmirror.com/
yarn config set registry https://registry.npmmirror.com/
pnpm config set registry https://registry.npmmirror.com/

# 恢复官网镜像
# npm config set registry https://registry.npmjs.org/
# yarn config set registry https://registry.yarnpkg.com/
# pnpm config set registry https://registry.npmjs.org/

# 临时使用淘宝镜像安装某个package
# npm --registry https://registry.npmmirror.com/ install <package-name>


npm cache clean --force
# 对于yarn，没有直接的缓存清理命令，但通常删除`yarn.lock`文件和`node_modules`目录后重新运行`yarn`即可
# 对于pnpm，可以使用`pnpm store prune`来清理不必要的包数据