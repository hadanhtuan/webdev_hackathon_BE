const exceljs = require('exceljs');
const crypto = require('crypto');

const styleColumn = (sheet) => {
  sheet.columns.forEach((column) => {
    column.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    column.font = {
      name: 'Arial',
      size: 12,
    };
  });
};

const styleFirstRow = (sheet) => {
  sheet.getRow('1').eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ffec99' },
    };
  });
};

const styleContentRows = (sheet) => {
  for (let i = 2; i <= sheet.rowCount; i += 1) {
    if (i % 2 === 0) {
      sheet.getRow(i.toString()).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '99e9f2' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    } else {
      sheet.getRow(i.toString()).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'd8f5a2' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    }
  }
};

const styleSheet = async (sheet) => {
  styleColumn(sheet);
  styleFirstRow(sheet);
  styleContentRows(sheet);
  return sheet;
};

const createRandomName = () => {
  const fileName = crypto.randomBytes(16).toString('hex');
  return `${__dirname}/${fileName}.xlsx`;
};

const writeExcelToDisk = async (workbook) => {
  const fileName = createRandomName();
  await workbook.xlsx.writeFile(fileName);
  return fileName;
};

const createSheet = async (data, columns, sheetName, workbook, autoFilter) => {
  const sheet = workbook.addWorksheet(sheetName);
  sheet.autoFilter = autoFilter;
  sheet.columns = columns;
  sheet.addRows(data);
  styleSheet(sheet);
};

module.exports = { writeExcelToDisk, createSheet };
