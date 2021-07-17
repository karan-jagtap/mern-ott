import { useState, useEffect } from "react";
import { Layout, List, Popconfirm, Modal, Button } from "antd";
import { connect } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  get_category,
  add_category,
  delete_category,
  edit_category,
} from "../../actions/categories.action";

const { Content } = Layout;

const Categories = (props) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItem, setEditItem] = useState({ name: "" });
  const [editNameError, setEditNameError] = useState(false);
  const [editNameErrorMsg, setEditNameErrorMsg] = useState("");

  useEffect(() => {
    console.log("calling useEffect()");
    props.get_category();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "edit_name") {
      let editItemNew = {};
      editItemNew._id = editItem._id;
      editItemNew.name = e.target.value;
      setEditItem(editItemNew);
      console.log("changing = ", editItemNew.name);
    }
  };

  const handleEdit = (e) => {
    const { name: nameTemp } = editItem;
    console.log("handleEdit() - ", nameTemp);
    if (nameTemp !== null && nameTemp !== "" && nameTemp !== undefined) {
      const arr = props.categories.categories.filter(
        (item) => item.name === nameTemp
      );
      console.log([arr, props.categories.categories]);
      if (arr.length === 0) {
        console.log("success");
        setEditNameError(false);
        setEditNameErrorMsg("");
        props.edit_category(editItem);
        setIsModalVisible(false);
      } else {
        console.log("present");
        setEditNameError(true);
        setEditNameErrorMsg("Category name already exists");
      }
    } else {
      setEditNameError(true);
      setEditNameErrorMsg("Please enter category name");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  const handleEditIconClick = (e, item) => {
    e.preventDefault();
    console.log("edit item = ", item);
    setEditItem(item);
    setIsModalVisible(true);
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    const { id } = e.target;

    if (id === "add" && name !== null && name !== "" && name !== undefined) {
      console.log(
        "arr = ",
        props.categories.categories.filter((item) => item.name === name)
      );
      const arr = props.categories.categories.filter(
        (item) => item.name === name
      );
      console.log("arr = ", arr);
      if (arr.length === 0) {
        setNameError(false);
        setNameErrorMsg("");
        props.add_category({ name });
        setName("");
      } else {
        setNameError(true);
        setNameErrorMsg("Category name already exists");
      }
    } else {
      setNameError(true);
      setNameErrorMsg("Please enter category name");
    }
  };

  return (
    <Content className="sub-component-parent-layout">
      {/* Start - Category name Input */}
      <div>
        <div>
          <span style={{ marginLeft: 5 }}>Name :</span>
          <span style={{ color: "red", marginLeft: 5 }}>*</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="input-layout">
            <input
              className="input-login"
              style={{ color: "black" }}
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </div>
          <button
            id="add"
            className="card-button-login"
            style={{
              width: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: 30,
              padding: "5px 20px",
            }}
            onClick={onButtonClick}
          >
            Add
          </button>
        </div>
        {nameError && <span className="error-login">{nameErrorMsg}</span>}
      </div>
      {/* End - Category name Input */}

      <hr style={{ backgroundColor: "grey", height: 1, width: "100%" }} />

      {/* Start - Category List */}
      <div>
        <List
          header={
            <div style={{ fontSize: 16, fontWeight: 500 }}>Categories :</div>
          }
          loading={props.categories.loading}
          bordered
          size="small"
          dataSource={props.categories.categories}
          renderItem={(item) => (
            <List.Item key={item.name}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span>{item.name}</span>
                <div>
                  <EditOutlined
                    style={{
                      cursor: "pointer",
                      fontSize: 20,
                      marginRight: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    onClick={(e) => handleEditIconClick(e, item)}
                  />
                  <Popconfirm
                    title="Are you sure？"
                    placement="leftTop"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={(e) => props.delete_category(item)}
                    okText="Delete"
                    okType="danger"
                  >
                    <DeleteOutlined
                      style={{
                        cursor: "pointer",
                        fontSize: 20,
                        color: "red",
                        marginRight: 20,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    />
                  </Popconfirm>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      {/* End - Category List */}

      {/* Start - Modal Edit */}
      <Modal
        title="Edit Category"
        visible={isModalVisible}
        onOk={handleEdit}
        okText="Edit"
        onCancel={handleCancel}
      >
        <div className="input-layout">
          <input
            className="input-login"
            style={{ color: "black", width: "100%", borderColor: "#222222" }}
            name="edit_name"
            type="text"
            value={editItem.name}
            onChange={handleChange}
            placeholder="Enter new category name"
          />
          {editNameError && (
            <span className="error-login">{editNameErrorMsg}</span>
          )}
        </div>
      </Modal>
      {/* End - Modal Edit */}
    </Content>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  get_category,
  add_category,
  delete_category,
  edit_category,
})(Categories);
