
def dfs(n, path=[]):
    if len(path) == n:
        print(path)
        return
    for i in range(1, n+1):
        if i not in path:
            dfs(n, path+[i])
 
n = 3  
dfs(n)


"""
    path = []

    path = [1]
    path = [2]
    path = [3]


    path = [1, 2]
    path = [1, 3]
    path = [2, 1]
    path = [2, 3]
    path = [3, 1]
    path = [3, 2]

    path = [1, 2, 3]
    path = [1, 3, 2]
    path = [2, 1, 3]
    path = [2, 3, 1]
    path = [3, 1, 2]
    path = [3, 2, 1]

"""

