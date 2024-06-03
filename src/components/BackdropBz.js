import { Backdrop, CircularProgress } from "@mui/material";
import logo from "./../assets/images/logo.svg";
import { Button } from "reactstrap";

const BackdropBz = ({ backdropOpen, dismissible, onDismiss }) => {
  return (
    <>
      <Backdrop
        open={backdropOpen}
        sx={{
          color: "#113b6a",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img className="fallback-logo" src={logo} alt="logo" height={128} />
        <CircularProgress color="inherit" />
        {dismissible && (
          <Button onClick={onDismiss} color="danger">
            İptal
          </Button>
        )}
      </Backdrop>
    </>
  );
};

export default BackdropBz;
