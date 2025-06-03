import React, { useState } from 'react';
import { Table, Dropdown, Menu, Button, Modal, notification } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { actionUsersDelete } from "../../redux/actions/users/users.js";
import { useDispatch } from 'react-redux';

const { Column } = Table;
const { confirm } = Modal;

function HistoryTable({ data, ini }) {
  const [hoveredRowKey, setHoveredRowKey] = useState(null);
  const dispatch = useDispatch();

  const onConfirmDelete = (id) => {
    dispatch(actionUsersDelete(id, callback, callbackError));
  };

  const openNotification = (msg, type = "error") => {
    notification[type]({
      message: type === "error" ? "Error" : "Success",
      description: msg,
    });
  };

  const callback = () => {
    ini();
    openNotification("User deleted successfully.", "success");
  };

  const callbackError = (msg) => {
    openNotification(msg);
  };

  const showDeleteConfirm = (pmb, id) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: `This action cannot be undone. PMB: ${pmb}`,
      okText: 'Yes, delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        onConfirmDelete(id);
      },
      onCancel() {
        console.log("❌ Deletion canceled");
      },
    });
  };

  const renderActions = (text, record) => {
    const menu = (
      <Menu>
        <Menu.Item key="delete" onClick={() => showDeleteConfirm(record.pmb, record.id)}>
          Delete
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
    <div style={{ width: '100%', overflowX: 'auto', maxWidth: '100%' }}>
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
        <Column title="First Name" dataIndex="nombre" key="nombre" />
        <Column title="Last Name" dataIndex="apellido" key="apellido" />
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
