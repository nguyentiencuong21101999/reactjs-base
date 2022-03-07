class ModelView {
    timeStart = "";
    timeEnd = "";
    targetMeijiId = "";
    content = "";
    directTo = "";

    get timeStart() { return this.timeStart; }
    set timeStart(val) { this.timeStart = val; }

    get timeEnd() { return this.timeEnd; }
    set timeEnd(val) { this.timeEnd = val; }

    get targetMeijiId() { return this.targetMeijiId; }
    set targetMeijiId(val) { this.targetMeijiId = val; }

    get content() { return this.content; }
    set content(val) { this.content = val; }

    get directTo() { return this.directTo; }
    set directTo(val) { this.directTo = val; }
}

class ModelRequest {
    bubbleId;
    timeStart;
    timeEnd;
    targetMeijiId;
    content;
    directTo;

    setBubbleId(val) { this.bubbleId = val; return this; }
    setTimeStart(val) { this.timeStart = val; return this; }
    setTimeEnd(val) { this.timeEnd = val; return this; }
    setTargetMeijiId(val) { this.targetMeijiId = val; return this; }
    setContent(val) { this.content = val; return this; }
    setDirectTo(val) { this.directTo = val; return this; }
}

export { ModelView, ModelRequest }