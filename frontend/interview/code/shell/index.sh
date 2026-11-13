#!/bin/bash

test=(1 2 3 4 5)

for((i=0;i<10;i++))
do
    echo test[$i]=${test[$i]}
done

echo ${test}



# 初始化变量
a=""
b=""
c=""

# 使用getopts解析命令行参数
while getopts ":a:b:c:" opt; do
    case $opt in
        a)
            a="$OPTARG"
            ;;
        b)
            b="$OPTARG"
            ;;
        c)
            c="$OPTARG"
            ;;
        \?)
            echo "无效的选项: -$OPTARG" >&2
            exit 1
            ;;
        :)
            echo "选项 -$OPTARG 需要一个参数" >&2
            exit 1
            ;;
    esac
done

# 检查是否提供了所有必要的参数
if [ -z "$a" ] || [ -z "$b" ] || [ -z "$c" ]; then
    echo "需要提供 -a, -b, 和 -c 选项"
    exit 1
fi

# 输出参数值
echo "参数 -a: $a"
echo "参数 -b: $b"
echo "参数 -c: $c"


#!/bin/bash

# 定义长选项
options=()
options+=("a:arg1" "必需参数")
options+=("b:arg2" "必需参数")
options+=("c:arg3" "必需参数")

# 解析命令行参数
while getopt_long "$@"; do
    case "$getopt_long_option" in
        a)
            arg1="$getopt_long_value"
            ;;
        b)
            arg2="$getopt_long_value"
            ;;
        c)
            arg3="$getopt_long_value"
            ;;
        --)
            break
            ;;
        *)
            echo "无效的选项: $getopt_long_option" >&2
            exit 1
            ;;
    esac
done

# 检查是否提供了所有必要的参数
if [ -z "$arg1" ] || [ -z "$arg2" ] || [ -z "$arg3" ]; then
    echo "需要提供 --a, --b, 和 --c 选项"
    exit 1
fi

# 输出参数值
echo "参数 --a: $arg1"
echo "参数 --b: $arg2"
echo "参数 --c: $arg3"


num=15

if [ $num -lt 10 ]
then
    echo "Number is less than 10."
elif [ $num -eq 10 ]
then
    echo "Number is equal to 10."
else
    echo "Number is greater than 10."
fi