import { Content } from "antd/lib/layout/layout";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { get_category } from "../../actions/categories.action";
import "../adminDashboard/AdminDashboard.css";
import "./AddVideos.css";
import { add_video } from "../../actions/videos.action";

const { Option } = Select;
const AddVideos = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [videoId, setVideoId] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [decodedVideoId, setDecodedVideoId] = useState("");

  useEffect(() => {
    console.log("calling useEffect()");
    if (props.categories.categories.length === 0) {
      props.get_category();
    }
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log("e = ", e.target.files);
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "videoId") {
      setVideoId(value);
    } else if (name === "thumbnailFile") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setThumbnailFile(reader.result);
      };
    }
  };

  const handleCategoriesSelect = (value) => {
    setCategories(value);
  };

  const validate = () => {
    if (title === "" || title === undefined || title === null) {
      setErrorMsg("Please enter title");
      return false;
    }

    if (categories.length === 0) {
      setErrorMsg("Please select atleast 1 category");
      return false;
    }

    if (videoId === "" || videoId === undefined || videoId === null) {
      setErrorMsg("Please enter video id / url");
      return false;
    }

    if (
      thumbnailFile === "" ||
      thumbnailFile === undefined ||
      thumbnailFile === null
    ) {
      setErrorMsg("Please select a thumbnail");
      return false;
    }

    // extracting the video id if url is provided
    if (videoId.includes("v=")) {
      setDecodedVideoId(videoId.split("v=")[1]);
    } else if (videoId.includes("/")) {
      const temp = videoId.split("/");
      setDecodedVideoId(temp[temp.length - 1]);
    } else {
      setDecodedVideoId(videoId);
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.add_video({
        title,
        description,
        categories,
        decodedVideoId,
        thumbnailFile,
      });
    }
  };

  const clearStateObjects = () => {
    setTitle("");
    setDescription("");
    setThumbnailFile("");
    setDecodedVideoId("");
    setCategories([]);
    setVideoId("");
    setErrorMsg("");
  };

  return (
    <Content className="sub-component-parent-layout">
      {/* Start - error block */}
      {errorMsg !== "" && (
        <div
          style={{
            color: "red",
            marginTop: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {errorMsg}
        </div>
      )}
      {/* End - error block */}

      {/* Start - Title Input */}
      <div>
        <div>
          <span style={{ marginLeft: 5 }}>Title :</span>
          <span style={{ color: "red", marginLeft: 5 }}>*</span>
        </div>
        <div className="input-layout">
          <input
            className="input-login"
            style={{ color: "black", width: "100%" }}
            name="title"
            type="text"
            value={title}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End - Title Input */}

      {/* Start - Description Input */}
      <div style={{ marginTop: 10 }}>
        <div>
          <span style={{ marginLeft: 5 }}>Description :</span>
        </div>
        <div className="input-layout">
          <textarea
            className="input-login"
            rows={5}
            style={{
              color: "black",
              width: "100%",
              height: 80,
              maxHeight: "auto",
            }}
            name="description"
            value={description}
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End - Description Input */}

      {/* Start - Video ID Input */}
      <div style={{ marginTop: 10 }}>
        <div>
          <span style={{ marginLeft: 5 }}>Video ID / Url :</span>
          <span style={{ color: "red", marginLeft: 5 }}>*</span>
        </div>
        <div className="input-layout">
          <input
            className="input-login"
            style={{ color: "black", width: "100%" }}
            name="videoId"
            type="text"
            value={videoId}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End - Video ID Input */}

      {/* Start - Categories Input */}
      <div style={{ marginTop: 18, display: "flex", alignItems: "center" }}>
        <div>
          <span style={{ marginLeft: 5, whiteSpace: "nowrap" }}>
            Categories :
          </span>
          <span style={{ color: "red", marginLeft: 5, marginRight: 5 }}>*</span>
        </div>
        <div style={{ width: "100%", marginLeft: 20 }}>
          <Select
            mode="multiple"
            size="middle"
            allowClear
            placeholder="Please select category"
            style={{ width: "100%" }}
            onChange={handleCategoriesSelect}
          >
            {props.categories.categories.map((item) => (
              <Option key={item._id}>{item.name}</Option>
            ))}
          </Select>
        </div>
      </div>
      {/* End - Categories Input */}

      {/* Start - Thumbnail Input */}
      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <span style={{ marginLeft: 5, whiteSpace: "nowrap" }}>
            Thumbnail :
          </span>
          <span style={{ color: "red", marginLeft: 5, marginRight: 5 }}>*</span>
        </div>
        <div style={{ width: "100%", marginLeft: 20 }}>
          <input
            style={{ color: "black", width: "100%" }}
            name="thumbnailFile"
            type="file"
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* End - Thumbnail Input */}

      {/* Start - Submit button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          id="submit"
          className="card-button-login"
          style={{
            minWidth: "auto",
            maxWidth: 150,
            marginTop: 30,
            marginBottom: 30,
            padding: "5px 20px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {/* End - Submit button */}
    </Content>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  videos: state.videos,
});
export default connect(mapStateToProps, { get_category, add_video })(AddVideos);
