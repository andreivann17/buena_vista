import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/headerDashboard.jsx";
import { connect, useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import UsersTable from "../../components/tables/usersTable.js";
import { Button,Card as Cardant,Input,DatePicker } from 'antd';
import {Card as CardBootrap} from "react-bootstrap/";
import RecordFilter from "../../components/offCanvas/recordFilterUsers.js";
import { actionUsersGet, } from "../../redux/actions/users/users.js";
import { EllipsisOutlined } from '@ant-design/icons';
import {actionInfoAdmin} from "../../redux/actions/menus/menus"
import backgroundImage from "../../assets/img/users.webp"

const { RangePicker } = DatePicker;

const backgroundStyle = {
  position: "absolute",
  top: -120,
  left: 0,
  height: "100%",
  minHeight:"160px",
  color:"white",
  backgroundRepeat: "no-repeat",
  width: "100%",

};
const cardStyle = {
  backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.7) 100%), url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // Puedes usar '100%' si prefieres que no haga zoom
  backgroundPosition: 'center',
  color: 'white',
  height: 250,
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
};

function Home({ users,infoAdmin }) {
  const [showFilter, setShowFilter] = useState(false);
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false); // 🔥 Estado para detectar si es móvil
  const isAdmin = location.pathname.includes("/admin");
  const [token, setToken] = useState(localStorage.getItem(isAdmin? "tokenadmin":"token"));
  const [filteredData, setFilteredData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    pmb: '',
    username: '',

  });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (users) {
      setFilteredData(users);
    }
  }, [users]);
  useEffect(() => {
    dispatch(actionInfoAdmin());
    
  }, []);
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener('resize', handleResize);
  handleResize(); // Ejecutarlo al montar
  return () => window.removeEventListener('resize', handleResize);
}, []);
  useEffect(() => {
    ini()
  }, [infoAdmin]);
const ini = () =>{
   if(isAdmin){
        console.log(infoAdmin)
      dispatch(actionUsersGet(infoAdmin["id"]));
    }else{
            dispatch(actionUsersGet(infoAdmin));
    }
}

const handleFilter = ({ pmb, username }) => {
  let data = users;

  // 🔍 Filtrar por PMB (insensible a mayúsculas)
  if (pmb?.trim()) {
    const searchPMB = pmb.trim().toLowerCase();
    data = data.filter(item => {
      const pmbValue = item.pmb?.toString().toLowerCase() ?? "";
      return pmbValue.includes(searchPMB);
    });
  }

  // 🔍 Filtrar por nombre (buscando en firstname y lastname)
  if (username?.trim()) {
    const searchName = username.trim().toLowerCase();
    data = data.filter(item => {
      const first = item.nombre?.toLowerCase() ?? "";
      const last = item.apellido?.toLowerCase() ?? "";
      return first.includes(searchName) || last.includes(searchName);
    });
  }

  setFilteredData(data);
};


const contentStyle = {
  position: 'relative',  // Esto asegura que el texto esté por encima del fondo oscurecido
};
 const log_out_click = () =>{
    
    if(isAdmin){
      localStorage.removeItem("tokenadmin");
  
      navigate("/");
      return
    }
    localStorage.removeItem("token");
    navigate("/");


  }
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

          <Header title="Users" icon="fas fa-truck marginr-1" />
             <div className="h-100" >
              <CardBootrap style={cardStyle} className="">
              <div style={backgroundStyle}></div>
              <div className="h-100" style={contentStyle}>
                <CardBootrap.Body className="h-100 d-flex justify-content-between align-items-center">
          
                          <div className="d-flex align-items-center h-100">
                            <i style={{ fontSize:42}} className={"fas fa-users marginr-1"}></i>
                            <h1 style={{ fontSize:42,fontWeight:600,marginTop:5}} >{"Users"}</h1>
                          </div>
                          
                         
                      
                            <div className="">
                          {
                    !isMobile &&(
 <h5 style={{ fontWeight:600}}>{infoAdmin.nombre + " " + infoAdmin.apellido}</h5>
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
          <div className="Panel_Contenido marginb-5 p-4">
       
            <div className="d-flex justify-content-end marginb-3 margint-2">
            <div className="d-flex align-items-center">
            {/* 🔥 Estos se ocultan en móviles */}
            {!isMobile && (
                    <>
                     <div className="marginr-1">
                     <Input
    placeholder={"Search by Name"}
    allowClear
    size="large"
    value={filterValues.username}
    onChange={(e) => setFilterValues(prev => ({ ...prev, username: e.target.value }))}
  />
</div>

<div className="marginr-1">
  <Input
    placeholder={"Search by PMB"}
    allowClear
    size="large"
    value={filterValues.pmb}
    onChange={(e) => setFilterValues(prev => ({ ...prev, pmb: e.target.value }))}
  />
</div>

<Button
  onClick={() => handleFilter(filterValues)}
  type="primary"
  style={{ minWidth: "120px" }}
  className="custom-button"
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
            <UsersTable ini={ini} data={filteredData}  />
            </Cardant>
         
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.data, // <-- Aquí conectamos los datos de Redux
  infoAdmin: state.menus.infoAdmin ?? {id:"",nombre:"",pmb:"",apellido:"",email:""},

});

export default connect(mapStateToProps)(Home);
