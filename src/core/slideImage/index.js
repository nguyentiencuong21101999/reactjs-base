import React, { useEffect, useState, createRef } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
// import { Gallery, Item } from 'react-photoswipe-gallery'
// import "photoswipe/dist/photoswipe.css";
// import "photoswipe/dist/default-skin/default-skin.css";
import ReactImageVideoLightbox from "react-image-video-lightbox";
import Config from "config";
import { PlayCircleFilledWhite } from "@material-ui/icons";
import { ImageModel } from "core/slideImage/model";
const styleSlideImage = {
  top: "0px",
  left: "0px",
  overflow: "hidden",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(0,0,0,1)",
  zIndex: 1000,
};
const SlideImage = (props) => {
  const { item = [], styleBackground = {}, styleSlide = {} } = props;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [listImage, setListImage] = useState([]);

  const styles = (index, styleBackground) => {
    const style = index < 1 ? { display: "block" } : { display: "none" };
    return { ...styleBackground, ...style };
  };
  useEffect(() => {
    const listImages = [];
    if (item.length > 0) {
      item.map((element, index) => {
        const images = new ImageModel()
          .setIndex(index)
          .setUrl(element)
          .setType(element.indexOf(Config.bucketVideo) < 0 ? "photo" : "video");
        listImages.push(images);
      });
    }
    setListImage(listImages);
  }, []);

  return listImage.length > 0 ? (
    <div>
      {listImage[0].url.indexOf(Config.bucketVideo) < 0 ? (
        <img style={{ cursor: "pointer" }} width="80" height="60" onClick={() => setIsOpen(true)} src={listImage[0].url} />
      ) : (
        <PlayCircleFilledWhite
          onClick={() => setIsOpen(true)}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
        />
      )}

      {isOpen && (
        <div style={styleSlideImage}>
          <ReactImageVideoLightbox data={listImage} startIndex={photoIndex} showResourceCount={true} onCloseCallback={() => setIsOpen(false)} onNavigationCallback={(photoIndex) => console.log(`Current index: ${photoIndex}`)} />
        </div>
      )}
    </div>
  ) : (
    "-"
  );
};

export default SlideImage;
