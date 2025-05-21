import React, { useState } from 'react';
import { List, Avatar,Card, Col, Row, Image, Dropdown,  Button, Modal } from 'antd';
import ModalDetails from '../modals/monitor/modaldetails';
import { connect } from "react-redux";
import "../../assets/css/cards.css";


const { Meta } = Card;

const PatientRecords = ({ data,setIsCardActive }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailID, setDetailID] = useState("-1");
  const [dataDisease,setDataDisease] = useState([])
  const [dataPatient,setDataPatient] = useState([])
  const formatTitleDate = (dateStr) => {
    // Crea un objeto Date directamente desde la cadena de fecha ISO 8601
    const date = new Date(dateStr);

    // Formatea y devuelve la fecha en el formato deseado
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};


  const openModal = (id,diseases,name,date) => {
    console.log(diseases)
    setDetailID(id);
    setDataDisease(diseases)
    setDataPatient([name,date])
    setIsModalOpen(true);
  };

  
  return (
    <div className="site-card-wrapper">
     <ModalDetails setIsCardActive={setIsCardActive} detailID={detailID} setDataDisease={setDataDisease} isModalOpen={isModalOpen} dataPatient={dataPatient} setIsModalOpen={setIsModalOpen} dataDisease={dataDisease}/>
   
      <List
        itemLayout="horizontal"
        dataSource={data}
        className='text-white bg-dark p-4 w-100'
        style={{borderRadius:10}}
        renderItem={(record, index) => (
          <List.Item style={{border:"solid #333 1px", borderTop:0,borderLeft:0,borderRight:0}}>
            <List.Item.Meta

              avatar={<Avatar  src={`http://${window.location.hostname}:8000${record.patient_img}`} />}
              title={<h6 style={{ fontSize: 18 }} className='text-white'>{record.patient_name}</h6>}
              description={<h6 style={{ fontSize: 14 }} className='text-white'>{formatTitleDate(record.datetime)}</h6> }
            />
            <Button className='custom-button' onClick={() => openModal(record.id, record.diseases, record.patient_name, formatTitleDate(record.datetime))}>
              <i className='fas fa-file marginr-1'></i> Abrir
            </Button>
          </List.Item>
        )}
      />
    
    </div>
  );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(PatientRecords);

