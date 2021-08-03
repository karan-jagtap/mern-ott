import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Image } from "cloudinary-react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { get_videos } from "../../actions/videos.action";
import "./AdminHome.css";

const AdminHome = (props) => {
  const scrollRef = useRef(null);
  const [videos, setVideos] = useState();

  useEffect(() => {
    console.log("calling useEffect()");
    props.get_videos();
  }, []);

  const onRightNavigationClick = (e) => {
    e.preventDefault();
    if (isNaN(scrollRef.current.scrollRight)) {
      scrollRef.current.scrollRight = 20;
    } else {
      scrollRef.current.scrollRight += 20;
    }
    console.log("inside right - ", scrollRef.current);
  };

  const onLeftNavigationClick = (e) => {
    e.preventDefault();
    if (scrollRef) {
      scrollRef.current.scrollLeft -= 10;
      console.log("inside left");
    }
  };

  const onVideoClick = (item) => {
    console.log("onVideoClick() - ", item);
  };

  return (
    <Content id="admin-home" className="sub-component-parent-layout">
      {/* Start - All Categories */}
      <label className="horizontal-layout-header">All</label>
      <div className="horizontal-layout">
        <LeftOutlined
          className="navigation-icon"
          onClick={onLeftNavigationClick}
        />
        <div className="custom-row">
          {props.videos.videos.length > 0 &&
            props.videos.videos.map((item) => (
              <div
                key={item._id}
                className="block"
                onClick={() => onVideoClick(item)}
              >
                <Image
                  cloudName="mern-ott"
                  publicId={item.thumbnailPublicId}
                  crop="scale"
                  height={138}
                  width={246}
                />
                <span className="video-name">{item.title}</span>
              </div>
            ))}
        </div>
        <RightOutlined
          className="navigation-icon"
          onClick={onRightNavigationClick}
        />
      </div>
      {/* End - All Categories */}
    </Content>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  videos: state.videos,
});

export default connect(mapStateToProps, { get_videos })(AdminHome);
