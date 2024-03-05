// TransactionItem.jsx
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  mainRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    margin: "0.5rem",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
    marginRight: "1rem",
    border: "1px solid red",
    "&:hover": {
      background: "white",
      color: "red",
      border: "1px solid red",
    },
  },
  paperStyle: {
    paddingRight: "0.5rem",
    margin: "0.5rem",
    textAlign: "center",
  },
}));

const TransactionItem = ({
  id,
  transactionType,
  amount,
  category,
  description,
  onDeleteClick,
}) => {
  const classes = useStyles();

  return (
    <Paper
      variant="elevation"
      elevation={2}
      square={false}
      className={clsx(classes.mainRoot, classes.paperStyle)}
      style={{ margin: "0.5rem", width: "65%" }}
    >
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} sm={5} className={classes.mainRoot}>
          <Box component="div">
            <Typography
              variant="body1"
              style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
            >
              ID: {id}
            </Typography>
            <Typography variant="subtitle1">
              Transaction Type: {transactionType === "IN" ? "Income" : "Expense"}
            </Typography>
            {/* <Typography
              variant="subtitle2"
              style={{ marginBottom: "0.5rem", fontSize: "0.8rem" }}
            >
              Amount: TND{amount}
            </Typography> */}
            <Typography variant="subtitle2">
              Category: {category}
            </Typography>
            <Typography variant="subtitle2">
              Description: {description}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.mainRoot}>
          <div>
            <Typography variant="body1">Amount</Typography>
            <Box
              component="span"
              style={{
                color: transactionType === "IN" ? "#43BE31" : "#EC4849",
              }}
            >
              TND{amount}
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} sm={2} className={classes.mainRoot}>
          <Button
            size="small"
            className={classes.deleteButton}
            onClick={() => onDeleteClick(id)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TransactionItem;
