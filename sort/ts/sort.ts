import { range } from "lodash";

const random_max_value = 10000000;

// range(n) === [...Array(n).keys()]
const list = (max_random: number = random_max_value) => range(100000).map(index =>  Math.floor(Math.random() * max_random));

const calculate_max_10_value = (list: number[]) => {
    let max = list[0];
    for (let i = 0; i < list.length; i++) {
        if(max < list[i]) {
            max = list[i];
        }
    }

    let power = 0;
    for (let index = 1; index <= max; index *= 10) {
        power++;
    }
    return Math.pow(10, power);
}

const swap = (a: number, b: number) => {
    return a > b ? [b, a] : [a, b];
}

// Bubble Sort
/**
 *  交换两个相邻的数据，最大的会交换到最后的，循环交换剩下的，直到最后一个元素
 */
console.time('bubble origin');
const bubble_sort = () => {
    const sort_list = list();

    for (let i = 0; i < sort_list.length; i++) {
        for (let j = 0; j < sort_list.length - i - 1; j++) {
            if(sort_list[j] > sort_list[j + 1]) {
                [sort_list[j], sort_list[j+1]] = swap(sort_list[j], sort_list[j + 1]);
            }
        }
    }

    return sort_list;
}

bubble_sort();
console.timeEnd('bubble origin');

// Selection Sort
/**
 * 找到最小的，和当前最小下标对应的数字互换，然后当前最小下标+1，继续在剩下的里面找最小的
 */
console.time('selection origin');

const selection_sort = () => {
    const sort_list = list();

    for (let i = 0; i < sort_list.length - 1; i++) {
        let min_index = i + 1;
        for (let j = i + 1; j < sort_list.length; j++) {
            if (sort_list[j] < sort_list[min_index]) {
                min_index = j;
            }
        }
        [sort_list[i], sort_list[min_index]] = swap(sort_list[i], sort_list[min_index]);
    }

    return sort_list;
}

selection_sort();
console.timeEnd('selection origin');

// Insertion Sort
/**
 * 循环数据，比较当前值与前面的值，并交换，直到不能交换为止.
 * 
 */
console.time('insertion origin');
const insertion_sort = () => {
    const sort_list = list();

    for (let i = 0; i < sort_list.length; i++) {
        for (let j = i; j > 0; j--) {
            if (sort_list[j] < sort_list[j-1]) {
                [sort_list[j-1], sort_list[j]] = swap(sort_list[j-1], sort_list[j]);
            } else {
                break;
            }
        }
    }

    return sort_list;
}

insertion_sort();
console.timeEnd('insertion origin');

// Merge Sort
/**
 * 1. 将数组不停的平分，直到只有一个结束，然后对两个数进行排序，
 * 2. 将平分的数组合并，合并的时候，因为是排过序的，哪个值小，放入对应的数组位置，下标加1
 * 3. 重复&2， 直到完成排序
 * 
 */
(function () {
    console.time('Merge origin');
    const sort_list = list();


    const merge = (list: number[], left: number, mid: number, right: number) => {
        let k = 0;
        let i = left;
        let j = mid + 1;
        let temp = [];
        
        while (i <= mid && j <= right) {
            if (list[i] <= list[j]) {
                temp[k] = list[i];
                i++;
            } else {
                temp[k] = list[j];
                j++;
            }

            k++;
        }

        while (i <= mid) {
            temp[k++] = list[i++];
        }

        if (j <= right) {
            temp[k++] = list[j++];
        }

        for (let m = 0; m < temp.length; m++) {
            list[left + m] = temp[m];
        }
    }

    const merge_sort = (list: number[], left: number, right: number) => {
        if (left >= right) return ;
        const mid = Math.floor((left + right) / 2);
        merge_sort(list, left, mid);
        merge_sort(list, mid+1, right);
        merge(list, left, mid, right);
    }

    const sort = () => {
        merge_sort(sort_list, 0, sort_list.length - 1);
        return sort_list;
    }

    sort();
    console.timeEnd('Merge origin');
})();

// Counting Sort
/**
 * 计数排序适合数据范围不大，但数据量比较大的情况，如果数据范围很大，数据量不大，则效率很差。
 * 1. 找到最大的数字，建一个长度为最大数的list, 全部填充为0
 * 2. 循环数组，对应的数字作为&1中数组的下标，取值 +1，直到循环结束
 * 3. 循环&1数组，然后用小标加对应的值，重新填充数组
 */
(function() {
    console.time('Counting origin');
    const sort_list = list();


    const sort = () => {
        let max = sort_list[0];
        let temp: number[] = [];
    
        for(let i = 1; i < sort_list.length; i++) {
            if (max < sort_list[i]) {
                max = sort_list[i];
            }
        }

        let conter_list = Array(max + 1).fill(0);

        for (let j = 0; j < sort_list.length; j++) {
            conter_list[sort_list[j]]++
        }

        for (let k = 0; k < max + 1; k++) {
            conter_list[k] > 0 ? temp = temp.concat(Array(conter_list[k]).fill(k)) : null;
        }

        for (let m = 0; m < temp.length; m++) {
            sort_list[m] = temp[m];
        }
        
        return sort_list;
    }

    sort();
    console.timeEnd('Counting origin');
})();

// Radix Sort
/**
 *  基数排序：适合大数据，数量比较少的排序，如果数据比较多，可以尝试 Bucket sort 
 *  1. 找到最大的值，然后对所有数10 * n取余，从个位数到最高位，对余数排序，用排序后的下标覆盖原数组
 */
(function() {
    console.time('Radix origin');
    let sort_list = list(Math.pow(10, 15));

    
    let num_index: number[][] = [];


    let temp = [...sort_list];

    const max_10_multiple_value = calculate_max_10_value(sort_list);

    for (let i = 1; i < max_10_multiple_value; i *= 10) {
        num_index = [];
        for (let j = 0; j < sort_list.length; j++) {
            num_index.push([Math.floor(sort_list[j] / i) % 10, j]);
        }

        num_index.sort((a, b) => a[0] - b[0]);

        for (let k = 0; k < num_index.length; k++) {
            temp[k] = sort_list[num_index[k][1]];
        }
        
        sort_list = [...temp];
    }


    sort_list;
    console.timeEnd('Radix origin');
})();

// Bucket Sort
/**
 * 1. 将数组根据大小分成多份，确保前面的bucket中的数字都小于后面的bucket中的数字
 * 2. 对每个bucket中的数字排序
 * 3. 合并bucket
 * 
 *  本质: a^2 + b^2 < (a + b)^2
 */
(function() {
    console.time('Bucket origin');
    const sort_list = list();


    const max_10_multiple_value = calculate_max_10_value(sort_list);

    const sort = () => {
        const bucket_number = Math.max(Math.ceil(sort_list.length / 4), max_10_multiple_value / 1000);
        
        const buckets: number[][] = Array(bucket_number).fill([]);

        for (let i = 0; i < sort_list.length; i++) {
            const bucket_index = Math.floor((sort_list[i] / random_max_value) * bucket_number);
            // 这个地方不能用push, full 填充的是相同引用的值，push等方法不改变引用，只改变值，导致最后fill的数组是一样的。
            buckets[bucket_index] = buckets[bucket_index].concat(sort_list[i]);
        }

        for (let i = 0; i < buckets.length; i++) {
            buckets[i].sort((a, b) => a - b);
        }

        let index = 0;
        for(let bucket of buckets) {
            for( let value of bucket) {
                sort_list[index++] = value;
            }
        }

        return sort_list;
    }

    sort();
    console.timeEnd('Bucket origin');
})();

// Comb Sort
/**
 *  1.选一个系数，根据长度得到一个gap，通过比较i和i+gap两个值，将最大的换到后面，
 *  2. gap=gap/shrink，然后继续进行冒泡排序，将这轮的最大的交换到后面
 *  3.重复&2， 直到 gap小于1结束
 *  本质： 
 *      
 */
(function() {
    console.time('Comb origin');
    const sort_list = list();
    console.info(sort_list)
    const shrink = 1.3;

    const sort = () => {
        let gap = Math.floor(sort_list.length / shrink);
        while (gap >= 1) {
            for (let i = 0; i + gap < sort_list.length; i++) {
                [sort_list[i], sort_list[i + gap]] = swap(sort_list[i], sort_list[i + gap]);
            }
            console.info(sort_list)
            gap = Math.floor(gap / shrink);
        }

        return sort_list;
    }

    console.info(sort());
    console.timeEnd('Comb origin');
})();

// Shell Sort
/**
 *  1.从中间分，然后比较两个值交换
 *  2. 四个一组，然后从前到后判断并交换，因为第一次的操作，我们对找到的值进行向后平移，直到第一个正好大于current的位置，将current赋给这个位置就可以了
 *  3. 重复第二步，直到gap大于0为止。
 */
(function() {
    console.time('Shell Sort');
    const sort_list = list();

    const sort = () => {
        for (let gap = Math.floor(sort_list.length / 2); gap >  0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < sort_list.length; i++) {
                const value = sort_list[i];
                let j = i;
                // while (j - gap >= 0 && value < sort_list[j - gap]) {
                //     sort_list[j] = sort_list[j - gap];
                //     j = j - gap;
                // }
                for (j = i; j >= gap && sort_list[j - gap] > value ; j -= gap) {
                    sort_list[j] = sort_list[j - gap];
                }
                // For循环先计算-=，然后比较，所以这个地方的j是j-gap 之后的值。
                sort_list[j] = value;
            }
        }
        
        return sort_list;
    }

    sort();
    console.timeEnd('Shell Sort');
})();

// Quick Sort
/**
 * 选一个数，把所有小于它的数移到左边，大于的移到右边，然后递归处理左边和右边
 */
(function(){
    console.time('quick origin');
    const sort_list = list();


    const partition = (list: number[], left: number, right: number) => {
        let i = left, j = right, value = list[left];

        while(i < j) {
            while(i < j && list[j] > value) {
                j -= 1;
            }

            while (i < j && list[i] <= value) {
                i += 1;
            }

            if (i < j) {
                [list[i], list[j]] = swap(list[i], list[j]);
            }
        }

        [list[left], list[j]] = swap(list[left], list[j]);
        return i;
    }

    const quickSort = (nums: number[], left: number, right: number) => {
        if (left >= right) return;
        const pivot = partition(nums, left, right);
        quickSort(nums, left, pivot - 1);
        quickSort(nums, pivot + 1, right);
    }

    quickSort(sort_list, 0, sort_list.length - 1);

    console.log(sort_list);

    console.timeEnd('quick origin');
})();


