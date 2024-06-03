
import Avatar from '@components/avatar'
import { Icon } from '@iconify/react'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from 'axios'
import moment from 'moment'
import "moment/locale/tr"
import { Fragment, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleBekleyenIslemlerList, handleClearBekleyenIslemlerList } from '../../redux/EVRAKA/bekleyenIslemler'
import { PortalImgSrc } from '../../utility/Utils'
import { ChevronDown } from 'react-feather'
import { getHomeStats, getReqStats } from '../../App'
import HvlBackdrop from '../../components/HvlBackdrop'
//import * as endpoints from '../../configs/endpoints'
import { handleHomeStatsSelectedStatus } from '../../redux/home'
import { handleConfirmWithMandatoryInput } from './../Alert/alert'
import DateComponent from './../components/DateComponent'
import FilterComponent from './../EvrakaBekleyeIslemler/FilterComponent'
import VerticalBekleyenIslemlerDetayForm from './../EvrakaBekleyeIslemler/VerticalBekleyenIslemlerDetayForm'
import { Badge } from 'reactstrap'
import '../../@core/scss/base/components/evraka.scss'

const BekleyenIslemler = (props) => {

  const queryEndpoint = "/api/Evraka/GetIslemBekleyenlerList"
  const evrakaRed = '/api/Evraka/BelgeReddet'

  const forwardedStatus = props.location.state && props.location.state.status

  const durumRef = useRef()

  const bekleyenIslemlerList = useSelector(state => state.bekleyenIslemler.bekleyenIslemlerList)
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)
  const [selectedBekleyenIslemler, setSelectedBekleyenIslemler] = useState(null)
  // const [ekBelge, setSelectedBekleyenIslemlerekBelge] = useState()
  const [redSuccess, setRedSuccess] = useState([])
  const [onaySuccess, setOnaySuccess] = useState([])
  const baslangic = useSelector(state => state.general.baslangic)
  const bitis = useSelector(state => state.general.bitis)
  const [backdropOpen, setBackdropOpen] = useState(true)
  const [filterText, setFilterText] = useState('')
  const [filterKonu, setFilterKonu] = useState('')
  const filterDurum = useSelector(state => state.home.homeStatsSelectedStatusAsOption)
  const [filterIslemType, setFilterIslemType] = useState([])
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const [filteredItems, setFilteredItems] = useState([])
  const [filterTalepEden, setFilterTalepEden] = useState('')
  const [toggledClearRows, setToggledClearRows] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [dismissible, setDismissible] = useState(false)


  const getBekleyenIslemlerList = () => {

    let q = {
      baslangicTarihi: baslangic,
      bitisTarihi: bitis
    }
    if (bitis < baslangic || bitis === null || baslangic === null || bitis === undefined || baslangic === undefined) {
      //toast.error("Tarih aralıkları hatalı!")
      setBackdropOpen(true)
      return
    } else {
      q = {}
      q.baslangicTarihi = baslangic
      q.bitisTarihi = bitis
    }
    axios.post(queryEndpoint, q).then(res => {

      if (res.data.data === null) {
        setDismissible(false)
        return
      }
      if (res.data.success === true) {

        dispatch(handleBekleyenIslemlerList(res.data))//TODO res.datadan false true checki
      } else {
        toast.error(res.data.error.message)
      }
    }).catch(
      () => {
        toast.error("Sistem hatası oluştu!", {
          position: toast.POSITION.TOP_LEFT
        })
      }
    ).finally(() => {
      setBackdropOpen(false)
      getHomeStats(baslangic, bitis, dispatch)
      getReqStats(baslangic, bitis, dispatch)
    })
  }


  const doQuery = () => {
    setBackdropOpen(true)
    setDismissible(false)
    getBekleyenIslemlerList()

  }

  useEffect(() => {
    doQuery()
  }, [redSuccess, baslangic, bitis, onaySuccess])

  useEffect(() => {
    if (!forwardedStatus) dispatch(handleHomeStatsSelectedStatus([]))
    return () => {
      dispatch(handleClearBekleyenIslemlerList())
    }
  }, [])

  const processBekleyenIslemler = (row, gizlilik) => {

    setSelectedBekleyenIslemler(row)


    if (gizlilik(row.content.gizlilik) !== 'success') {
      setShow(false)
    } else {
      setBackdropOpen(true)
      setShow(true)

    }

  }


  useEffect(() => {
    let filteredData = bekleyenIslemlerList
    filteredData = filterText === '' ? filteredData : filteredData.filter(
      item => item.content.belgeNumarasi && item.content.belgeNumarasi.toLocaleLowerCase("tr").includes(filterText.toLocaleLowerCase("tr"))
    )
    filteredData = filterKonu === '' ? filteredData : filteredData.filter(
      item => item.content.konu && item.content.konu.toLocaleLowerCase("tr").includes(filterKonu.toLocaleLowerCase("tr"))
    )
    filteredData = filterTalepEden === '' ? filteredData : filteredData.filter(
      item => item.olusturanPersonel && item.olusturanPersonel.toLocaleLowerCase("tr").includes(filterTalepEden.toLocaleLowerCase("tr"))
    )

    filteredData = filterIslemType && filterIslemType.length > 0 ? filteredData.filter(item => filterIslemType.map((i) => i.value === item.content.islemGrubu).includes(true)) : filteredData

    filteredData = filterDurum && filterDurum.length > 0 ? filteredData.filter(item => filterDurum.map((i) => i.value === (item.content.okundu === true ? "B" : "R")).includes(true)) : filteredData

    setFilteredItems(filteredData)
    setToggledClearRows(!toggledClearRows)
  }, [filterText, filterDurum, filterTalepEden, bekleyenIslemlerList, filterKonu, filterIslemType])

  const clearValue = () => {
    durumRef.current.clearValue()
  }

  const handleClear = () => {
    setResetPaginationToggle(!resetPaginationToggle)
    setFilterText('')
    setFilterKonu('')
    setFilterTalepEden('')

    clearValue()
  }
  const gizlilik = (code) => {
    switch (code) {
      case 'HAVELSAN ÖZEL':
        return 'success'
      case 'TASNİF DIŞI':
        return 'success'
      default:
        return 'danger'
      // code block
    }
  }

  const handleRowsSelection = ({ selectedRows }) => {
    setSelectedRows(selectedRows)
  }

  const columns = [
    {
      selector: row => row.content.belgeNumarasi,
      name: 'Belge No',
      sortable: true,
      grow: 6,
    },
    {
      selector: row => row.content.konu,
      name: 'Konu',
      sortable: true,
      width: "auto",
      textAlign: "left",
      cell: row => (
        <div className='containbadge'>
          <p className='pTagAvrakeTopic' title={row.content.konu} ><b></b><small style={{ fontWeight: "800", fontSize: '12px' }}> İçerik: {row.content.konu}</small></p>
          <div className='middlebagecontain'>
            <Badge className='badge' title='Gizlilik Seviyesi' color={gizlilik(row.content.gizlilik)}>{row.content.gizlilik}</Badge>
            <Badge className='badge' title='Okundu Okunmadı Bilgisi' color={row.content.okundu === false ? 'warning' : 'info'}>{row.content.okundu === false ? 'Okunmadı' : 'Okundu'}</Badge>
            <Badge className='badge' title='Öncelik Seviyesi' color={row.content.oncelikDerecesi === false ? 'primary' : 'secondary'}>{row.content.oncelikDerecesi}</Badge>
          </div >
          <Badge className='badgeColor' >{row.kadroAdi}</Badge>
        </div >
      ),
      grow: 8
    },
    {
      selector: row => row.content.olusturanPersonel,
      name: 'TALEP EDEN',
      sortable: true,
      grow: 4,
      cell: row => (
        <>< Avatar img={PortalImgSrc(0)} /><span style={{ paddingLeft: '1em' }}>{row.content.olusturanPersonel}</span></>
      )
    },
    {
      selector: row => row.content.gonderenMakam,
      name: 'Gönderen Makam',
      sortable: true,
      grow: 5
    },
    {
      selector: row => row.content.belgeTarihiStr,
      name: 'Belge Tarihi',
      sortable: true,
      format: row => (row.content.belgeTarihi !== null ? (moment(row.content.belgeTarihi).format('Do MMMM YYYY')) : '---'),
      grow: 3.5
    },
    {
      selector: row => row.content.gelisTarihi,
      name: 'Gelis Tarihi',
      sortable: true,
      format: row => (row.content.gelisTarihi !== null ? (moment(row.content.gelisTarihi).format('Do MMMM YYYY')) : '---'),
      grow: 3.5
    },
    {
      selector: row => row.content.islemGrubu,
      name: 'İşlem',
      sortable: true,
      grow: 2
    },
    {
      selector: row => row.content.belgeTipi,
      name: 'Belge Tipi',
      sortable: true,
      grow: 3
    }
  ]

  const paginationComponentOptions = {
    rowsPerPageText: 'Sayfa başına satır',
    rangeSeparatorText: '/',
    selectAllRowsItem: false,
    selectAllRowsItemText: 'Tümünü Seç'
  }

  const handlePageChange = page => {
    console.log(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log(newPerPage, page)
  }
  const handleOnaySingle = (row) => {
    setOnaySuccess(row)
    handleToggle()

  }
  const handleRedSingle = (row, c) => {

    if (c === '') {

      toast.error("Ret Gerekçesi Girişi Zorunludur", {
        position: toast.POSITION.TOP_LEFT
      })
      return
    }


    setBackdropOpen(true)
    const q = {
      kadroId: row.kadroId,
      belgeId: row.content.belgeId,
      taskId: row.content.taskId,
      retGerekcesi: c
    }
    axios.post(evrakaRed, q).then(res => {
      if (res.data.data.basariliIslemMi === true) {
        toast.success(`İşlem başarılı.`)
        setRedSuccess(res.data.data)
      } else {
        toast.error(res.data.error.message, {
          position: toast.POSITION.TOP_LEFT
        })
      }
    }).catch(
      () => {
        toast.error("Sistem hatası oluştu!", {
          position: toast.POSITION.TOP_LEFT
        })
      }
    ).finally(() => {
      handleToggle()
      setBackdropOpen(false)

    })

  }

  const conditionalRowStyles = [
    {

      when: row => gizlilik(row.content.gizlilik) !== 'success',
      style: {
        cursor: 'no-drop',
      },
    },
  ]

  const rowDisabledCriteria = row => row.content.status !== 'B'
  return (
    <Fragment >
      <DateComponent doQuery={doQuery} />
      <DataTable
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderAlign='left'
        subHeaderComponent={<FilterComponent durumRef={durumRef}
          selectedList={selectedRows}
          filterTalepEden={filterTalepEden}
          onFilterTalepEden={e => setFilterTalepEden(e.target.value)}
          onFilter={e => setFilterText(e.target.value)}
          onFilterKonu={e => setFilterKonu(e.target.value)}
          onIslemTypeChange={e => { setFilterIslemType(e) }}
          onClear={handleClear} filterText={filterText}
          selectedDurum={filterDurum}
          onDurumChange={e => { dispatch(handleHomeStatsSelectedStatus(e)) }} />}
        columns={columns}
        data={filteredItems}
        pointerOnHover={true}
        pagination
        // keyField={'fysNo'}
        defaultSortFieldId={'belgeId'}
        defaultSortAsc={false}
        sortIcon={<ChevronDown />}
        className='react-dataTable bekleyenislemlerpage'
        paginationComponentOptions={paginationComponentOptions}
        selectableRows
        selectableRowsHighlight={true}
        onSelectedRowsChange={handleRowsSelection}
        selectableRowDisabled={rowDisabledCriteria}
        clearSelectedRows={toggledClearRows}
        highlightOnHover={true}
        onRowClicked={(row) => processBekleyenIslemler(row, gizlilik)}
        noDataComponent={'Kayıt bulunamadı.'}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        conditionalRowStyles={conditionalRowStyles}

      />
      {
        selectedBekleyenIslemler && show &&
        <VerticalBekleyenIslemlerDetayForm
          onRed={(b) => handleConfirmWithMandatoryInput({ inputLabel: "Açıklama", text: "Seçili Belge reddedilecektir.", title: "Evraka Reddet", confirmText: "Tamam", cancelText: "İptal", onConfirm: (c) => handleRedSingle(b, c) })}
          onOnay={(a) => handleOnaySingle(a)}
          onShowed={(a) => setBackdropOpen(a)}
          showApprove={true} row={selectedBekleyenIslemler} show={show} handleToggle={handleToggle}
        ></VerticalBekleyenIslemlerDetayForm>
      }
      <HvlBackdrop backdropOpen={backdropOpen} dismissible={dismissible} />
    </Fragment>

  )
}
export default BekleyenIslemler
//pdfUrl={postEkBelge()}