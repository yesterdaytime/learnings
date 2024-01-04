class training_py: 
    def training_type():
        """
            基本数据类型相同, 运算符和对应的算术误差也想同
            特殊类型
            元组(tuple)： 
                a = 'test', 当没有, a是string
                a = ('test'), type(a) = str
                a = ('test',), type(a) = tuple
                所以括号不是决定参数是不是元组的凭证
                元组本身不能修改
            字典(dict):
                a = {'jack': 4098, 'guido': 4127, 'irv': 4127}
                list(a) => ['jack', 'guido', 'irv']
                sorted(a) => ['guido', 'irv', 'jack']
                for loop: for k,v in a.items

            set:
                a = set('abcdr')
                b = set('aclmz')
                a - b => {'r', 'd', 'b'}
                a | b => {'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
        """
        a = {'jack': 4098, 'guido': 4127, 'irv': 4127}
        for k, v in a.items():
            print('The user name is {0}, the tel is {1}', k, v)

        print([x * 2 for x in range(10)])



    #测试传参
    def training_args():
        """
            参数传递有两种方式： keyword 和 positional 
            / 前面的只能用positional, * 后面的只能用keyword.
            positional 不能出现在 keyword之后
        """
        def standard_arg(arg):
            print(arg)

        def pos_only_arg(arg, /):
            print(arg)
            

        def kwd_only_arg(*, arg):
            print(arg)

        def combined_example(pos_only, /, standard, *, kwd_only):
            print(pos_only, standard, kwd_only)

        """
            **kwds: 传递dict,参数key 对应参数名， value对应参数值
            *args: 传递数组，对应参数位置, 后面跟的字段必须用keywords
            如果函数中同时有*args和**kwds, *args 必须放在 **kwds前面
        """
        def foo(name, /, **kwds): 
            return 'name' in kwds
        
        def combined_args_kwds(name, /, *args, **kwds):
            print(name, *args, **kwds)

        def test_multiple_args(arg0, arg1, arg2, arg3):
            print(arg0, arg1, arg2, arg3)
        

        standard_arg(1)
        pos_only_arg(1)
        kwd_only_arg(arg=2)
        combined_example(1, standard=2, kwd_only=10)
        foo(1, **{'name': 1})
        test_multiple_args(arg2=10, arg3=3)
        combined_args_kwds(1, *[2,4,4,5], **{'name': 2})

    def scope_test():
        def do_local():
            spam = "local spam"

        def do_nonlocal():
            nonlocal spam
            spam = "nonlocal spam"

        def do_global():
            global spam
            spam = "global spam"

        spam = "test spam"
        do_local()
        print("After local assignment:", spam)
        do_nonlocal()
        print("After nonlocal assignment:", spam)
        do_global()
        print("After global assignment:", spam)

    def format_training():
        print(f'This is a testing: arg1 is {0}, arg2 is {1}'.format(1, 3))
        table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 8637678}
        print('Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; Dcab: {0[Dcab]:d}'.format(table))
        print('Jack: {Jack:d}; Sjoerd: {Sjoerd:d}; Dcab: {Dcab:d}'.format(**table))

        for x in range(1, 40):
            print('{0:2d} {1:3d} {2:4d}'.format(x, x*x, x*x*x))


training_py.format_training()
# print("In global scope:", spam)

