class Solution:

    '''
        选最高的，对比对应的面积
    '''
    def max_area(self, height: list[int]) -> int:
        max_area = 0
        right = 0
        left = len(height) - 1
        while(left > right):
            right_h = height[right]
            left_h = height[left]
            s = (left - right) * min(right_h, left_h)
            if (max_area < s):
                max_area = s

            if right_h < left_h:
                right += 1  
            else: 
                left -= 1

        return max_area


solution = Solution()
print(solution.max_area([1,8,6,2,5,4,8,3,7]))

'''
    (n - y) * (m + x) = nm - m + n -1
    xn - ym - 1 > 0 
    则 
'''