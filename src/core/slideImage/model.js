class ImageModel {
  index;
  url;
  thumbnail;
  type;

  setIndex(val) {
    this.index = val;
    return this;
  }
  setUrl(val) {
    this.url = val;
    return this;
  }
  setThumbnail(val) {
    this.thumbnail = val;
    return this;
  }
  setType(val) {
    this.type = val;
    return this;
  }
}

export { ImageModel };
