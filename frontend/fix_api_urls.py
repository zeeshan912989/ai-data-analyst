import os
import glob
import re

directory = r'c:\Users\azwaj\OneDrive\Desktop\ai-data-analyst\frontend\app'
files_to_edit = glob.glob(os.path.join(directory, '**', '*.tsx'), recursive=True)

for file_path in files_to_edit:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # regex to find `"http://localhost:8000/api..."`
    new_content = re.sub(
        r'"http://localhost:8000(.*?)"',
        r'`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}\1`',
        content
    )

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
