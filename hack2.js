const { getYearFromFY } = require("./dateCheckUtil");



      ws.cell(i, 1).string(month);
      ws.cell(i, 3).string(financialYear);
      ws.cell(i, 3).string(employeeId);
      ws.cell(i, 4).string(displayName);
      // ws.cell(i, 5).string(dateOfJoining).style({ numberFormat: "@" });
      // ws.cell(i, 6).string(dateOfBirth).style({ numberFormat: "@" });
      // ws.cell(i, 7).string(dateOfLeaving).style({ numberFormat: "@" });
      // ws.cell(i, 8).string(phone);
      // ws.cell(i, 9).string(designation);
      // ws.cell(i, 10).string(department);
      // ws.cell(i, 11).string(location);
      // ws.cell(i, 12).string(gender);
      // ws.cell(i, 13).string(maritalStatus);
      // ws.cell(i, 14).string(PFNo);
      // ws.cell(i, 15).string(ESICNo);
      // ws.cell(i, 16).string(UAN);
      // ws.cell(i, 17).string(bankAccountNumber);
      // ws.cell(i, 18).string(IFSC);
      // ws.cell(i, 19).string(basic);
      // ws.cell(i, 20).string(DA);
      // ws.cell(i, 21).string(Regime);
      // ws.cell(i, 22).number(HRA);
      // ws.cell(i, 23).number(LTA);
      // ws.cell(i, 24).number(specialAllowances);
      // ws.cell(i, 25).number(employee_ESIC);
      // ws.cell(i, 26).number(employer_ESIC);
      // ws.cell(i, 27).number(employee_PF);
      // ws.cell(i, 28).number(employer_PF);
      // ws.cell(i, 29).number(employee_LWF);
      // ws.cell(i, 30).number(employer_LWF);
      // ws.cell(i, 31).number(proffTax);
      // ws.cell(i, 32).number(allowances);
      // ws.cell(i, 33).number(statutoryBonus);
      // ws.cell(i, 34).number(incomeTax);
      // ws.cell(i, 35).number(otherDeductions);
      // ws.cell(i, 36).number(otherCredits);
      // ws.cell(i, 37).number(monthyCTC);
      // ws.cell(i, 38).number(totalEarnings);
      // ws.cell(i, 39).number(totalEarnings);
      // ws.cell(i, 40).number(totalDeductions);
      // ws.cell(i, 41).number(takeHome);
      for (let days = 1; days <= monthDays; days++) {
        ws.cell(1, 41 + i).string(i).style(headingStyle);
      }
    }
    for (let ind2 = 1; ind2 <= monthDays; ind2++) {
      ws.addDataValidation({
        type: "list",
        allowBlank: 1,
        prompt: "Choose from dropdown",
        error: "Invalid choice was chosen",
        showDropDown: true,
        sqref: `${excel.getExcelAlpha(41 + ind2)}2:${excel.getExcelAlpha(
          41 + ind2
        )}`,
        formulas: [`=Sheet2!$A$1:$A$9`],
      });
  }
    ws.addDataValidation({
      type: "list",
      allowBlank: 1,
      prompt: "Choose from dropdown",
      error: "Invalid choice was chosen",
      showDropDown: true,
      // sqref: `U2:U${employees.length + 1}`,
      formulas: [`=Sheet2!$A$10:$A$11`],
    });
  return wb.writeToBuffer();
  }
}



line 1332 error
