import React, { useState, useEffect } from 'react';
import { Button,Card as Cardant,Input,DatePicker } from 'antd';
import {Card as CardBootrap} from "react-bootstrap/";
import Header from "../../components/navigation/headerDashboard.jsx";
import FormPayment from "../../components/forms/payment.js";
import { connect, useDispatch } from 'react-redux';
import { actionPaymentGet } from "../../redux/actions/payment/payments.js";
import { useNavigate,useLocation } from "react-router-dom";

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  color: "white",
  width: "100%",
  background: "linear-gradient(90deg, rgba(25, 94, 143, 0.94) 100%, rgba(38, 131, 198, 0) 100%)",
};
const cardStyle = {
  backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.7) 100%)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // Puedes usar '100%' si prefieres que no haga zoom
  backgroundPosition: 'center',
  color: 'white',
  height: 250,
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
};

const contentStyle = {
  position: 'relative',  // Esto asegura que el texto esté por encima del fondo oscurecido
};
const PaymentForm = (props) => {
  const [data, setData] = useState({});
    const [isMobile, setIsMobile] = useState(false); // 🔥 Estado para detectar si es móvil
  
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();
  const isAdmin = location.pathname.includes("/admin");
  const [token, setToken] = useState(localStorage.getItem(isAdmin? "tokenadmin":"token"));
  const log_out_click = () =>{
    
    if(isAdmin){
      localStorage.removeItem("tokenadmin");
  
      navigate("/");
      return
    }
    localStorage.removeItem("token");
    navigate("/");


  }
  useEffect(() => {
    dispatch(actionPaymentGet());
  }, [dispatch]);
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener('resize', handleResize);
  handleResize(); // Ejecutarlo al montar
  return () => window.removeEventListener('resize', handleResize);
}, []);
  useEffect(() => {
    if (props.payment) {
      setData(props.payment); // <<== Ahora directamente a data
    }
  }, [props.payment]);
  return (
    <>
      {token && data && (
        <>
          <Header title="Payment Details" icon="fas fa-money-check-dollar marginr-1" />
     <div className="h-100" style={contentStyle}>
    <CardBootrap style={cardStyle} className="">
                 <div style={backgroundStyle}></div>
   <div className="h-100" style={contentStyle}>
                <CardBootrap.Body className="h-100 d-flex justify-content-between align-items-center">
          
                          <div className="d-flex align-items-center h-100">
                            <i style={{ fontSize:42}} className={"fas fa-money-check-dollar marginr-1"}></i>
                            <h1 style={{ fontSize:42,fontWeight:600,marginTop:5}} >{"Payment Details"}</h1>
                          </div>
                          
                         
                      
                               <div className="">
                  {
                    !isMobile &&(
<>
 <h5 style={{fontWeight:600}}>{props.infoUser.nombre + " " + props.infoUser.apellido}</h5>
 <div className="d-flex justify-content-start">
                    <h5 className="marginr-1" style={{}} >PMB: </h5>
                    <h5>{props.infoUser.pmb}</h5>
                  </div>
               
</>
                    )
                  }
             
                
                  {/* Hipervínculo con animación underline */}
              <div style={{marginTop: isMobile ? "80px" : "10px"}}>
                    <Button
                   type="default"
                   block
                   onClick={log_out_click}
                   >
                   Log out?
                  </Button>
                  </div>
                </div>
          
                </CardBootrap.Body>
                </div>
                    </CardBootrap>
                    </div>
          <div style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'stretch',
            gap: '20px',
            maxWidth: '1000px',
            margin: '30px auto',
            padding: '20px',
            flexWrap: 'wrap'
          }}>
            {/* Resumen de pago */}
            <Cardant
              title={<span style={{ fontSize: '22px', fontWeight: 'bold' }}>Order Recap</span>}
              bordered={false}
              style={{
                flex: '1 1 300px',
                minHeight: '450px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
           
                fontSize: '18px'
              }}
            >
              
              <div style={{ marginBottom: '14px' }}>
                <strong>Name:</strong><br />
                <h6>{props.infoUser.nombre + " " + props.infoUser.apellido}</h6>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <strong>Date:</strong><br />
                <h6>{new Date().toLocaleDateString()}</h6>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <strong>PMB:</strong><br />
                <h6>{props.infoUser.pmb}</h6>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <strong>Email:</strong><br />
                <h6>{props.infoUser.email}</h6>
              </div>
            </Cardant>

            {/* Formulario de Pago */}
            <div style={{
              flex: '1 1 450px',
              minHeight: '450px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius:12,
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              fontSize: '18px',
              width:"100%"
            }}>
              <FormPayment conceptsData={data} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment.data,
  infoUser: state.menus.infoUser ?? {id:"",nombre:"",pmb:"",apellido:"",email:""},
});

export default connect(mapStateToProps)(PaymentForm);
