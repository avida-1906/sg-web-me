#!/bin/bash
set -e


# 需要处理文件目录
LOCALES_DIR="./locales_get_unconverted_fields"
# 目标语言文件目录
TARGET_FILE_DIR="./locales"


# 遍历 LOCALES_DIR 目录下的所有 .xlsx 文件
for file in ${LOCALES_DIR}/*.xlsx; do
    if [ -f "$file" ]; then
       curFilename=$(basename "$file")
       targetFile=${curFilename%.*}
       completeCurFile="$LOCALES_DIR/$curFilename"
       completeTargetFile="$TARGET_FILE_DIR/$targetFile.yml"
       python3 ./scripts/runUpdateLang.py $completeCurFile $completeTargetFile
       echo "update $completeTargetFile success"
    fi
done