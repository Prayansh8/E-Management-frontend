import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "src/components/chart";
import apiCalls from "src/api";

const useChartOptions = (categories) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      horizontalAlign: "left",
      labels: {
        colors: theme.palette.text.secondary,
      },
      position: "top",
      show: true,
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      radius: 2,
      shape: "circle",
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: "smooth",
      dashArray: [0, 0, 0],
      lineCap: "butt",
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: [
      {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
    ],
  };
};

export const AttendanceChart = ({ defaultParams }) => {
  
  const [dates, setDates] = useState([]);
  const [presentCounts, setPresentCounts] = useState([]);
  const [absentCounts, setAbsentCounts] = useState([]);
  const [onLeaveCounts, setOnLeaveCounts] = useState([]);
  
  const getDashboardStats = async () => {
    const resData = await apiCalls.getDateRangeAttendance({ ...defaultParams });
    if (resData) {
      const datesTemp = [];
      const presentCountsTemp = [];
      const absentCountsTemp = [];
      const onLeaveCountsTemp = [];
      for (let index = 0; index < resData.length; index++) {
        const attendanceItem = resData[index];
        datesTemp.push(format(new Date(attendanceItem.timestamp_date), "dd MMM"));
        presentCountsTemp.push(attendanceItem.total_students_present);
        absentCountsTemp.push(attendanceItem.total_students_absent);
        onLeaveCountsTemp.push(attendanceItem.total_students_leave);
      }
      setDates(datesTemp);
      setPresentCounts(presentCountsTemp);
      setAbsentCounts(absentCountsTemp);
      setOnLeaveCounts(onLeaveCountsTemp);
    }
  };

  const chartOptions = useChartOptions(dates);

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    !!dates.length && (
      <Card>
        <CardHeader title="Attendance Summary" />
        <CardContent sx={{ pt: 0 }}>
          <Chart
            height={320}
            options={chartOptions}
            series={[
              {
                name: "Present",
                data: presentCounts,
              },
              {
                name: "Absent",
                data: absentCounts,
              },
              {
                name: "On Leave",
                data: onLeaveCounts,
              },
            ]}
            type="line"
          />
        </CardContent>
      </Card>
    )
  );
};
