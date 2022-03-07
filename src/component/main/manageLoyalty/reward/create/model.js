class ModelView {
    photos="";
    proName="";
    isLimit="";
    exchangeCount=""
    exchangeLimit="";
    requirement="";
    proType="";
    note="";

    get photos() { return this.photos; }
    set photos(val) { this.photos = val; }

    get proName() { return this.proName; }
    set proName(val) { this.proName = val; }

    get isLimit() { return this.isLimit; }
    set isLimit(val) { this.isLimit = val; }


    get exchangeCount() { return this.exchangeCount; }
    set exchangeCount(val) { this.exchangeCount = val; }

    get exchangeLimit() { return this.exchangeLimit; }
    set exchangeLimit(val) { this.exchangeLimit = val; }

    get requirement() { return this.requirement; }
    set requirement(val) { this.requirement = val; }

    get proType() { return this.proType; }
    set proType(val) { this.proType = val; }

    get note() { return this.note; }
    set note(val) { this.note = val; }

  



}

class ModelRequest {
    photos;
    proName;
    isLimit;
    exchangeCount
    exchangeLimit;
    requirement;
    proType;
    note;


    setPhotos(val) { this.photos = val; return this; }

    setProName(val) { this.proName = val; return this; }

    setIsLimit(val) { this.isLimit = val; return this; }

    setExchangeCount(val) { this.exchangeCount = val; return this; }

    setExchangeLimit(val) { this.exchangeLimit = val; return this; }

    setRequirement(val) { this.requirement = val; return this; }

    setProType(val) { this.proType = val; return this; }

    setNote(val) { this.note = val; return this; }
}

export { ModelView, ModelRequest }