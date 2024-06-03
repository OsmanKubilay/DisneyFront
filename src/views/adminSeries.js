import { React, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Input } from "reactstrap";
import "./../scss/admin/adminmain.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "./AdminForms/adminFormSeries/verticalSeriesForm";
import BackdropBz from "components/BackdropBz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAdminSeriesList,
  handleClearAdminSeriesList,
} from "../Redux/adminSeries";

const endPointGetAll = "https://localhost:7112/api/Series/GetAllSeries";
const endPointDelete = "https://localhost:7112/api/Series/DeleteSeries";
const endPointAddorUpdate =
  "https://localhost:7112/api/Series/AddOrUpdateSeries";

const tableCustomStyles = {
  headRow: {
    style: {
      color: "white",
      backgroundColor: "#1a1d29",
    },
  },
  rows: {
    style: {
      backgroundColor: "#FFFFFF",
      "&:nth-child(2n)": {
        backgroundColor: "#f6f9fc",
      },
    },
  },
};
const Series = () => {
  const seriesList = useSelector((state) => state.adminSeries.adminSeriesList);
  console.log(seriesList);
  const dispatch = useDispatch();

  const [value, setSendValue] = useState({});

  const [backdropOpen, setBackDrop] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [onaySuccess, setOnaySuccess] = useState(false);

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const sendData = (row) => {
    setShow(true);
    setSendValue(row);
  };

  const deleteData = (row) => {
    setBackDrop(true);
    axios
      .post(endPointDelete, row)
      .then((res) => {
        setOnaySuccess(true);
      })
      .catch((err) => console.log(err))
      .finally(setOnaySuccess(false), setBackDrop(false));

    toast.success("İşlem Başarılı", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const getSeriesList = () => {
    setBackDrop(false);
    axios
      .get(endPointGetAll)
      .then((res) => {
        console.log(res);
        dispatch(handleAdminSeriesList(res.data));
      })
      .catch((err) => console.log(err));
  };

  const setActionResult = (a, b) => {
    setBackDrop(true);

    axios
      .post(endPointAddorUpdate, b)
      .then((result) => {
        console.log(result);
        if (result) {
          setOnaySuccess(true);
        }
      })
      .catch()
      .finally(setOnaySuccess(false));

    if (a === "B") {
      setBackDrop(false);
      setShow(false);
      toast.success("İşlem Başarılı", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Sistem hatası oluştu!", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  useEffect(() => {
    setOnaySuccess(false);
    return () => {
      dispatch(handleClearAdminSeriesList());
    };
  }, [dispatch]);

  useEffect(() => {
    getSeriesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onaySuccess]);

  useEffect(() => {
    const result = seriesList.filter((item) => {
      return item.name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search, seriesList]);

  const columns = [
    {
      name: "Series Name",
      selector: (row) => row?.name,
      sortable: true,
      grow: 3,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
      sortable: true,
      grow: 3,
    },
    {
      name: "Category Name",
      selector: (row) => row?.category?.name,
      sortable: true,
      grow: 3,
    },
    {
      name: "User Name",
      selector: (row) => row?.user?.name,
      sortable: true,
      grow: 3,
    },

    {
      name: "Operation",
      cell: (row) => (
        <div className="operation-container">
          <EditIcon
            onClick={() => sendData(row)}
            className="icons-edit"
          ></EditIcon>
          <DeleteIcon
            onClick={() => deleteData(row)}
            className="icons-remove"
          ></DeleteIcon>
        </div>
      ),
      grow: 2,
    },
  ];

  return (
    <>
      <div className="content">
        <div className="search-btn-container">
          <Input
            type="text"
            className="form-control"
            placeholder="Ara"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            Ara
          </Input>
          <Button
            onClick={() => {
              setSendValue({});
              setShow(true);
            }}
          >
            +
          </Button>
          <Modal
            onResult={(a, b) => setActionResult(a, b)}
            row={value}
            show={show}
            handleToggle={handleToggle}
          />
        </div>

        <DataTable
          columns={columns}
          data={filter}
          pagination
          highlightOnHover
          customStyles={tableCustomStyles}
        />
        <BackdropBz backdropOpen={backdropOpen}></BackdropBz>
        <ToastContainer />
      </div>
    </>
  );
};

export default Series;
