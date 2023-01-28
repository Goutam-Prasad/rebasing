yearlyCTCCSV: {
      async handler(ctx) {
        try {
          if (!errors.validationCheck(["organisationId"], ctx.params))
            return this.error(errors.wrongFieldError);
          const { organisationId, financialYear, month } = ctx.params;
          let allCtc = await this.broker.call("ctc.getCTCsByOrgId", {
            organisationId,
            financialYear,
          });
          const organisation = await this.broker.call(
            "users.getOrganisationByOrganisationId",
            {
              organisationId,
            }
          );
          if (!organisation) return this.error(errors.dataNotFound);
          const {
            organisationSettings: { variableAboveCTC },
          } = organisation;
          let employeeDetails = [];
          // let csv =
          //   "Employee Id" +
          //   "," +
          //   "Employee Name" +
          //   "," +
          //   "Designation" +
          //   "," +
          //   "Fixed Cost" +
          //   "," +
          //   "Variable Cost" +
          //   "," +
          //   "Total Cost" +
          //   "\n";
          for (let ctc of allCtc) {
            let user = await this.broker.call("users.fetchUserById", {
              id: ctc.user._id,
            });
            if (!user) continue;
            const ctcValue = parseInt(ctc["costToCompany"][month]["ctc"]);
            const variablePercentage = parseInt(
              ctc["costToCompany"][month]["variablePercentage"]
            );
            const designation = await this.broker.call(
              "designation.getDesignationByDesignationID",
              {
                designationId: user.designationId,
              }
            );
            const designationName = designation
              ? designation.designationName
              : "N/A";
            let employeeId =
              user && user.currentOrganisationMeta.employeeId
                ? user.currentOrganisationMeta.employeeId
                : ``;
            let displayName = user && user.displayName ? user.displayName : ``;
            let fixedCost = variableAboveCTC
              ? ctcValue
              : Math.ceil(ctcValue - (ctcValue * variablePercentage) / 100);
            let variableCost = Math.ceil((ctcValue * variablePercentage) / 100);
            let totalCost = variableAboveCTC
              ? Math.ceil(ctcValue / 12)
              : Math.ceil(
                  (ctcValue - (ctcValue * variablePercentage) / 100) / 12
                );
            employeeDetails.push({
              employeeId: employeeId,
              displayName: displayName,
              designation: designationName,
              fixedCost: fixedCost || 0,
              variableCost: variableCost || 0,
              totalCost: totalCost || 0,
            });
          }
          return createYearlyCTCExcel(employeeDetails);
        } catch (err) {
          this.logger.error(err.message || errors.generatingFileError);
          return this.error(errors.somethingWrong);
        }
      },
    },
