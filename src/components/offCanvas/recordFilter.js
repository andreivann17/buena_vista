import React from 'react';
import { Drawer, Input, DatePicker, Button, Space } from 'antd';

const { RangePicker } = DatePicker;

function RecordFilter({ show, setShow, onFilter, isAdmin, filterValues, setFilterValues }) {
  const { pmb, code,startDate, endDate } = filterValues;

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
        startDate: dates[0] ? dates[0].toDate() : null,
        endDate: dates[1] ? dates[1].toDate() : null,
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
            placeholder={ "Search by Code"}
            value={code}
            onChange={(e) => setFilterValues(prev => ({ ...prev, code: e.target.value }))}
            allowClear
            size="large"
          />
          {
            isAdmin && (
            <Input
            placeholder={ "Search by PMB"}
            value={pmb}
            onChange={(e) => setFilterValues(prev => ({ ...prev, pmb: e.target.value }))}
            allowClear
            size="large"
          />
            )
          }

          <Button block size="large" onClick={showSubDrawer}>
            Select Date Range
          </Button>

          <Button type="primary" size="large" block onClick={handleSearch}>
          <i className="fas fa-search marginr-1"></i> Search
          </Button>
        </Space>

        <Drawer
          title="Select Date Range"
          placement="right"
          closable={false}
          onClose={onCloseSub}
          visible={filterValues.showSubDrawer || false}
        >
          <RangePicker
            size="large"
            style={{ width: '100%' }}
            onChange={handleDateChange}
          />
          <Button
            type="primary"
            block
            style={{ marginTop: 16 }}
            onClick={onCloseSub}
          >
            Confirm Date Range
          </Button>
        </Drawer>
      </Drawer>
    </>
  );
}

export default RecordFilter;
