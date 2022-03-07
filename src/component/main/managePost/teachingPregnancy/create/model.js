class ModelView {
    photos="";
    title="";
    summary="";
    content="";
    pregnancySubject="";
    pregnancyMonth=""

    get photos() { return this.photos; }
    set photos(val) { this.photos = val; }

    get title() { return this.title; }
    set title(val) { this.title = val; }

    get summary() { return this.summary; }
    set summary(val) { this.summary = val; }

    get content() { return this.content; }
    set content(val) { this.content = val; }

    get pregnancySubject() { return this.pregnancySubject; }
    set pregnancySubject(val) { this.pregnancySubject = val; }

    get pregnancyMonth() { return this.pregnancyMonth; }
    set pregnancyMonth(val) { this.pregnancyMonth = val; }



  



}

class ModelRequest {
    photos;
    title;
    summary;
    content;
    pregnancySubject;
    pregnancyMonth;


    setPhotos(val) { this.photos = val; return this; }

    setTitle(val) { this.title = val; return this; }

    setSummary(val) { this.summary = val; return this; }

    setContent(val) { this.content = val; return this; }

    setPregnancySubject(val) { this.pregnancySubject = val; return this; }

    setPregnancyMonth(val) { this.pregnancyMonth = val; return this; }
}

export { ModelView, ModelRequest }