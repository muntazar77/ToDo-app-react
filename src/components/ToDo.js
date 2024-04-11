import { Button, Table,Select, Modal, Input } from "antd";
import { useState } from "react";
import Data from "../Data"
import { FaEdit, FaTrash } from "react-icons/fa";


const Todo = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const hasSelected = selectedRowKeys.length > 0;
    const [isEditing, setIsEditing] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);


    const [data, setData] = useState(Data);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const columns = [
        {
            key: '1',
            title: 'Key',
            dataIndex: 'key',
        },
        {
            key: '2',
            title: 'Title',
            dataIndex: 'title',
        },
        {
            key: '3',
            title: 'Status',
            dataIndex: 'status',
        },
        {
            key: '4',
            title: 'Action',
            render: (record) => {
                return (
                    < >

                        <div style={{ fontSize: "15px" }}>
                            <FaEdit type={"link"} onClick={() => {
                                onEditTodo(record)
                            }} />
                            <FaTrash onClick={() => { onDeleteTodo(record); }} style={{ color: "red", marginLeft: "10px" }} /> </div>
                    </>
                )
            },
        },
    ];

    //this function will add the todo
    const addTodo = () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const newTodo = {
            key: randomNumber,
            title: "Title " + randomNumber,
            status: "pending",
        };
        setData((pre) => {
            return [...pre,newTodo];
        });
    };

    //this function will edit the todo
    const onEditTodo = (record) => {
        setIsEditing(true);
        setEditingTodo({ ...record });

    };
    //this function will reset the editing
    const restEditing = () => {
        setIsEditing(false);
        setEditingTodo(null);
    }


    //this function will delete the todo
    const onDeleteTodo = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this todo record?",
            content: "This action cannot be undone.",
            okText: "Yes",
            okType: "danger",
            onOk() {
                setData((pre) => {
                    return pre.filter((todo) => todo.key !== record.key)
                });
            }
        });

    };
    //this function will delete all the todos
    const onDeletAll = () => {
        setData([])
    }


    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >

                <Button type="primary" onClick={addTodo}>
                                Add Todo
                            </Button>
                {/* this Modal for update Todo */}
                <Button type="primary" danger onClick={onDeletAll} style={{ marginLeft: 8 }}> Delete all </Button>

                <Modal
                
                    title="Edit Todo"
                    open={isEditing}
                    okText="Edit"
                    onCancel={() => {
                        restEditing();
                    }}
                    onOk={() => {
                        setData((per) => {
                            return per.map((todo) => {
                                if (todo.key === editingTodo.key) {
                                    return editingTodo;
                                } else {
                                    return todo;
                                }
                            })
                        });
                        restEditing();
                    }}
                >
                    <span style={{ marginTop: 10 }}>
                        Title :
                    </span> <br />

                    <Input value={editingTodo?.title}
                    
                        onChange={(e) => {
                            setEditingTodo((pre) => {
                                return { ...pre, title: e.target.value };
                            });
                        }} />


                    <span style={{ marginTop: 10 }}>
                        Status :
                    </span> <br />
                    <Select
                        value={editingTodo?.status}
                        onChange={(value) => {
                            setEditingTodo((pre) => {
                                return { ...pre, status: value }
                            })
                        }}
                        options={[
                            { value: 'completed', label: 'completed' },
                            { value: 'pending', label: 'pending' },
                        ]} > </Select>


                
                



                </Modal>



                <span style={{ marginLeft: 8, }}>


                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};
export default Todo;