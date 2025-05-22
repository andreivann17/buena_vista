import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

// Función auxiliar para formatear fechas a yyyy/mm/dd
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === '0000-00-00') return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

function HistoryTable({ data, isAdmin }) {
  const mappedData = Array.isArray(data)
    ? data.map(item => ({
        RecordNumber: item.registro,
        pmb: item.pmb,
        ReceivedDate: formatDate(item.fecharecibido),
        Name: item.nombre,
        code: item.codigoenvio,
        DeliveryDate: formatDate(item.fechaentrega),
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
        className="custom-history-table"
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
