import React, { useState } from 'react'
import { Input, Table, Tag, Modal } from 'antd'

import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

const AntTable = ({ data, setData }) => {

    const [editRecord, setEditRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [seachText, setSeachText] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const start = tomorrow.toISOString().split("T")[0];

    let checkOverDue;

    const columns = [
        {
            key: 0,
            title: "Title",
            dataIndex: "title",
            filteredValue: [seachText],
            onFilter: (value, record) => {

                return String(record.title)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                    String(record.description)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.startDate)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.dueDate)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.status)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.tag)
                        .toLowerCase()
                        .includes(value.toLowerCase());

            }
        },
        {
            key: 1,
            title: "Description",
            dataIndex: "description",
            sorter: (record1, record2) => {

                return record1.description.length > record2.description.length;
            }
        },
        {
            key: 2,
            title: "Start",
            dataIndex: "startDate",
            sorter: (record1, record2) => {
                return new Date(record1.startDate) < new Date(record2.startDate);
            },
            render: start => {
                return <Tag>{start}</Tag>
            }
        },
        {
            key: 3,
            title: "Due Date",
            dataIndex: "dueDate",
            sorter: (record1, record2) => {
                return new Date(record1.dueDate) < new Date(record2.dueDate);
            },
            render: due => {
                checkOverDue = new Date(due);
                return <Tag>{due}</Tag>
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: 4,

            render: (record) => {
                if (checkOverDue < new Date()) {
                    return <p style={{ color: "red" }}>OverDue</p>
                }
                return <div>{record === "Working" ? <p style={{ color: "RGB(254, 158, 5)", }}>{record}</p>
                    : record === "Open" ? <p style={{ color: "RGB(81, 189, 246)" }}>{record}</p>
                        : record === "Done" ? <p style={{ color: "RGB(30, 200, 109)" }}>{record}</p>
                            : <p style={{ color: "red" }}>{record}</p>}</div>
            }
        },
        {
            title: "Tags",
            dataIndex: "tag",
            key: 5
        },
        {
            key: 6,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => {
                            onEditRecord(record)
                        }} style={{ cursor: "pointer" }} />
                        <DeleteOutlined onClick={() => {
                            onDeleteRecord(record)
                        }} style={{ marginLeft: 15, color: "red", cursor: "pointer" }} />
                    </>
                )
            }
        }
    ];


    const onDeleteRecord = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setData((pre) => {
                    return pre.filter((item) => item.key !== record.key);
                })
            }
        })
    }

    const onEditRecord = (record) => {
        setIsEditing(true);
        setEditRecord({ ...record });

    }

    const resetEditing = () => {
        setIsEditing(false);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Input.Search placeholder='Search here...'
                style={{ marginBottom: 18, width: "50%",marginTop:15 }}
                onSearch={(value) => {
                    setSeachText(value);
                }}
                onChange={(e) => {
                    setSeachText(e.target.value);
                }}
            />

            <Table
                style={{ width: "100%" }}
                columns={columns}
                dataSource={data}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    }
                }}

            >
            </Table>
            <Modal
                title="Edit Record"
                open={isEditing}
                okText="Save"
                onCancel={() =>
                    resetEditing()
                }
                onOk={() => {
                    setData((pre) => {
                        return pre.map((item) => {
                            if (item.key === editRecord.key) {
                                return editRecord;
                            }
                            else {
                                return item;
                            }
                        });
                    });
                    setIsEditing(false);
                }}
            >
                <label><b>Title: </b></label>
                <Input value={editRecord?.title} onChange={(e) => {
                    setEditRecord((pre) => {
                        return { ...pre, title: e.target.value };
                    })
                }} />
                <label><b>Describctions: </b></label>
                <Input value={editRecord?.description} onChange={(e) => {
                    setEditRecord((pre) => {
                        return { ...pre, description: e.target.value };
                    })
                }} />
                <label><b>Status:</b> </label>
                <select onChange={(e) => {
                    setEditRecord((pre) => {
                        return { ...pre, status: e.target.value }
                    })
                }}>
                    <option>Select Status</option>
                    <option value="Working">Working</option>
                    <option value="Done">Done</option>
                </select>
                <br />
                <label><b>Due Date:</b></label>
                <Input type='date'
                    min={start ? new Date(start).toISOString().split("T")[0] : ""}
                    value={editRecord?.dueDate} onChange={(e) => {
                        setEditRecord((pre) => {
                            return { ...pre, dueDate: e.target.value };
                        })
                    }} />

            </Modal>
        </div>
    )
}

export default AntTable;