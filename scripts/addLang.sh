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

# 遍历 locales 目录下的所有 .yml 文件
for file in ${LOCALES_DIR}/*.yml; do
    if [ -f "$file" ]; then
        # 检查文件的最后一行是否为空
        if [ -z "$(tail -n 1 "${file}")" ]; then
            # 最后一行为空，直接追加 lang.yml 的内容
            cat "${LANG_FILE}" >> "${file}"
        else
            # 最后一行不为空，先添加一个新行再追加内容
            echo >> "${file}"
            cat "${LANG_FILE}" >> "${file}"
        fi
        echo "Added content to ${file}"
    fi
done

# 清空 lang.yml 文件
> "${LANG_FILE}"

echo "Done."

