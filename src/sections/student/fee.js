import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Card,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Button,
  Stack,
} from "@mui/material";
import { ConfirmationModal } from "src/components/confirmation-modal";
import { useSchoolContext } from "src/contexts/school-context";
import { useTenantContext } from "src/contexts/tenant-context";
import { toast } from "react-hot-toast";
import { getMonthsList } from "src/utils";
import apiCalls from "src/api";
import { Scrollbar } from "src/components/scrollbar";
import { format } from "date-fns";

export const StudentFee = ({ student }) => {
  const { gradeIndexToLabel, sectionsById } = useSchoolContext();
  const { tenantConfig } = useTenantContext();

  const [tutionFeeMonths, setTutionFeeMonths] = useState([]);
  const [gradeMonthlyFee, setGradeMonthlyFee] = useState(0);
  const [paidFeeMonthToObject, setPaidFeeMonthToObject] = useState({});
  const [feeSubmitModalData, setFeeSubmitModalData] = useState(null);
  
  const [monthToAmountToPay, setMonthToAmountToPay] = useState({});
  const [selectedMonths, setSelectedMonths] = useState([]);

  const getStudentFeeDetails = async () => {
    const resData = await apiCalls.getStudentFeeDetails(student.id);
    if (resData) {
      const tempPaidFeeMonthToObject = {};
      for (let index = 0; index < resData?.paid?.length; index++) {
        const element = resData.paid[index];
        tempPaidFeeMonthToObject[element.month] = element;
      }
      setPaidFeeMonthToObject(tempPaidFeeMonthToObject);
      setGradeMonthlyFee(resData.grade_monthly_fee);
    }
  };

  useEffect(() => {
    if (student.id) {
      getStudentFeeDetails();
    }
  }, [student]);

  useEffect(() => {
    if (gradeMonthlyFee > 0) {
      const monthsList = getMonthsList(
        tenantConfig?.running_session?.start_date,
        tenantConfig?.running_session?.end_date
      );
      const paidMonths = monthsList.filter(
        (item) => !!paidFeeMonthToObject[item[0]]
      );
      const unPaidMonths = monthsList.filter(
        (item) => !paidFeeMonthToObject[item[0]]
      );
      const allMonths = [...unPaidMonths, ...paidMonths];
      const tempMonthToFee = {};
      for (let index = 0; index < paidMonths.length; index++) {
        const element = paidMonths[index];
        tempMonthToFee[element[0]] = paidFeeMonthToObject[element[0]].amount;
      }
      for (let index = 0; index < unPaidMonths.length; index++) {
        const element = unPaidMonths[index];
        tempMonthToFee[element[0]] = gradeMonthlyFee;
      }
      setMonthToAmountToPay(tempMonthToFee);
      setTutionFeeMonths(allMonths);
    }
  }, [tenantConfig, gradeMonthlyFee]);

  const submitFee = async (months) => {
    const resData = await apiCalls.updateStudentFee(student.id, {
      fees: months.map((month) => ({
        month: month,
        amount: monthToAmountToPay[month],
      })),
    });
    if (resData) {
      toast.success(
        `Fee Updated for ${selectedMonths
          .map((month) => format(new Date(month), "MMM yy"))
          .join(", ")} ${selectedMonths.length === 1 ? "month" : "months"}`
      );
      getStudentFeeDetails();
      setSelectedMonths([]);
    }
  };

  const updateFeeAmount = (month, amount) => {
    const tempMonthToFee = monthToAmountToPay;
    tempMonthToFee[month] = amount;
    setMonthToAmountToPay(tempMonthToFee);
  }

  return (
    <>
      <Card>
        <Scrollbar>
          {!!selectedMonths.length && (
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack></Stack>
              <div>
                <Stack direction="row" sx={{ p: 2 }}>
                  <Button
                    onClick={() =>
                      setFeeSubmitModalData({
                        submittingMonth: selectedMonths,
                        submittingMonthString: selectedMonths
                          .map((month) => format(new Date(month), "MMM yy"))
                          .join(", "),
                      })
                    }
                  >
                    Pay fee for{" "}
                    {selectedMonths
                      .map((month) => format(new Date(month), "MMM yy"))
                      .join(", ")}{" "}
                    ({selectedMonths.length}{" "}
                    {selectedMonths.length === 1 ? "month" : "months"})
                  </Button>
                </Stack>
              </div>
            </Stack>
          )}
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Id</TableCell>
                <TableCell>Paid on</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tutionFeeMonths &&
                tutionFeeMonths.map((month) => (
                  <TableRow hover key={month[0]}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        disabled={!!paidFeeMonthToObject[month[0]]}
                        checked={
                          !!paidFeeMonthToObject[month[0]] ||
                          selectedMonths.includes(month[0])
                        }
                        onClick={() => {
                          if (selectedMonths.includes(month[0])) {
                            setSelectedMonths(
                              selectedMonths.filter((item) => item !== month[0])
                            );
                          } else {
                            setSelectedMonths([...selectedMonths, month[0]]);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ pt: 2 }}>
                        {month[1]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        disabled={!!paidFeeMonthToObject[month[0]]}
                        sx={{
                          borderColor: "success",
                        }}
                        defaultValue={monthToAmountToPay[month[0]]}
                        onChange={(e) => updateFeeAmount(month[0], e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {!!paidFeeMonthToObject[month[0]]
                        ? paidFeeMonthToObject[month[0]].transaction
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {!!paidFeeMonthToObject[month[0]]
                        ? format(
                            new Date(paidFeeMonthToObject[month[0]].created_at),
                            "dd/MMM/yyyy hh:mm a"
                          )
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>

      <ConfirmationModal
        title={"Submitting Student Fee"}
        descriptions={[
          <Typography>
            Submitting tution fee of{" "}
            <b>
              {student.first_name} {student.middle_name} {student.last_name}
            </b>{" "}
            for <b>{feeSubmitModalData?.submittingMonthString}</b> from Class{" "}
            <b>
              {
                gradeIndexToLabel[
                  sectionsById[student?.grade_section]?.grade__level
                ]
              }{" "}
              {sectionsById[student?.grade_section]?.title}
            </b>
          </Typography>,
        ]}
        open={!!feeSubmitModalData}
        onClose={() => setFeeSubmitModalData(null)}
        confirmAction={() => {
          submitFee(feeSubmitModalData?.submittingMonth);
          setFeeSubmitModalData(null);
        }}
        confirmText="Submit"
      />
    </>
  );
};
