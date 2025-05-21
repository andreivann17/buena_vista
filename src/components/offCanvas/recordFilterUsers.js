import React from 'react';
import { Drawer, Input, DatePicker, Button, Space } from 'antd';

const { RangePicker } = DatePicker;

function RecordFilter({ show, setShow, onFilter, isAdmin, filterValues, setFilterValues }) {
  const { pmb,username } = filterValues;

  const onCloseMain = () => {
    setShow(false);
  };

  const showSubDrawer = () => {
    setFilterValues(prev => ({ ...prev, showSubDrawer: true }));
  };

  const onCloseSub = () => {
    setFilterValues(prev => ({ ...prev, showSubDrawer: false }));
  };

  const handleSearch = () => {
    if (onFilter) {
      onFilter(filterValues);
    }
    setShow(false); // Cierra el Drawer después de buscar
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setFilterValues(prev => ({
        ...prev,
      }));
    }
  };

  return (
    <>
      <Drawer
        title="Filter"
        placement="right"
        closable={false}
        onClose={onCloseMain}
        visible={show}
        extra={
          <Space>
            <Button onClick={onCloseMain}>
              <i className="fas fa-times"></i>
            </Button>
          </Space>
        }
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input
            placeholder={"Search by PMB"}
            value={pmb}
            onChange={(e) => setFilterValues(prev => ({ ...prev, pmb: e.target.value }))}
            allowClear
            size="large"
          />
     <Input
            placeholder={"Search by UserName"}
            value={username}
            onChange={(e) => setFilterValues(prev => ({ ...prev, username: e.target.value }))}
            allowClear
            size="large"
          />
         
          <Button type="primary" size="large" block onClick={handleSearch}>
          <i className="fas fa-search marginr-1"></i> Search
          </Button>
        </Space>

      
      </Drawer>
    </>
  );
}

export default RecordFilter;
