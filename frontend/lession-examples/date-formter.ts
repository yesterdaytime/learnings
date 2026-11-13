/**
 * 参数归一化
 *      目的： 处理多重case的时候，我们可以对参数进行统一处理，处理之后的参数可以用一个function 来处理
 *      思考： 当function的参数对应的cases有多个时， 一种是根据判断处理不同的分支，在分支中返回不同的结果，一种是通过判断处理不同的参数，转化成统一格式，然后交由一个function实现
 *
 *  参数归一化就是第二种方式
 */

function _formatNormalize(formatter: string | Function) {
    if (typeof formatter === 'function') {
        return formatter;
    } else if (typeof formatter !== 'string') {
        throw new Error("We can't parse this formate");
    } else if (formatter === 'date') {
        formatter = 'yyyy-MM-dd';
    } else if (formatter === 'datetime') {
        formatter = 'yyyy-MM-dd HH:mm:ss';
    }

    return (dateInfo: any) => {
        const { yyyy, MM, dd, HH, mm, ss } = dateInfo;

        return formatter
            .replace(/yyyy/g, yyyy)
            .replace(/MM/g, MM)
            .replace(/dd/g, dd)
            .replace(/HH/g, HH)
            .replace(/mm/g, mm)
            .replace(/ss/g, ss);
    };
}

function formate(date: Date, formatter: string | Function, isPad?: boolean) {
    formatter = _formatNormalize(formatter);

    function _pad(value: number, length: number) {
        if (isPad) {
            return (value + '').padStart(length, '0');
        }

        return value.toString();
    }

    const result = formatter({
        year: _pad(date.getFullYear(), 2),
        yyyy: _pad(date.getFullYear(), 2),
        MM: _pad(date.getMonth(), 2),
        dd: _pad(date.getDate(), 2),
        HH: _pad(date.getHours(), 2),
        mm: _pad(date.getMinutes(), 2),
        ss: _pad(date.getSeconds(), 2),
    });

    console.log(result);

    return result;
}

// 2024-3-21
formate(new Date(), 'date');

// 2024-3-21 13:8:33
formate(new Date(), 'datetime');

// 2024-03-21
formate(new Date(), 'date', true);

// 2024-03-21 13:8:33
formate(new Date(), 'datetime', true);

// 2024-03-21 13:08:33
formate(new Date(), 'yyyy年MM月dd日 HH:mm:ss');

//
formate(new Date(), (dateInfo: any) => {
    const { year } = dateInfo;
    const thisYear = new Date().getFullYear();

    if (year < thisYear) {
        return `${thisYear - year}年前`;
    } else if (year > thisYear) {
        return `${year - thisYear}年后`;
    } else {
        return '今年';
    }
});
