import React from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";

import useStyles from "./useStyles";

const ColumnHeader = ({ column, onLoadMore }) => {
  const styles = useStyles();

  const {
    id,
    title,
    cards,
    meta: { totalCount, currentPage, totalPages },
  } = column;

  const count = cards.length;
  const shouldDisplayButton = currentPage < totalPages;

  const handleLoadMore = () => {
    onLoadMore(id, currentPage + 1);
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <b>{title}</b> ({count}/{totalCount || "…"})
      </div>

      {shouldDisplayButton && (
        <div className={styles.actions}>
          <IconButton aria-label="Load more" onClick={() => handleLoadMore()}>
            <SystemUpdateAltIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

ColumnHeader.propTypes = {};

export default ColumnHeader;
