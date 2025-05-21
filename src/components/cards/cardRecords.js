import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Image, Button } from 'antd';
import { connect } from "react-redux";
import "../../assets/css/cards.css";
import RecordsModal from "../modals/monitor/modaldetailspatient";

const { Meta } = Card;

const PatientRecords = ({ data }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diseaseInfo, setDiseaseInfo] = useState([]);
  const [patientInfo, setPatientInfo] = useState([]);
  const openRecordDetails = (index) => {
    const record = data[index];

    const name = record.name; // ← asegúrate que esto venga bien
    const code = record.code;
  
    // Redirige a /records/<nombre>?id=<id>
    navigate(`/records/${code}`);
  };
  
  const formatTitleDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const openModal = (index) => {
    setDiseaseInfo(data[index].diseases);
    setPatientInfo([
      data[index].patient_name,
      data[index].datetime,
      data[index].id
    ]);
    setIsModalOpen(true);
  };

  return (
    <div className="site-card-wrapper" style={{ padding: '20px' }}>
      {data && data.length > 0 && (
        <RecordsModal
          isConfirmedActive={false}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          dataPatient={patientInfo}
          dataDisease={diseaseInfo}
        />
      )}

      <Row gutter={[24, 24]}>
        {Array.isArray(data) && data.map((record, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                borderRadius: 12,
                border: 0,
                boxShadow: "0 0 10px rgba(0,0,0,0.3)"
              }}
              cover={
                <Image
                  height={200}
                  width="100%"
                  style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, objectFit: "cover" }}
                  alt="Fundus"
                  src={`http://${window.location.hostname}:5000/${record.img}`}
                  preview={false}
                />
              }
            >
              <h6
 
                style={{ color: "#fff" }}
              >{formatTitleDate(record.dateTime)}</h6>
              <div className="d-flex justify-content-end margint-2">
                <Button
                  onClick={() => openRecordDetails(index)}
                  className="custom-button"
                  type="primary"
                  style={{
                    marginTop: 10,
                    backgroundColor: "#00c46b",
                    borderColor: "#00c46b"
                  }}
                >
                  <i className="fas fa-file marginr-1" /> Details
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect()(PatientRecords);
