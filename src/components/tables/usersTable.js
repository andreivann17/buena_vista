import React, { useState } from 'react';
import { Table, Dropdown, Menu, Button, Modal } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Column } = Table;
const { confirm } = Modal;

function HistoryTable({ data, isAdmin }) {
  const [hoveredRowKey, setHoveredRowKey] = useState(null);

  const onConfirmDelete = (pmb) => {
    // 🔥 Aquí ejecutas la lógica real de eliminación
    console.log("✅ Usuario confirmado para eliminar:", pmb);
  };

  const showDeleteConfirm = (pmb) => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: <ExclamationCircleOutlined />,
      content: `Esta acción no se puede deshacer. PMB: ${pmb}`,
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        onConfirmDelete(pmb);
      },
      onCancel() {
        // No hacer nada si se cancela
        console.log("❌ Eliminación cancelada");
      },
    });
  };

  const renderActions = (text, record) => {
    const menu = (
      <Menu>
        <Menu.Item key="delete" onClick={() => showDeleteConfirm(record.pmb)}>
          Eliminar
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Button type="text" icon={<EllipsisOutlined />} />
      </Dropdown>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        maxWidth: '100%',
      }}
    >
      <Table
  dataSource={Array.isArray(data) ? data : []}
  rowKey="pmb"
  bordered
  style={{ minWidth: 600, marginBottom: '30px' }}
  className="custom-bordered-table"
  pagination={{ style: { marginTop: '30px' } }}
  onRow={(record) => ({
    onMouseEnter: () => setHoveredRowKey(record.pmb),
    onMouseLeave: () => setHoveredRowKey(null),
  })}
>

        <Column title="Name" dataIndex="name" key="name" />
        <Column title="UserName" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="PMB" dataIndex="pmb" key="pmb" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) =>
            hoveredRowKey === record.pmb ? renderActions(text, record) : null
          }
        />
      </Table>
    </div>
  );
}

export default HistoryTable;
