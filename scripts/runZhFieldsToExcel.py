import sys
import pandas as pd
import yaml
import re

def contains_chinese(text):
    """检查文本中是否包含中文字符"""
    return any('\u4e00' <= char <= '\u9fff' for char in text)

def yaml_to_excel(yaml_file, excel_file):
    # 读取 YAML 文件
    with open(yaml_file, 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)

    # 确保数据是列表形式
    if isinstance(data, dict):
        data = [data]

    # 过滤出包含中文的字段
    filtered_data = []
    for entry in data:
        filtered_entry = {k: v for k, v in entry.items() if isinstance(v, str) and contains_chinese(v)}
        if filtered_entry:
            filtered_data.append(filtered_entry)

    # 将数据转换为 pandas DataFrame
    df = pd.DataFrame(filtered_data)

    # 将 DataFrame 保存到 Excel 文件
    df.to_excel(excel_file, index=False)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 yaml_to_excel.py <yaml_file> <excel_file>")
        sys.exit(1)

    yaml_to_excel(sys.argv[1], sys.argv[2])

