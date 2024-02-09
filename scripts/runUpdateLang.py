import pandas as pd
import yaml
import sys

def update_yaml_from_excel(excel_file, yaml_file):
    # 读取 Excel 文件
    df = pd.read_excel(excel_file, header=None, nrows=2)
    updates = dict(zip(df.iloc[0], df.iloc[1]))

    # 读取 YAML 文件
    with open(yaml_file, 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)

    # 更新 YAML 文件内容
    updated = False
    for key in updates:
        if key in data:
            data[key] = updates[key]
            updated = True

    # 如果有更新，写回 YAML 文件
    if updated:
        with open(yaml_file, 'w', encoding='utf-8') as file:
            yaml.dump(data, file, allow_unicode=True)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 runUpdateLang.py <excel_file> <yaml_file>")
        sys.exit(1)

    update_yaml_from_excel(sys.argv[1], sys.argv[2])
