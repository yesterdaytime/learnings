
# 确保Python环境使用UTF-8编码
# -*- coding: utf-8 -*-

# 示例中文字符串
chinese_str = "我爱😈编程"

# 正确切分字符串（按字符切分，而不是按字节）
for char in chinese_str:
    print(char)

print(len(chinese_str))
# 如果需要按特定长度切分（如每两个字符一段），可以使用切片
segment_length = 2
segments = [chinese_str[i:i+segment_length] for i in range(0, len(chinese_str), segment_length)]
print(segments)
