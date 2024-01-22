#!/bin/bash
set -e

# 需要处理文件目录
LOCALES_DIR="./locales"
# 目标语言文件目录
TARGET_FILE_DIR="./locales_get_unconverted_fields"

# 遍历 LOCALES_DIR 目录下的所有 .yml 文件
for file in ${LOCALES_DIR}/*.yml; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        lang=${filename%.*}

        if [ "$lang" = "zh-CN" ]; then
            continue
        fi

        if [ "$lang" = "hi-IN" ]; then
            continue
        fi

        python3 ./scripts/runZhFieldsToExcel.py $LOCALES_DIR/$filename $TARGET_FILE_DIR/$lang.xlsx
    fi
done