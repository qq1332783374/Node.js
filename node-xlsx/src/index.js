const XLSX = require('xlsx');
const path = require('path');
const _ = require('loadsh');

console.log('********* 开始处理表格 *********');

/* 1. 处理表格文件
=========================================== */
console.log('正在读取文件...');
// 1.1. 读取文件
const workbook = XLSX.readFile(
        path.resolve(__dirname, './assets/区平台学生激活情况-2020-12-04 16-45.xlsx'), 
        {type: 'base64'}
    );

// 1.2. 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2',……]
// 1.3. 根据表名获取对应某张表
const worksheet = workbook.Sheets[sheetNames[1]];
// 1.4. 针对单个表，返回序列化json数据
const worksheetJson = XLSX.utils.sheet_to_json(worksheet);  
console.log('文件读取成功！！！');
/* 2. 数据处理
=========================================== */

console.log('********** 开始数据处理 **********');

// 2.1 groupBy 学校数据分类
const dataType =  _.groupBy(worksheetJson, '学校名称');

console.log('数据正在处理中...');

// 2.2 求出各个学校激活人数总数，并且在数组第一位添加合计 item
// item = { 镇街: 镇街, 学校名称: 学校名称, 年级: 合计, 激活人数: 激活人数总数 }
const resData = [];
for (let keyName in dataType) {
    const total = _.sumBy(dataType[keyName], '激活人数');
    let item = {
        '镇街': dataType[keyName][0]['镇街'],
        '学校名称': dataType[keyName][0]['学校名称'],
        '年级': '合计',
        '激活人数': total
    };
    dataType[keyName].unshift(item);

    resData.push(...dataType[keyName]);
}

console.log('数据处理成功！！！');

/* 3. 表格导出
=========================================== */

console.log('*********** 正在导出表格 **********');

// 3.1 将 json 数组转成 xlsx 表格形式
const ws = XLSX.utils.json_to_sheet(resData);

// 3.2 新建一个表格对象
const wb = XLSX.utils.book_new();

// 3.3 将处理好的json 数据添加到表格中
XLSX.utils.book_append_sheet(wb, ws, 'test');

// 3.4 文件导出
const outFileName = new Date().getTime();
XLSX.writeFile(wb, `output/${outFileName}.xlsx`);

console.log(`表格导出成功 /output/${outFileName}`);
