#!/bin/sh

# 定义要遍历的目录路径
directory="/Users/huwenfeng/IdeaProjects/github/blog/docs"

# 遍历目录中的所有.md文件
for file in "$directory"/*.md; do
    # 检查文件是否存在
    if [ -e "$file" ]; then
        # 追加头信息到文件中
        # shellcheck disable=SC2129
        echo "---" >> "$file"
        echo "title: Hello World" >> "$file"
        echo "date: 2023-11-29" >> "$file"
        echo "author: huwenfeng" >> "$file"
        echo "location: shanghai" >> "$file"
        echo "---" >> "$file"
    fi
done
