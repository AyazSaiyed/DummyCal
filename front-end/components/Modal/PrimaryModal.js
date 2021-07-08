import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paperRoot: (props) => ({
    width: theme.typography.pxToRem(props.width),
    maxWidth: theme.typography.pxToRem(props.maxWidth),
  }),
  closeBtn: {
    width: "1.5rem",
    height: "1.5rem",
    position: "absolute",
    right: "1rem",
    top: "1rem",
    cursor: "pointer",
    color: "#ccc",
    transition: "all .5s",
    zIndex: 999,

    "&:hover": {
      color: "#ccccccad",
    },
  },
}));

const PrimaryModal = React.memo((props) => {
  const { openPrimary, togglePrimary, hideClose, children, scrollType } = props;

  const classes = useStyles(props);

  return (
    <Dialog
      open={openPrimary}
      scroll={scrollType}
      TransitionComponent={Transition}
      transitionDuration={400}
      // keepMounted
      onClose={togglePrimary}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: classes.paperRoot }}
    >
      {!hideClose && (
        <span onClick={togglePrimary} className={classes.closeBtn}>
          <svg width={21.017} height={21.017} viewBox="0 0 21.017 21.017" {...props}>
            <g data-name="close (2)">
                <g data-name="Group 2609">
                <path
                    fill="#929292"
                    d="M11.669 10.508l9.107-9.109A.821.821 0 1019.615.24l-9.107 9.107L1.4.24A.821.821 0 00.24 1.399l9.107 9.107L.24 19.615a.821.821 0 001.16 1.161l9.107-9.107 9.107 9.107a.821.821 0 001.161-1.161z"
                    data-name="Path 1709"
                />
                </g>
            </g>
          </svg>
        </span>
      )}
      {children}
    </Dialog>
  );
});

export default PrimaryModal;
