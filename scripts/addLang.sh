#!/bin/bash
set -e

# 读取 ../lang.yml 文件，将其中的语言添加locales目录下所有的语言文件中，添加到最后

# 路径变量
LANG_FILE="./lang.yml"
LOCALES_DIR="./locales"

# 检查 lang.yml 文件是否存在
if [ ! -f "$LANG_FILE" ]; then
    echo "Error: ${LANG_FILE} not found."
    exit 1
fi

# 删除 lang.yml 文件中的空行
sed -i '' '/^$/d' "${LANG_FILE}"

# 判断文件是不是空的
if [ ! -s "$LANG_FILE" ]; then
    echo "Error: ${LANG_FILE} is empty."
    exit 1
fi

# 遍历 locales 目录下的所有 .yml 文件
for file in ${LOCALES_DIR}/*.yml; do
    if [ -f "$file" ]; then
        # 在文件末尾添加一个新行，然后追加 lang.yml 的内容
        echo >> "${file}" # 添加一个新行
        cat "${LANG_FILE}" >> "${file}"
        echo "Added content to ${file}"
        sed -i '' '/^$/d' "${file}"
    fi
done

# 清空 lang.yml 文件
> "${LANG_FILE}"

echo "Done."

