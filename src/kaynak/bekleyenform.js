import axios from "axios";
import moment from "moment";
import "moment/locale/tr";
import { React, useEffect, useState } from "react";
import { Check, X, ChevronDown, Paperclip, PenTool } from "react-feather";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import HvlBackdrop from "../../components/HvlBackdrop";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import {
  directDownloadDocument,
  AltStatusEvrakaTimelineColor,
  PortalImgSrc,
} from "../../utility/Utils";
import Avatar from "@components/avatar";

const belgeAdress = "/api/Evraka/GetBelgeGoruntule";
const ekBelgeAdress = "/api/Evraka/BelgeEkIndir";
const evrakaOnay = "/api/Evraka/BelgeOnayla";
const onaySekli = "/api/Evraka/GetOnaySekli";

const readOnlyStyle = {
  background: "white",
  color: "black",
  opacity: 1,
};
const readOnlyStyleb = {
  background: "white",
  color: "black",
  opacity: 1,
  position: "absolute",
  right: "10px",
};
const postBelge = (
  setBelge,
  row,
  setBackdropOpen,
  setIlgiBelgeList,
  setDigerBelgeList,
  setOnaySekli,
  setshowBelge,
  onShowed
) => {
  setBackdropOpen(true);
  const q = {
    kadroId: row.kadroId,
    belgeId: row.content.belgeId,
    taskId: row.content.taskId,
    type: "Bekleyen",
  };
  axios
    .post(belgeAdress, q)
    .then((res) => {
      console.log(res);
      if (res.data?.data?.belge?.content !== null) {
        const arrayIlgiList = [];
        const arrayOtherList = [];
        res.data.data.ekBelge?.content.forEach((element) => {
          if (element.ekIlgiTipi === "ILGI") {
            arrayIlgiList.push(element);
          } else {
            arrayOtherList.push(element);
          }
        });
        setDigerBelgeList(arrayOtherList);
        setIlgiBelgeList(arrayIlgiList);
        setBelge(res.data.data);
        setshowBelge(true);
        onShowed(false);
      } else {
        toast.error(res.data.error?.message);
      }
    })
    .catch(() => {
      toast.error("Sistem hatası oluştu!", {
        position: toast.POSITION.TOP_LEFT,
      });
    });
  axios
    .post(onaySekli, q)
    .then((res) => {
      if (res.data.success === true) {
        setOnaySekli(res.data.data.onaySekli);
      } else {
        toast.error(res.data.error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    })
    .catch(() => {
      toast.error("Sistem hatası oluştu! OnaySekli", {
        position: toast.POSITION.TOP_LEFT,
      });
    })
    .finally(() => {
      setBackdropOpen(false);
    });
};
const postEkBelge = (
  AsilEkBelgeId,
  setBackdropOpen,
  setshowEkBelge,
  setEkBelge,
  setisPDF
) => {
  setBackdropOpen(true);
  const q = {
    ekBelgeId: AsilEkBelgeId,
  };
  axios
    .post(ekBelgeAdress, q)
    .then((res) => {
      if (res.data.success === true) {
        //download(res.data?.data?.content, res.data?.data?.ad)
        setshowEkBelge(true);
        setEkBelge(res.data?.data);
        if (res.data?.data?.type === "application/pdf") {
          setisPDF(true);
          //directDownloadDocument(res.data?.data?.content, res.data?.data?.ad)
        } else {
          setisPDF(false);
          directDownloadDocument(res.data?.data?.content, res.data?.data?.ad);
        }
      } else {
        toast.warning(res.data.error.message);
      }
    })
    .catch(() => {
      toast.error("Sistem hatası oluştu!", {
        position: toast.POSITION.TOP_LEFT,
      });
    })
    .finally(() => {
      setBackdropOpen(false);
    });
};

const onOnayEvraka = (row, setBackdropOpen, onOnay) => {
  setBackdropOpen(true);
  const q = {
    kadroId: row.kadroId,
    belgeId: row.content.belgeId,
    taskId: row.content.taskId,
  };
  axios
    .post(evrakaOnay, q)
    .then((res) => {
      if (res.data.data.basariliIslemMi === true) {
        toast.success(`İşlem başarılı.`);
      } else {
        toast.error(res.data.error.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    })
    .catch(() => {
      toast.error("Sistem hatası oluştu!", {
        position: toast.POSITION.TOP_LEFT,
      });
    })
    .finally(() => {
      onOnay(row);
      setBackdropOpen(false);
    });
};

const includeFunc = (value) => {
  if (value?.toString().includes(".pdf")) {
    return true;
  } else {
    return false;
  }
};

const durumStringDegistir = (durum) => {
  switch (durum) {
    case "YAPILACAK":
      return "Yeni";
    case "RET":
      return "Rededildi";
    case "YAPILMADI":
      return "Onay Bekliyor";
    case "YAPILDI":
      return "Onaylandı";
    default:
      return durum;
  }
};

const VerticalBekleyenIslemlerDetayForm = ({
  row,
  show,
  handleToggle,
  showApprove,
  onOnay,
  onRed,
  onShowed,
}) => {
  const [AsilBelge, setBelge] = useState({});
  const [IlgiBelgeList, setIlgiBelgeList] = useState([]);
  const [DigerBelgeList, setDigerBelgeList] = useState([]);
  const [AsilEkBelge, setEkBelge] = useState({});
  const [AsilEkBelgeId, setAsilEkBelgeId] = useState("");
  const [onaySekli, setOnaySekli] = useState("");
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [showEkBelge, setshowEkBelge] = useState(false);
  const [showBelge, setshowBelge] = useState(false);
  const [isPDF, setisPDF] = useState(false);
  const handleSelection = (selectedBelgeId) => {
    setAsilEkBelgeId(selectedBelgeId);
  };
  useEffect(() => {
    if (AsilEkBelgeId) {
      postEkBelge(
        AsilEkBelgeId,
        setBackdropOpen,
        setshowEkBelge,
        setEkBelge,
        setisPDF
      );
    }
    setAsilEkBelgeId("");
  }, [AsilEkBelgeId]);

  useEffect(() => {
    if (row) {
      postBelge(
        setBelge,
        row,
        setBackdropOpen,
        setIlgiBelgeList,
        setDigerBelgeList,
        setOnaySekli,
        setshowBelge,
        onShowed
      );
    }
  }, [row]);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setshowEkBelge(false);
        setisPDF(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [showEkBelge, isPDF]);

  return (
    <>
      <Modal
        size={"xl"}
        isOpen={show && showBelge}
        backdrop={true}
        toggle={handleToggle}
        style={{
          marginLeft: `${AsilBelge?.belge?.content ? "3%" : "25%"}`,
          marginRight: `${AsilBelge?.belge?.content ? "3%" : "25%"}`,
          width: "auto",
          maxWidth: `${AsilBelge?.belge?.content ? "94%" : "50%"}`,
        }}
      >
        <ModalHeader toggle={handleToggle}>
          <span>EVRAKA BEKLEYEN İŞLEMLER</span>
        </ModalHeader>
        {/* <Badge className='text-capitalize' color={IzinStatuColor[selectedBekleyenIslemler?.belgeDurum]} >
          {IzinStatuText[selectedBekleyenIslemler?.belgeDurum]}
        </Badge> */}
        <ModalBody
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col md={`${!AsilBelge?.belge ? "12" : "6"}`}>
              <Form className="pt-50">
                <Row>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="olusturanpersonel">
                      OLUŞTURAN PERSONEL
                    </Label>
                    <Input
                      id="olusturanpersonel"
                      readOnly
                      value={row.content.olusturanPersonel}
                      style={readOnlyStyle}
                    />
                  </Col>

                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="belgeno">
                      BELGE NO
                    </Label>
                    <Input
                      id="belgeno"
                      readOnly
                      value={AsilBelge?.belge?.belgeNo}
                      style={readOnlyStyle}
                    />
                  </Col>

                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="belgeTarihiStr">
                      BELGE TARİHİ
                    </Label>
                    <Input
                      style={readOnlyStyle}
                      id="belgeTarihiStr"
                      readOnly
                      value={
                        AsilBelge?.belge?.belgeTarihiStr !== null
                          ? `${moment(AsilBelge?.belge?.belgeTarihiStr).format(
                              "Do MMMM YYYY"
                            )}`
                          : ""
                      }
                    />
                  </Col>

                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="gelistarihi">
                      GELİŞ TARİHİ
                    </Label>
                    <Input
                      style={readOnlyStyle}
                      id="gelistarihi"
                      readOnly
                      value={
                        row.content.gelisTarihi !== null
                          ? `${moment(row.content.gelisTarihi).format(
                              "Do MMMM YYYY"
                            )}`
                          : ""
                      }
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="islemgrubu">
                      İŞLEM GRUBU
                    </Label>
                    <Input
                      style={readOnlyStyle}
                      id="islemgrubu"
                      readOnly
                      value={row.content.islemGrubu}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="belgetipi">
                      BELGE TİPİ
                    </Label>
                    <Input
                      style={readOnlyStyle}
                      id="belgetipi"
                      readOnly
                      value={row.content.belgeTipi}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="islemtipi">
                      İŞLEM TİPİ
                    </Label>
                    <Input
                      style={readOnlyStyle}
                      id="islemtipi"
                      readOnly
                      value={row.content.islemTipi}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="gizlilikevraka">
                      GİZLİLİK
                    </Label>
                    <Input
                      style={readOnlyStyle}
                      id="gizlilikevraka"
                      readOnly
                      value={row.content.gizlilik}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Col sm="12" className="mb-1">
                      <Label className="form-label" for="gönderenmakam">
                        GÖNDEREN MAKAM
                      </Label>
                      <Input
                        id="gönderenmakam"
                        style={readOnlyStyle}
                        value={row.content.gonderenMakam}
                        readOnly
                      />
                    </Col>
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="konuevraka">
                      KONU
                    </Label>
                    <Input
                      style={readOnlyStyle}
                      id="konuevraka"
                      readOnly
                      value={row.content.konu}
                    />
                  </Col>
                  <Col
                    sm="12"
                    style={{ display: "flex", flexDirection: "row" }}
                    className="mb-1"
                  >
                    {DigerBelgeList.length > 0 && (
                      <div
                        style={{
                          padding: "10",
                          width: "50%",
                          marginRight: "20px",
                        }}
                      >
                        <Table bordered style={{ minHeight: "150px" }}>
                          <thead>
                            <tr>
                              <th>EKLER</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {DigerBelgeList.map((i, index) => (
                              <tr key={`ekler-${index}`}>
                                <td>
                                  <b>{i.adi}</b> <small>({i.dokumanAdi})</small>
                                </td>
                                <td>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: 1,
                                      justifyContent: "end",
                                    }}
                                  >
                                    <Button
                                      outline
                                      style={{ minWidth: "120px" }}
                                      onClick={() =>
                                        handleSelection(i.belgeEkId)
                                      }
                                      tag={Label}
                                      className="mb-75 me-75"
                                      size="sm"
                                      color="primary"
                                    >
                                      <Paperclip size={14}></Paperclip>{" "}
                                      {includeFunc(i.dokumanAdi)
                                        ? "Belgeyi Aç"
                                        : "İndir"}
                                    </Button>
                                  </Box>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                    {IlgiBelgeList.length > 0 && (
                      <div style={{ padding: "10", width: "50%" }}>
                        <Table bordered style={{ minHeight: "150px" }}>
                          <thead>
                            <tr>
                              <th>İLGİLER</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {IlgiBelgeList.map((i, index) => (
                              <tr key={`ekler-${index}`}>
                                <td>
                                  <b>{i.adi}</b> <small>({i.dokumanAdi})</small>
                                </td>
                                <td>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: 1,
                                      justifyContent: "end",
                                    }}
                                  >
                                    <Button
                                      outline
                                      style={{ minWidth: "120px" }}
                                      onClick={() =>
                                        handleSelection(i.belgeEkId)
                                      }
                                      tag={Label}
                                      className="mb-75 me-75"
                                      size="sm"
                                      color="primary"
                                    >
                                      <Paperclip size={14}></Paperclip>{" "}
                                      {includeFunc(i.dokumanAdi)
                                        ? "Belgeyi Aç"
                                        : "İndir"}
                                    </Button>
                                  </Box>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Col>
                  <Col sm="12" className="mb-1">
                    {AsilBelge?.belgeDurumPropertiesList?.length > 0 && (
                      <Accordion defaultExpanded={true}>
                        <AccordionSummary
                          id="panel-header-1"
                          aria-controls="panel-content-1"
                          expandIcon={<ChevronDown></ChevronDown>}
                        >
                          <Typography
                            style={{ position: "relative", top: "10px" }}
                          >
                            <PenTool></PenTool> Onaylar - İmza Süreci (
                            {AsilBelge?.belgeDurumPropertiesList?.length})
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Table bordered>
                            <thead>
                              <tr>
                                <th>Süreç Sahibi</th>
                                <th>
                                  <th>Durum</th>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {AsilBelge?.belgeDurumPropertiesList.map(
                                (i, index) => (
                                  <tr key={`ekler-${index}`}>
                                    <td>
                                      {"" === "" ? (
                                        <Avatar
                                          style={{ marginRight: "10px" }}
                                          img={
                                            require("@src/assets/images/avatars/avatar-blank.png")
                                              .default
                                          }
                                        />
                                      ) : (
                                        <Avatar
                                          img={PortalImgSrc(Number(5197))}
                                        />
                                      )}
                                      <b>
                                        {i.gorevliKisi.includes(".") === true
                                          ? i.gorevliKisi
                                              .split(".")
                                              .pop()
                                              .split("Lid")
                                              .pop()
                                          : i.gorevliKisi}
                                      </b>
                                    </td>
                                    <td
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        position: "relative",
                                        top: "5px",
                                      }}
                                    >
                                      {durumStringDegistir(i.islemDurumu)}
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <div
                                          style={{
                                            position: "Relative",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            opacity: "0.4",
                                            backgroundColor: `${
                                              AltStatusEvrakaTimelineColor[
                                                i.islemDurumu
                                              ]
                                            }`,
                                          }}
                                        ></div>
                                        <div
                                          style={{
                                            position: "Relative",
                                            right: "15px",
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            backgroundColor: `${
                                              AltStatusEvrakaTimelineColor[
                                                i.islemDurumu
                                              ]
                                            }`,
                                          }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col
              md="6"
              style={{ display: AsilBelge?.belge?.content ? "block" : "none" }}
            >
              <Card>
                <CardHeader
                  style={{ height: "50px", paddingTop: "10px" }}
                  className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start"
                >
                  <CardTitle
                    tag="h5"
                    style={{ marginRight: "25px", marginTop: "0" }}
                  >
                    {AsilBelge?.belge?.ad}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Col sm="12" className="mb-1">
                    {/* <Label className='form-label' for='saticiAdi'>
                  PDF Adı
                </Label> */}
                    {/* <Label className='form-label' for='saticiAdi'>
                  {AsilBelge?.belge?.ad}
                </Label> */}
                    {/* <Input id='saticiAdi' style={readOnlyStyle} value={AsilBelge?.belge?.ad} readOnly /> */}
                  </Col>
                  {}
                  <Col sm="12" style={{ height: " 70vh " }}>
                    <div style={{ height: " 100% " }}>
                      {AsilBelge?.belge?.content && (
                        <embed
                          src={`data:application/pdf;base64,${AsilBelge?.belge?.content}`}
                          width="100%"
                          height="100%"
                        />
                      )}
                    </div>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {showApprove && (
            <Button
              className="me-1"
              color="danger"
              onClick={() => {
                onRed(row);
              }}
            >
              <X></X> Reddet
            </Button>
          )}
          {showApprove && showBelge && (
            <Button
              disabled={!showBelge}
              className="me-1"
              color="success"
              onClick={() => {
                onOnayEvraka(row, setBackdropOpen, onOnay);
              }}
            >
              <Check></Check> {onaySekli === "e-imza" ? "Mobil İmza" : "Onayla"}
            </Button>
          )}
        </ModalFooter>
        <HvlBackdrop dismissible={false} backdropOpen={backdropOpen} />
      </Modal>

      <Modal size="lg" isOpen={showEkBelge && isPDF} backdrop={true}>
        <ModalHeader>
          <Button
            className="btn-close"
            style={readOnlyStyleb}
            onClick={() => {
              setshowEkBelge(false);
            }}
          >
            X
          </Button>
          <span>{AsilEkBelge.ad}</span>
        </ModalHeader>
        <ModalBody
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col sm="12" style={{ height: " 85vh ", width: "40vw" }}>
              <div style={{ height: " 100% " }}>
                {AsilEkBelge?.content && (
                  <embed
                    src={`data:application/pdf;base64,${AsilEkBelge?.content}`}
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
            </Col>
          </Row>
        </ModalBody>
        <HvlBackdrop backdropOpen={backdropOpen} />
      </Modal>
    </>
  );
};
export default VerticalBekleyenIslemlerDetayForm;
