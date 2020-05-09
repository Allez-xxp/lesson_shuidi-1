class EasyDate {
    constructor() {
        this.base = new Date(); //挂载到这里
    }
    toDate() {
        // 怎么补getFullYear这个方法 
        // 这就应该是日期对象
        
        return this.base;
    }
    // 要是一个静态方法
    static isLeapYear(year) {
        // 判断是否是闰年
        // return false;
        if (year % 100 === 0) {
            return year % 400 === 0;
        }
        return yarn % 4 === 0;
    }
    static toDouble(number) {
        return number > 9 ? number.toString() : ('0' + number);
    }

}

module.exports = EasyDate;