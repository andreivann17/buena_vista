import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/headerDashboard.jsx";
import Contenido from "../../components/navigation/contentDashboard.jsx";
import { connect, useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import HistoryTable from "../../components/tables/historyTable.js";
import { Button,Card as Cardant,Input,DatePicker } from 'antd';
import {Card as CardBootrap} from "react-bootstrap/";
import "../../assets/css/shipments.css"
import RecordFilter from "../../components/offCanvas/recordFilter.js";
import { actionShipmentGet,actionShipmentAdminGet } from "../../redux/actions/shipments/shipments.js";
import { SearchOutlined,EllipsisOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  color:"white",
  borderRadius:12,
  width: "100%",
  background: "linear-gradient(90deg, rgba(38, 131, 198, 0.94) 100%, rgba(38, 131, 198, 0) 100%)",
};

function Home({ shipments,infoUser,infoAdmin }) {
  const [showFilter, setShowFilter] = useState(false);
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false); // 🔥 Estado para detectar si es móvil
  const isAdmin = location.pathname.includes("/admin");
  const [token, setToken] = useState(localStorage.getItem(isAdmin? "tokenadmin":"token"));
  const [filteredData, setFilteredData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    pmb: '',
    code: '',
    startDate: null,
    endDate: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const log_out_click = () =>{
    
    if(isAdmin){
      localStorage.removeItem("tokenadmin");
    console.log(localStorage.getItem("tokenadmin")); 
      navigate("/");
      return
    }
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token")); 
    navigate("/");


  }
  useEffect(() => {
    if (token == null) {
      
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (shipments) {
      setFilteredData(shipments);
    }
  }, [shipments]);
  useEffect(() => {
   
    if(isAdmin){
      dispatch(actionShipmentAdminGet());
    }else{
      dispatch(actionShipmentGet());
    }
    
  }, [dispatch]);
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener('resize', handleResize);
  handleResize(); // Ejecutarlo al montar
  return () => window.removeEventListener('resize', handleResize);
}, []);
const handleFilter = ({ pmb, code,startDate, endDate }) => {
  let data = shipments;

  if (pmb) {
    data = data.filter(item => {
      const searchValue = pmb.toLowerCase();
   
        return (
       
          (item.pmb && item.pmb.toLowerCase().includes(searchValue))
        );
      
    });
  }
  if (code) {
    data = data.filter(item => {
      const searchValue = code.toLowerCase();
      
        return (
          (item.code && item.code.toLowerCase().includes(searchValue)) 
        );
      
    });
  }
  if (startDate && endDate) {
    data = data.filter(item => {
      const fecha = new Date(item.FechaRecibido);
      return fecha >= startDate && fecha <= endDate;
    });
  }

  setFilteredData(data);
};
const handleDateChange = (dates) => {
  if (dates) {
    setFilterValues(prev => ({
      ...prev,
      startDate: dates[0] ? dates[0].toDate() : null,
      endDate: dates[1] ? dates[1].toDate() : null,
    }));
  }
};
const cardStyle = {

  backgroundSize: '100%', // Incrementa este valor para reducir el "zoom" de la imagen
  backgroundPosition: 'center', 
  backgroundPositionY:"-380px",
 

  borderRadius:20,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  color:"white",
 

};

const contentStyle = {
  position: 'relative',  // Esto asegura que el texto esté por encima del fondo oscurecido
};
console.log(infoAdmin)
  return (
    <>
      {token != null && (
        <>
          <RecordFilter
  setShow={setShowFilter}
  show={showFilter}
  onFilter={handleFilter}
  isAdmin={isAdmin}
  filterValues={filterValues}
  setFilterValues={setFilterValues}
/>

          <Header title="Shipments" icon="fas fa-truck marginr-1" />
          <div className="h-100" style={{ padding: "20px"}}>
    <CardBootrap style={cardStyle} className="">
    <div style={backgroundStyle}></div>
    <div className="h-100" style={contentStyle}>
      <CardBootrap.Body className="h-100 d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center h-100">
                  <i style={{ fontSize:42}} className={"fas fa-truck marginr-1"}></i>
                  <h1 style={{ fontSize:42,fontWeight:600,marginTop:5}} >{"Shipments"}</h1>
                </div>
                
               {
                isAdmin ? (
                  <div className="">
                  <h5 style={{fontWeight:600}}>{infoAdmin.nombre + " " + infoAdmin.apellido}</h5>
                
                 
                
                  {/* Hipervínculo con animación underline */}
                  <div className="mt-2">
                    <span 
                      className="logout-link "
                      style={{color:"#dedede"}} 
                      onClick={log_out_click}
                    >
                   Log out?
                    </span>
                  </div>
                </div>
                ):(
                  <div className="">
                  <h5 style={{fontWeight:600}}>{infoUser.nombre + " " + infoUser.apellido}</h5>
                
                  <div className="d-flex justify-content-start">
                    <h5 className="marginr-1">PMB: </h5>
                    <h5>{infoUser.pmb}</h5>
                  </div>
                
                  {/* Hipervínculo con animación underline */}
                  <div className="mt-2">
                    <span 
                      className="logout-link" 
                      onClick={log_out_click}
                    >
                   Log out?
                    </span>
                  </div>
                </div>
                )
               }

      </CardBootrap.Body>
      </div>
    </CardBootrap>
    
</div>
          <div className="Panel_Contenido marginb-5">
         
          
              
            <div className="d-flex justify-content-end marginb-3" >
            <div className="d-flex align-items-center">
            {/* 🔥 Estos se ocultan en móviles */}
            {!isMobile && (
                    <>
                     <div className="marginr-1">
  <RangePicker
    size="large"
    style={{ width: '100%' }}
    onChange={handleDateChange}
  />
</div>
<div className="marginr-1">
  <Input
    placeholder={ "Search by Code"}
    allowClear
    size="large"
    value={filterValues.code}
    onChange={(e) => setFilterValues(prev => ({ ...prev, code: e.target.value }))}
  />
 
</div>

  
  {
    isAdmin && (
      <div className="marginr-1">
      <Input
      placeholder={ "Search by PMB"}
      allowClear
      size="large"
      value={filterValues.pmb}
      onChange={(e) => setFilterValues(prev => ({ ...prev, pmb: e.target.value }))}
    />
    </div>
    )
  }


<Button
  onClick={() => handleFilter(filterValues)}
  type="primary"
  style={{ minWidth: "120px" }}
  className="custom-button-secondary"
>
  <i className="fas fa-search marginr-1"></i> Search
</Button>

                    </>
                  )}

                </div>

                {/* 🔥 Este solo aparece en móviles */}
                {isMobile && (
                  <div>
                    <button onClick={() => setShowFilter(true)}  style={{ borderRadius:44 }} className="btn btn-outline-secondary">
                    <EllipsisOutlined />
                    </button>
                  </div>
                )}
              </div>
              
            <Cardant style={{borderRadius:12,boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",padding:20}}>
            <HistoryTable data={filteredData} isAdmin={isAdmin} />
            </Cardant>
        
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  shipments: state.shipments.data, // <-- Aquí conectamos los datos de Redux
  dataLogin:state.login.login?? [],
  infoUser: state.menus.infoUser ?? {id:"",nombre:"",pmb:"",apellido:"",email:""},
  infoAdmin: state.menus.infoAdmin ?? {id:"",nombre:"",pmb:"",apellido:"",email:""},

});

export default connect(mapStateToProps)(Home);
