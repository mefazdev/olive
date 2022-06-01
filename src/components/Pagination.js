import React from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    background: "#FFFFFF",
  },
});

export default function UsePagination() {
  const classes = useStyles();
  const { items } = usePagination({
    count: 10,
  });

  return (
    <nav>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  width: "25px",
                  border: "1px solid rgb(228, 228, 228)",
                  marginLeft: "2px",
                  marginRight: "2px",
                  backgroundColor: selected ? " #46CE04" : "#FFFFFF",
                  color: selected ? "#FFFFFF" : undefined,
                  padding:"5px",
                  margin:'3px',
                
             
                }  
              }
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgb(228, 228, 228)",
                  color: "#4E4E50",
                  padding:"5px",
                  margin:'3px'
                }}
                type="button"
                {...item}
              >
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
