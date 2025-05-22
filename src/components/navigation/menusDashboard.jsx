import React, { useState, useEffect, useRef } from "react";
import "./../../assets/css/menu.css";
import "./../../assets/css/utils.css";
import "./../../assets/css/fontawesome-free-6.1.0-web/css/all.css";
import "./../../assets/css/fontawesome-free-6.1.0-web/css/all.min.css";
import { useNavigate,useLocation } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import { Collapse,OverlayTrigger,Popover } from "react-bootstrap/";
import { connect, useDispatch } from "react-redux";
import {actionInfoUser,actionInfoAdmin,actionTokenValidate,actionTokenValidateAdmin} from "../../redux/actions/menus/menus"

const icons = ['fas fa-truck', 'fas fa-money-check-dollar']
const iconsAdmin = ['fas fa-truck', 'fas fa-user']
const botones = [
  [["Shipments", "/shipments"], []],
  [["Payment", "/payment"], []],
];

const botonesAdmin = [
  [["Shipments", "/admin/shipments"], []],
  [["Users", "/admin/users"], []],
];

function Navbar({ valuenav,isAdmin,isMobile }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(0);
  const [activeButton2, setActiveButton2] = useState(0);
  const location = useLocation();

 
  
  // 🔥 Escoge botones correctos

  const botonesMostrar = isAdmin ? botonesAdmin : botones;
  const iconosMostrar = isAdmin ? iconsAdmin : icons;
  const [open, setOpen] = useState(Array(botonesMostrar.length).fill(false));
  const activeIndex = botonesMostrar.findIndex(
    (btn) => btn[0][1] === location.pathname
  );
  const [token, setToken] = useState(localStorage.getItem(isAdmin? "tokenadmin":"token"));




  const onState = (pos, subpos, url) => {
    if (url === "-") {
      let newdata = [...open];
      newdata[pos] = !newdata[pos];
      setOpen(newdata);
      setActiveButton2(-1);
    } else {
      // Actualiza el botón antes de redireccionar
      setActiveButton(pos);
      setActiveButton2(subpos);
      localStorage.setItem(isAdmin ? 'activeButtonAdmin' : 'activeButtonUser', pos);
      navigate(url);
    }
  };
  
  
  
  useEffect(() => {
    setActiveButton(parseInt(valuenav));
  }, [valuenav]);
  useEffect(() => {
    console.log(activeButton)
  }, [activeButton]);
  useEffect(() => {
    if(isAdmin){
  dispatch(actionInfoAdmin());
    }else{
        dispatch(actionInfoUser());
    }
    
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const botonesActuales = isAdmin ? botonesAdmin : botones;
  
    const foundIndex = botonesActuales.findIndex((value) => value[0][1] === path);
    if (foundIndex !== -1) {
      setActiveButton(foundIndex);
      localStorage.setItem(isAdmin ? 'activeButtonAdmin' : 'activeButtonUser', foundIndex);
    } else {
      // Si no lo encuentra, intenta con el localStorage
      const storedButton = localStorage.getItem(isAdmin ? 'activeButtonAdmin' : 'activeButtonUser');
      if (storedButton !== null) {
        setActiveButton(parseInt(storedButton));
      }
    }
  }, [isAdmin]);
    const log_out = () =>{
    
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
    
         if(isAdmin){
   dispatch(actionTokenValidateAdmin(log_out));
    }else{
  dispatch(actionTokenValidate(log_out));
    }
  

  

     if (token == null) {
      
      navigate("/");
    }
  }, [token]);
  
  
  
  
  return (
    <>

      {token != null && (
           <>

{
   isMobile ? (
  <div className="div-navbar-mobile" style={{ background: "#2683c6" }} >
          <div className="d-flex">
            {botonesMostrar.map((value, index) => {

             
                return (
                  <>
                    <button

                      className={`w-100 d-block  text-white border-0 ${activeButton === index ? "custom-button-active" : "custom-button"}`}
                      style={{
                        height: "50px",
                        borderRadius: "0px",
                        textAlign: "start",
                      }}
                      aria-controls="example-collapse-text"
                      aria-expanded={open[index]}
                      onClick={() => onState(index, "-1", value[0][1])}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>


                          <div className="d-flex margint-1" >
                            <i style={{ fontSize: "20px" }} className={iconosMostrar[index] + " marginl-1 marginr-1"}></i>
                            <h6 className="text-white" style={{fontWeight:600,fontSize: "20px"}}>{value[0][0]}</h6>
                          </div>
                        </div>
                        {
                          value[1].length > 0 &&
                          <div className="icon-collapse">
                            {
                              open[index] ? <span class="material-symbols-outlined">
                                expand_more
                              </span> : <span class="material-symbols-outlined">
                                chevron_right
                              </span>
                            }
                          </div>
                        }
                      </div>
                    </button>

                    {value[1].length > 0 && (
                      <Collapse in={open[index]}>
                        <div>
                          {value[1].map((value2, index2) => (

                            <button



                              className={`w-100 btn-success btn d-block text-white border-0 ${(activeButton2 === index2 && activeButton === index) ? "active" : ""}`}



                              onClick={() => onState(index, index2, value2[1])}
                              style={{
                                height: "40px",
                                borderRadius: "0px",
                                textAlign: "start",
                              }}
                            >

                              <div className="marginl-3 div-navbar-buttons align-items-center">
                                <h6>    {value2[0]}</h6>
                              </div>
                            </button>
                          ))}
                        </div>
                      </Collapse>
                    )}
                  </>

                );
              
            })}
          </div>

        </div>
  ) : (
    <div className="div-navbar" style={{ background: "#2683c6" }} >
   <div className="marginb-2">

  
    <div className="justify-content-center d-flex  margint-2 div-navbar-img" style={{padding:15}}>
      <img className="img-fluid" alt="" src={logo} />
    </div>
    <div className="d-flex justify-content-center">
      {
        isAdmin &&(
          
          <h6 style={{color:"#fff",fontWeight:600}}>Admin</h6>
        )
      }
    </div>
    </div>
    <div className="w-100">
      {botonesMostrar.map((value, index) => {

    
          return (
            <>
              <button

className={`w-100 d-block text-white border-0 ${activeIndex === index ? "custom-button-active" : "custom-button"}`}

                style={{
                  height: "50px",
                  borderRadius: "0px",
                  textAlign: "start",
                }}
                aria-controls="example-collapse-text"
                aria-expanded={open[index]}
                onClick={() => onState(index, "-1", value[0][1])}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>


                    <div className="d-flex div-navbar-buttons" >
                      <i style={{ fontSize: "20px" }} className={iconosMostrar[index] + " marginl-1 marginr-1"}></i>
                      <h6>{value[0][0]}</h6>
                    </div>
                  </div>
                  {
                    value[1].length > 0 &&
                    <div className="icon-collapse">
                      {
                        open[index] ? <span class="material-symbols-outlined">
                          expand_more
                        </span> : <span class="material-symbols-outlined">
                          chevron_right
                        </span>
                      }
                    </div>
                  }
                </div>
              </button>

              {value[1].length > 0 && (
                <Collapse in={open[index]}>
                  <div>
                    {value[1].map((value2, index2) => (

                      <button



                        className={`w-100 btn-success btn d-block text-white border-0 ${(activeButton2 === index2 && activeButton === index) ? "active" : ""}`}



                        onClick={() => onState(index, index2, value2[1])}
                        style={{
                          height: "40px",
                          borderRadius: "0px",
                          textAlign: "start",
                        }}
                      >

                        <div className="marginl-3 div-navbar-buttons">
                          <h6>    {value2[0]}</h6>
                        </div>
                      </button>
                    ))}
                  </div>
                </Collapse>
              )}
            </>

          );
       
      })}
    </div>

  </div>
  )
}
       
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  dataLogin:state.login.login?? [],
  infoUser: state.menus.infoUser ?? { id: "0", nombre: "Andre Herrera", img: "" }
});

export default connect(mapStateToProps)(Navbar);