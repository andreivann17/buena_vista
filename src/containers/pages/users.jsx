import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/headerDashboard.jsx";
import Contenido from "../../components/navigation/contentDashboard.jsx";
import { connect, useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import UsersTable from "../../components/tables/usersTable.js";
import { Button,Card,Input,DatePicker } from 'antd';
import RecordFilter from "../../components/offCanvas/recordFilter.js";
import { actionUsersGet } from "../../redux/actions/users/users.js";
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

function Home({ users }) {
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
    dispatch(actionUsersGet());
  }, [dispatch]);

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
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener('resize', handleResize);
  handleResize(); // Ejecutarlo al montar
  return () => window.removeEventListener('resize', handleResize);
}, []);
const handleFilter = ({ pmb,username }) => {
  console.log(pmb)
  console.log(username)
  let data = users;

  if (pmb) {
    data = data.filter(item => {
      const searchValue = pmb.toLowerCase();
     
        return (
         
          (item.pmb && item.pmb.toLowerCase().includes(searchValue))
        );
     
    });
  }
  if (username) {
    data = data.filter(item => {
      const searchValue = username.toLowerCase();
   
        return (
      
          (item.username && item.username.toLowerCase().includes(searchValue))
        );
   
    });
  }
 

  setFilteredData(data);
};


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
          <Contenido backgroundStyle={backgroundStyle} title="Users" icon="fas fa-users marginr-1" />
          <div className="Panel_Contenido marginb-5">
         
        
              
            <div className="d-flex justify-content-end marginb-3">
            <div className="d-flex align-items-center">
            {/* 🔥 Estos se ocultan en móviles */}
            {!isMobile && (
                    <>
                     <div className="marginr-1">
                     <Input
    placeholder={"Search by UserName"}
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
              
            <Card style={{borderRadius:12,boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",padding:20}}>
            <UsersTable data={filteredData} isAdmin={isAdmin} />
            </Card>
         
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.data, // <-- Aquí conectamos los datos de Redux
});

export default connect(mapStateToProps)(Home);
