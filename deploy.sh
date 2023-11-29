#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/

# 如果是发布到自定义域名
# echo 'www.your-website.com' > CNAME

# 拷贝静态资源到 git 待上传目录
cp -R dist/* ../.static/blog

# git init
cd ../.static/blog
git add -A
git commit -m $1

# 如果你想要部署到 https://USERNAME.github.io
# git push -f git@github.com:USERNAME/USERNAME.github.io.git master

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目

#git push -f https://github.com/hm0223/blog.git master
git push -f git@github.com:hm0223/blog.git master:gh-pages

#git remote add origin git@github.com:hm0223/blog.git
#git push -u origin master
# git push -f git@github.com:hm0223/blog.git master

cd -