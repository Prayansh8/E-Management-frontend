import PropTypes from "prop-types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useEffect, useState } from "react";
import { breakPaginatedResponse, snakeCaseToTitle } from "src/utils";
import { format } from "date-fns";
import apiCalls from "src/api";
import { paths } from "src/paths";
import { Link } from "react-router-dom";

const getAssociatedUserName = (user) => {
  if (user.type === "student") {
    return `${user.first_name} ${user.middle_name} ${user.last_name}`;
  } else if (user.type === "user") {
    return `${user.first_name} ${user.last_name}`;
  }
  return user.name;
};

const getAssociatedUserType = (user) => {
  if (user.type === "user") {
    return snakeCaseToTitle(user.role);
  }
  return snakeCaseToTitle(user.type);
};

export const TransactionsTable = ({ defaultParams }) => {
  const [transactionsPaginatedData, setTransactionsPaginatedData] = useState(
    {}
  );

  const getTransactions = async (page = 1) => {
    const resData = await apiCalls.getTransactions({
      page,
      ...defaultParams,
    });
    if (resData) {
      setTransactionsPaginatedData(breakPaginatedResponse(resData));
    }
  };

  useEffect(() => {
    getTransactions();
  }, [defaultParams]);

  return (
    <>
      <Card>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Transaction Id</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Associated Person</TableCell>
                <TableCell>Person Type</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Flow</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionsPaginatedData.data?.map((transaction) => {
                return (
                  <TableRow hover key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>
                      {format(
                        new Date(transaction.created_at),
                        "dd MMM yyyy - hh:mm"
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={paths.viewStudent(transaction.associated_user_id)}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {getAssociatedUserName(transaction.associated_user)}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {getAssociatedUserType(transaction.associated_user)}
                    </TableCell>
                    <TableCell>
                      {snakeCaseToTitle(transaction.txn_type)}
                    </TableCell>
                    <TableCell>₹ {transaction.amount}</TableCell>
                    <TableCell>
                      {transaction.is_credited ? "Credit" : "Debit"}
                    </TableCell>
                    <TableCell>{transaction.notes}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={
            transactionsPaginatedData.totalCount
              ? transactionsPaginatedData.totalCount
              : 0
          }
          onPageChange={(e, page) => {
            getTransactions(page + 1);
          }}
          onRowsPerPageChange={() => {}}
          page={
            (transactionsPaginatedData.currentPage
              ? transactionsPaginatedData.currentPage
              : 1) - 1
          }
          rowsPerPage={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Card>
    </>
  );
};

TransactionsTable.propTypes = {
  defaultParams: PropTypes.object,
};

TransactionsTable.defaultProps = {
  defaultParams: {},
};
