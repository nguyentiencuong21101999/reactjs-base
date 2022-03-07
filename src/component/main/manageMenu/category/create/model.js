class ModelView {
    photos="";
    menuCategoryName="";
    description="";
    menuCategoryType=""
    menuCategoryParentId=""

    get photos() { return this.photos; }
    set photos(val) { this.photos = val; }

    get menuCategoryName() { return this.menuCategoryName; }
    set menuCategoryName(val) { this.menuCategoryName = val; }

    get description() { return this.description; }
    set description(val) { this.description = val; }


    get menuCategoryType() { return this.menuCategoryType; }
    set menuCategoryType(val) { this.menuCategoryType = val; }

    get menuCategoryParentId() { return this.menuCategoryParentId; }
    set menuCategoryParentId(val) { this.menuCategoryParentId = val; }

  



}

class ModelRequest {
    photos;
    menuCategoryName;
    description;
    menuCategoryType
    menuCategoryParentId;


    setPhotos(val) { this.photos = val; return this; }

    setMenuCategoryName(val) { this.menuCategoryName = val; return this; }

    setDescription(val) { this.description = val; return this; }

    setMenuCategoryType(val) { this.menuCategoryType = val; return this; }

    setMenuCategoryParentId(val) { this.menuCategoryParentId = val; return this; }
}

export { ModelView, ModelRequest }