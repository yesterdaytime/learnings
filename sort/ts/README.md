# 排序统计

| 排序方法  | 时间复杂度(A) | 时间复杂度(W) | 时间复杂度(B) | 空间复杂度 | 稳定性 |
|-         |-            |-            |-             |-         |-      |
|冒泡排序   |   $O(n^2)$   | $O(n^2)$   | $O(n)$        | $O(1)$   | Y
|选择排序   |   $O(n^2)$   | $O(n^2)$   | $O(n^2)$      | $O(1)$   | N
|插入排序   |   $O(n^2)$   | $O(n^2)$   | $O(n)$        | $O(1)$   | Y
|快速排序   |   $O(nlog{_2}{n})$ | $O(n^2)$ | $O(nlog{_2}{n})$ | $O(nlog{_2}{n})$ | N
|归并排序   | $O(nlog{_2}{n})$ | $O(nlog{_2}{n})$ | $O(nlog{_2}{n})$ | O(n) | Y
|组合排序   |   $O(n^2/2^p)$ | $O(n^2)$ | $O(nlog{_2}{n})$ | $O(1)$ | Y
|shell排序 |   $O(n^{1.3})$ | $O(n^2)$ | $O(n)$ | $O(1)$ | N
| -        |           |        |     
|计数排序   |   O($n+k$) | O($n+k$) | O($n + k$) | O($n + k$) | Y
|桶排序     |   O($n+k$) | $O(n^2)$ | O($n$) | O($n + k$) | Y
|基数排序   |   O($n*k$) | O($n*k$) | O($n*k$) | O($n + k$) | Y


    稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。

    不稳定：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。
