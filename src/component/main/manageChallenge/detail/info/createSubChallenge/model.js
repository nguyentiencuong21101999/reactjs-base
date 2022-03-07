class ModelView {
    title = "";
    mainChallenge = "";
    note = "";
    point = "";
    linkUrl = "";


    get title() { return this.title; }
    set title(val) { this.title = val; }

    get mainChallenge() { return this.mainChallenge; }
    set mainChallenge(val) { this.mainChallenge = val; }

    get note() { return this.note; }
    set note(val) { this.note = val; }

    get point() { return this.point; }
    set point(val) { this.point = val; }

    get linkUrl() { return this.linkUrl; }
    set linkUrl(val) { this.linkUrl = val; }
}

class ModelRequest {
    title;
    mainChallenge;
    note;
    point;
    linkUrl;

    setTitle(val) { this.title = val; return this; }

    setMainChallenge(val) { this.mainChallenge = val; return this; }

    setNote(val) { this.note = val; return this; }

    setPoint(val) { this.point = val; return this; }

    setLinkUrl(val) { this.linkUrl = val; return this; }

    setMainChallenge(val) { this.mainChallenge = val; return this; }

}

export { ModelView, ModelRequest }