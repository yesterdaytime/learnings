"""
  S1 + S2 - Sc
"""


from typing import List, Optional


class Solution:
    def computeArea(self, ax1: int, ay1: int, ax2: int, ay2: int, bx1: int, by1: int, bx2: int, by2: int) -> int:
      xAxis = sorted([ax1, ax2, bx1, bx2])
      yAxis = sorted([ay1, ay2, by1, by2])
      s1 = (ax1 - ax2) * (ay1 - ay2)
      s2 = (bx1 - bx2) * (by1 - by2)
      sc = 0
      if (
        ax1 <= xAxis[1] and ax2 >= xAxis[1] and yAxis[1] >= ay1  and yAxis[1] <= ay2 and
        bx1 <= xAxis[1] and bx2 >= xAxis[1] and yAxis[1] >= by1  and yAxis[1] <= by2):
        sc = (yAxis[1] - yAxis[2]) * (xAxis[1] - xAxis[2])
      return s1 + s2 - sc



    """
      2^x * 3^y * 5^z = n
    """

    def isUgly(self, n: int) -> bool:
      if n == 1:
        return True

      quotient = n

      while quotient > 1:
        if quotient % 2 == 0:
          quotient = quotient / 2
        elif quotient % 3 == 0:
          quotient = quotient / 3
        elif quotient % 5 == 0:
          quotient = quotient / 5
        else:
          break

      return True if quotient == 1 else False


    """
      sum = a[x] + a[y]

    """
    def twoSum(self, nums: list[int], target: int) -> list[int]:
      result = {}
      for i, num in enumerate(nums):
        anotherNum = target - num
        if (anotherNum in result): return [result[anotherNum], i]
        result[num] = i

    # def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    #   result = []
    #   remain = 0
    #   index = 0
    #   while(l1.next or l2.next):
    #     result[index] = (l1.next or 0) +  (l2.next or 0) % 10 + remain
    #     remain = int((l1.next or 0) +  (l2.next or 0) / 10)
    #     index += 1
    #   return result

    def lengthOfLongestSubstring(self, s: str) -> int:
      l = 0
      result = ''
      for c in s:
        if c in result:
          result = result.partition(c)[-1] + c
        else:
          result = result + c
        if l < len(result):
          l = len(result)

      return l


    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
      lens = len(nums1) + len(nums2)
      if (lens == 0):
        return 0
      medianIndex = [int(lens / 2), int(lens /2)] if lens % 2 == 1 else [lens / 2 - 1, lens / 2]
      i = 0
      j = 0
      result = 0
      num = 0
      for n in range(lens):
        if (i >= len(nums1)):
          num = nums2[j]
          j += 1
        elif (j >= len(nums2)):
          num = nums1[i]
          i += 1
        elif (nums1[i] < nums2[j]):
          num = nums1[i]
          i += 1
        else:
          num = nums2[j]
          j +=1

        if n == medianIndex[0]:
          result = num
        if n == medianIndex[1]:
          result = (result + num) / 2
          break

      return result


    def longestPalindrome(self, s: str) -> str:
      return None

    """
    """
    def convert(self, s: str, numRows: int) -> str:
      if (numRows == 1):
        return s

      result = [''] * numRows
      nextRow = 0
      add = 1
      for c in s:
        result[nextRow] += c
        nextRow += add
        if (nextRow == numRows -1):
          add = -1
        if (nextRow == 0):
          add = 1

      return ''.join(result)

    def reverse(self, x: int) -> int:
      strX = str(x)
      isNegative = False
      if strX[0] == '-':
        isNegative = True
        strX = strX[1:]

      result = int(strX[::-1])
      result = -result if isNegative else result

      if result > (2**31 - 1) or result < (-2)**31:
        return 0

      return result



    def myAtoi(self, s: str) -> int:
      num = ''
      for c in s:
        if c.isnumeric() or c == '+' or c == '-':
          num += c
        elif (num == '+' or c == '-') and c.isnumeric() is False:
          num = ''
        elif len(num) > 0 and c.isnumeric() is False:
          break

      result = int(num)

      if result > 2**31 - 1:
        result = 2 ** 31
      elif result < -2 ** 31:
        result = -2 ** 31
      return result

    def isPalindrome(self, x: int) -> bool: 
      result = True
      temp = str(x)
      length = len(temp)
      for index, c in enumerate(temp):
        if c != temp[length - index - 1]:
          result = False
          break
        if index > length / 2:
          break
      
      return result

    def isPalindrome1(self, x: int) -> bool: 
      s = str(x)
      if (s[::] == s[::-1]):
        return True
      return False

solution = Solution()

# 求总面积
# print(solution.computeArea(-3, 0, 3, 4, 0, -1, 9, 2))
# print(solution.computeArea(-2, -2, 2, 2, -2, -2, 9, 2))
# print(solution.computeArea(-2, -2, 2, 2, 3, 3, 4, 4))


# 求 ugly number
# print(solution.isUgly(6))
# print(solution.isUgly(14))
# print(solution.isUgly(1))
# print(solution.isUgly(200))


# 求两个数下标
# print(solution.twoSum([2,7,11,15], 9))
# print(solution.twoSum([3,2,4], 6))
# print(solution.twoSum([3,3], 6))


# 最长不重复字符串长度
# print(solution.lengthOfLongestSubstring('abcabcbb'))
# print(solution.lengthOfLongestSubstring('bbbbb'))
# print(solution.lengthOfLongestSubstring('pwwkew'))

#找中间数
# print(solution.findMedianSortedArrays([1,3], [2]))
# print(solution.findMedianSortedArrays([1,2], [3, 4]))

# 字符重组
# print(solution.convert('PAYPALISHIRING', 3))
# print(solution.convert('PAYPALISHIRING', 4))

# rev
# print(solution.reverse(-120))
# print(solution.reverse(1534236469))


# isPalindrome
print(solution.isPalindrome(121))
print(solution.isPalindrome(-121))
print(solution.isPalindrome(11))

