class ModelView {
    title = "";
    photos = "";
    show = "";
    challengeType = "";
    startDate = "";
    endDate = "";
    content = "";
    targetMeijiId = "";
    summary =""
    resultType="";

    get title() { return this.title; }
    set title(val) { this.title = val; }

    get photo() { return this.photo; }
    set photo(val) { this.photo = val; }


    get challengeType() { return this.challengeType; }
    set challengeType(val) { this.challengeType = val; }

    get show() { return this.show; }
    set show(val) { this.show = val; }

    get startDate() { return this.startDate; }
    set startDate(val) { this.startDate = val; }

    get endDate() { return this.endDate; }
    set endDate(val) { this.endDate = val; }

    get content() { return this.content; }
    set content(val) { this.content = val; }

    get targetMeijiId() { return this.targetMeijiId; }
    set targetMeijiId(val) { this.targetMeijiId = val; }


    get resultType() { return this.resultType; }
    set resultType(val) { this.resultType = val; }

    get summary() { return this.summary; }
    set summary(val) { this.summary = val; }
}

class ModelRequest {
    challengeId;
    title;
    photos;
    show;
    challengeType;
    startDate;
    endDate;
    content;
    targetMeijiId;
    summary;
    resultType;

    setChallengeId(val) { this.challengeId = val; return this; }

    setTitle(val) { this.title = val; return this; }

    setPhotos(val) { this.photos = val; return this; }

    setShow(val) { this.show = val; return this; }

    setChallengeType(val) { this.challengeType = val; return this; }

    setStartDate(val) { this.startDate = val; return this; }

    setEndDate(val) { this.endDate = val; return this; }

    setContent(val) { this.content = val; return this; }

    setTargetMeijiId(val) { this.targetMeijiId = val; return this; }
    
    setSummary(val) { this.summary = val; return this; }

    setResultType(val) { this.resultType = val; return this; }
}

export { ModelView, ModelRequest }