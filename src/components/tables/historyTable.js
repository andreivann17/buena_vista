import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

function HistoryTable({ data, isAdmin }) {
  const mappedData = Array.isArray(data)
    ? data.map(item => ({
        RecordNumber: item.registro,
        pmb: item.pmb,
        ReceivedDate: item.fecharecibido,
        Name: item.nombre,
        code: item.codigoenvio,
        DeliveryDate: item.fechaentrega,
        DeliveredBy: item.nombreentregado,
      }))
    : [];

  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      maxWidth: '100%',
    }}>
      <Table
        dataSource={mappedData}
        rowKey="RecordNumber"
        bordered
        style={{ minWidth: 600, marginBottom: '30px' }}
        pagination={{ style: { marginTop: '30px' } }}
      >
        {isAdmin && (
          <Column title="PMB" dataIndex="pmb" key="pmb" />
        )}
        <Column title="Received Date" dataIndex="ReceivedDate" key="ReceivedDate" />
        <Column title="Name" dataIndex="Name" key="Name" />
        <Column title="Code" dataIndex="code" key="code" />
        <Column title="Picked up by" dataIndex="DeliveryDate" key="DeliveryDate" />
        <Column title="Pickup date" dataIndex="DeliveredBy" key="DeliveredBy" />
      </Table>
    </div>
  );
}

export default HistoryTable;
