# list.append([1]), set.add(1), dict['no'] = '';

#  list.remove(3), set.remove(2), delete dict['no']

# 返回 True or False:  1 in list, 2 in set, dict['no'] is None

# list[1], dict['no']

students = [
    {'id': 0, 'name': '张三', 'age': 21},
    {'id': 1, 'name': 'Jane', 'age': 39},
    {'id': 2, 'name': 'Jun', 'age': 48},
    {'id': 3, 'name': 'Wk', 'age': 1},
    {'id': 4, 'name': 'El', 'age': 48},
    {'id': 5, 'name': '李四', 'age': 40},
    {'id': 6, 'name': '王五', 'age': 29},
    {'id': 7, 'name': 'Sdd', 'age': 31},
]

students1 = [
    {'id': 0, 'name': '张三', 'age': 21},
    {'id': 8, 'name': '张三', 'age': 43},
    {'id': 9, 'name': '张三', 'age': 43},
]

def get_id(student):
    return student['id']
ids =  map(get_id, filter(lambda student: student['name'] == '张三' , students))

ids =  [ student['id'] for student in filter(lambda student: student['name'] == '张三' , students)]

map(lambda num: (num+1)**2, range(10))
'''
    作业：
        1. 用上面的例子,输出所有学生的name
        2. 输出前一步中所有名字，但不能重复， 张三只能在list中显示一次
        3. 输出年龄大于30的学生信息
        4. 输出年龄大于30的学生的id
'''
# 1
def test1(student):
    return student['name']
names = map(test1, students)

names = map(lambda student: student['name'], students)

names = [ student['name'] for student in students]
print(names)

# 2
names = set(names)
print(names)

#3 and 4
def test(student):
    return student['age'] > 30
more_than_30_age = list(filter(test, students))
ids = [ student['id'] for student in more_than_30_age ]
print(ids)

more_than_30_age1 = list(filter(lambda student: student['age'] > 30, students))
ids = [ student['id'] for student in more_than_30_age1 ]
print(ids)


ids = [ student['id'] for student in sorted(students, key = lambda student: student['age'])]
print(ids)

'''
    下列参数名相同的，代表两种实现方式，在作业中，可以任选其一实现
    字典取值:
        user = {'id': 0, 'name': '张三', 'age': 21}
        id = user['id']
    map应用(两种方法):
        l = list(map(lambda num: (num+1)**2, range(10))) # 输出1-10的平方
        l = [(num+1)**2 for num in range(10)] # 输出1-10的平方
    filter应用:
        from random import randrange
        nums = [randrange(50) for _ in range(10)] # 随机生成10个50以内的整数 _: 这个是占位符，当参数没有用到，可以用它代替
        nums = list(map(lambda i: randrange(50), range(10))) # 随机生成10个50以内的整数
        l = list(filter(lambda num: num > 5, nums)) # 输出大于5的数
'''
