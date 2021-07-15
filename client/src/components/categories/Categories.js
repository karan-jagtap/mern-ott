import { useState, useEffect } from "react";
import { Layout, List } from "antd";
import { connect } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { get_category, add_category } from "../../actions/categories.action";

const { Content } = Layout;

const Categories = (props) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");

  useEffect(() => {
    console.log("calling useEffect()");
    props.get_category();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
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
      } else {
        setNameError(true);
        setNameErrorMsg("Category name already exists");
      }
    } else {
      setNameError(true);
      setNameErrorMsg("Please enter category name");
    }
  };

  console.log("props.categories.categories", props.categories.categories);

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
            {nameError && <span className="error-login">{nameErrorMsg}</span>}
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
                  />
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
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      {/* End - Category List */}
    </Content>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.categories,
});

export default connect(mapStateToProps, { get_category, add_category })(
  Categories
);
