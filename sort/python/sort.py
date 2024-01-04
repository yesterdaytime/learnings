import random;
from math import floor
import time

def time_spend(func):
    def wrapper(*args, **kwds):
        begin = time.time()
        func(*args, **kwds)
        end = time.time()
        print(f"Total time taken in : {func.__name__} {end - begin :0.3f}")

    return wrapper

class sort_in_py:

    def get_max(self, arr): 
        max = arr[0]
        for item in arr:
            if (item > max):
                max = item
        
        return max

    def get_sort_list(self, max = 10000000000):
        return list(map(lambda x: random.randrange(max),  range(100000)))

    def swap(self, list, i, j):
        value = list[i]
        list[i] = list[j]
        list[j] = value

    @time_spend
    def built_in_sort(self):
        arr = self.get_sort_list()
        arr.sort()

    # Bubble Sort
    @time_spend
    def bubble_sort(self):
        arr = self.get_sort_list()
        lenth = len(arr)
        for i in range(lenth, 0, -1):
            for j in range(i - 1):
                if (arr[j] > arr[j + 1]):
                    self.swap(arr, j, j+1)
        

    # Selection Sort
    @time_spend
    def selection_sort(self):
        arr = self.get_sort_list()
        l = len(arr)

        for i in range(l-1):
            for j in range(i+1, l):
                if (arr[j] < arr[i]):
                    self.swap(arr, i, j)
        

    # Insertion Sort
    @time_spend
    def insertion_sort(self):
        arr = self.get_sort_list()
        l = len(arr)

        for i in range(1, l):
            for j in range(i, 0, -1):
                if (arr[j] < arr[j - 1]): 
                    self.swap(arr, j, j-1)
                else:
                    break


    # Merge Sort
    def merge(self, arr, left, mid, right):
        i = left
        j = mid+1
        temp = []
        
        while (i <= mid and j <= right): 
            if (arr[i] <= arr[j]):
                temp.append(arr[i])
                i += 1
            else:
                temp.append(arr[j])
                j += 1
        
        while(i <= mid):
            temp.append(arr[i])
            i += 1

        while(j <= right):
            temp.append(arr[j])
            j += 1
        
        for k in range(len(temp)):
            arr[left + k] = temp[k]


    """
        以长度为10的数组为例，通过递归，最后的结果是
                                                self.merge(list, 0, 4, 9)
                        self.merge(list, 0, 4)                              self.merge(list, 5, 9) 
                self.merge(list, 0, 2)   self.merge(list, 3, 4)       self.merge(list, 5, 7)  self.merge(list, 8, 9) 
        self.merge(list, 0, 1)                                  self.merge(list, 5, 7)

        其中 left 和 right 是 【left, right], 不是[left, right), 单个节点没有算，最后的顺序是左子树merge排序 -> 右子树merge排序 -> root节点merge排序
    """
    def merge_sort_recursion(self, list, left, right):
        if (left >= right):
            return 
        
        mid =  floor((left + right) / 2)
        self.merge_sort_recursion(list, left, mid)
        self.merge_sort_recursion(list, mid + 1, right)
        self.merge(list, left, mid, right)
        

    @time_spend
    def merge_sort(self):
        arr = self.get_sort_list()
        l = len(arr)
        self.merge_sort_recursion(arr, 0, l - 1)


    # Counting Sort
    @time_spend
    def counting_sort(self):
        arr = self.get_sort_list()
        temp = []
        max = self.get_max(arr)
        
        count_list = [0] * (max + 1)
        for item in arr:
            count_list[item] += 1
        
        for i, v in enumerate(count_list):
            temp.extend([i]*v)

        arr = temp            
    
    # Radix Sort
    @time_spend
    def radix_sort(self):
        arr = self.get_sort_list(10**7)
        max = self.get_max(arr)
        ten_multiple = 1
        while(ten_multiple < max):
            ten_multiple *= 10
            temp = arr.copy()
            i_v = []
            for i, v in enumerate(arr):
                i_v.append([floor((v % ten_multiple) / ten_multiple * 10), i])

            i_v.sort()

            for i, v in enumerate(i_v):
                arr[i] = temp[v[1]]
            

    # Bucket Sort
    @time_spend
    def bucket_sort(self):
        arr = self.get_sort_list()
        bucket_count = 3
        buckets = [[] for i in range(bucket_count)]
        max = self.get_max(arr) + 1
        temp = []
        for value in arr:
            index = floor((value / max) * bucket_count)
            buckets[index].append(value)
        
        for bucket in buckets:
            bucket.sort()
            temp.extend(bucket)

        arr = temp
        

    # Comb Sort
    @time_spend
    def comb_sort(self):
        arr = self.get_sort_list()
        shrink = 1.3
        gap = floor(len(arr)/shrink)
        while gap >= 1:
            for i in range(len(arr) - gap):
                if (arr[i] > arr[i + gap]):
                    self.swap(arr, i, i+gap)
                    i += 1
            gap = floor(gap/shrink)

    # Shell Sort
    @time_spend
    def shell_sort(self):
        arr = self.get_sort_list()
        l = len(arr)
        gap = floor(l/2)
        while gap > 0:
            for i in range(gap, l):
                for j in range(i, gap - 1, -gap):
                    if (arr[j] < arr[j - gap]):
                        self.swap(arr, j, j-gap)
                    else: 
                        break

            gap = floor(gap/2)
        

    # Quick Sort
    def quick_e_step(self, arr, left, right):
        compare_v = arr[left]

        start = left

        while(start < right):
            while start < right and arr[right] >= compare_v: 
                right -= 1
            while start < right and arr[start] <= compare_v:
                start += 1
            self.swap(arr, start, right)

        self.swap(arr, left, right)

        return start
    
    def __quick_sort_recursion(self, arr, left, right): 
        if (left >= right): 
            return
        
        pivot = self.quick_e_step(arr, left, right)
        self.__quick_sort_recursion(arr, left, pivot-1)
        self.__quick_sort_recursion(arr, pivot + 1, right)
        
    
    @time_spend
    def quick_sort(self):
        arr = self.get_sort_list()
        l = len(arr)
        self.__quick_sort_recursion(arr, 0, l-1)

    MIN_MERGE = 32


    def calcMinRun(self, n): 
        """Returns the minimum length of a 
        run from 23 - 64 so that 
        the len(array)/minrun is less than or 
        equal to a power of 2. 

        e.g. 1=>1, ..., 63=>63, 64=>32, 65=>33, 
        ..., 127=>64, 128=>32, ... 
        """
        r = 0
        while n >= self.MIN_MERGE: 
            r |= n & 1
            n >>= 1
        return n + r 


    # This function sorts array from left index to 
    # to right index which is of size atmost RUN 
    def insertionSort(self, arr, left, right): 
        for i in range(left + 1, right + 1): 
            j = i 
            while j > left and arr[j] < arr[j - 1]: 
                arr[j], arr[j - 1] = arr[j - 1], arr[j] 
                j -= 1


    # Merge function merges the sorted runs 
    def merge(self, arr, l, m, r): 

        # original array is broken in two parts 
        # left and right array 
        len1, len2 = m - l + 1, r - m 
        left, right = [], [] 
        for i in range(0, len1): 
            left.append(arr[l + i]) 
        for i in range(0, len2): 
            right.append(arr[m + 1 + i]) 

        i, j, k = 0, 0, l 

        # after comparing, we merge those two array 
        # in larger sub array 
        while i < len1 and j < len2: 
            if left[i] <= right[j]: 
                arr[k] = left[i] 
                i += 1

            else: 
                arr[k] = right[j] 
                j += 1

            k += 1

        # Copy remaining elements of left, if any 
        while i < len1: 
            arr[k] = left[i] 
            k += 1
            i += 1

        # Copy remaining element of right, if any 
        while j < len2: 
            arr[k] = right[j] 
            k += 1
            j += 1


    def timSort(self): 
        arr = self.get_sort_list()
        n = len(arr) 
        minRun = self.calcMinRun(n) 

        for start in range(0, n, minRun): 
            end = min(start + minRun - 1, n - 1) 
            self.insertionSort(arr, start, end) 

        size = minRun 
        while size < n: 

            for left in range(0, n, 2 * size): 

                mid = min(n - 1, left + size - 1) 
                right = min((left + 2 * size - 1), (n - 1)) 
                if mid < right: 
                    self.merge(arr, left, mid, right) 

            size = 2 * size 




sort_cls = sort_in_py()

sort_cls.timSort()
sort_cls.bucket_sort()
sort_cls.comb_sort()
sort_cls.merge_sort()
sort_cls.shell_sort()
sort_cls.radix_sort()
sort_cls.quick_sort()
sort_cls.counting_sort()
sort_cls.selection_sort()
sort_cls.insertion_sort()
sort_cls.bubble_sort()
