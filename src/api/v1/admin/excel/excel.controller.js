const fs = require('fs');
const excelService = require('./excel.service');

const getExcelFile = async (req, res, next) => {
  try {
    const fileName = await excelService.getExcelFile();
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
    res.status(200).sendFile(fileName, (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.unlink(fileName, (error) => {
          if (error) console.log(error);
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExcelFile,
};
