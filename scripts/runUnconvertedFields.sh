#!/bin/bash
set -e

# 目标语言文件目录
LOCALES_DIR="./locales"
TARGET_FILE_DIR="./locales_get_unconverted_fields"

# 使用 getZhFieldsToExcel.py a.yml a.xlsx 便利所有的语言文件，将其中的中文字段提取出来，保存到 xlsx 文件中

# 遍历 LOCALES_DIR 目录下的所有 .yml 文件
for file in ${LOCALES_DIR}/*.yml; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        lang=${filename%.*}

        if [ "$lang" = "zh-CN" ]; then
            continue
        fi

        python3 ./scripts/runZhFieldsToExcel.py $LOCALES_DIR/$filename $TARGET_FILE_DIR/$lang.xlsx
    fi
done