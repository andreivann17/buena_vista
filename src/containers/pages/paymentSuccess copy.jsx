import React, { useState, useEffect } from 'react';
import { Button,Card as Cardant,Input,Spin,notification } from 'antd';
import {Card as CardBootrap} from "react-bootstrap/";
import Header from "../../components/navigation/headerDashboard.jsx";
import FormPayment from "../../components/forms/payment.js";
import { connect, useDispatch } from 'react-redux';
import { actionPaymentExecute } from "../../redux/actions/payment/payments.js";
import { useNavigate,useLocation,useSearchParams } from "react-router-dom";

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
   const openNotification = (msg) => {
      notification.error({
        message: "Error",
        description: msg,
      });
    };
  
    
    const openNotificationSuccess = () => {
    notification.success({
      message: "Password Updated",
      description: "Your password has been successfully reset. You can now log in.",
    });
  };
  
  const callback = () => {
    
    setPaymentStatus("approved");
  };
  
   const callbackError = (msg) =>{
    console.log(msg)
    if(msg =="404: Payment not found or doesn't belong to this user"){
      setPaymentStatus("404");
      return
    }else{
setPaymentStatus("error");
    }
    
    
   }
  const [searchParams] = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState("");
    
  
    useEffect(() => {
      const paymentId = searchParams.get('paymentId'); // PayPal usa paymentId en la URL
      const payerId = searchParams.get('PayerID');    // Nota: PayPal usa "PayerID" con mayúsculas
      
      if (paymentId && payerId) {
      dispatch(actionPaymentExecute(paymentId,payerId,callback,callbackError))
      }
    }, [searchParams]);

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
       <div className="d-flex justify-content-center mt-5">
  <Cardant
    style={{
      width: 420,
      padding: 24,
      borderRadius: 12,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      background: '#fafafa',
    }}
  >
    <h2 style={{ marginBottom: 16 }}>Payment Processing</h2>

    {paymentStatus === 'approved' ? (
  <>
    <p style={{ fontSize: 16 }}>
      <strong>Status:</strong> {paymentStatus}
    </p>
    <p style={{ color: 'green', fontWeight: 'bold' }}>
      ✅ Your payment was successful!
    </p>
  </>
) : paymentStatus === '404' ? (
  <div>
    <p style={{ fontSize: 16, color: '#d32029', fontWeight: 'bold' }}>
      ❌ This payment link is no longer valid.
    </p>
    <p style={{ color: '#888' }}>
      It may have already been used or expired. Please contact support or try again from your account dashboard.
    </p>
  </div>
) : paymentStatus === 'error' ? (
  <p style={{ color: 'red', fontWeight: 'bold' }}>❌ An unexpected error occurred. Please try again later.</p>
) : (
  <div>
    <p style={{ fontSize: 16 }}>Please wait while we confirm your payment...</p>
    <Spin size="large" style={{ marginTop: 16 }} />
  </div>
)}

  </Cardant>
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
