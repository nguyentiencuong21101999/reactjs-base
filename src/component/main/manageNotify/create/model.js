class ModelView {
    channel = ""
    title = ""
    content = "";
    target = "";
    fileContent = ""


    get channel() { return this.channel; }
    set channel(val) { this.channel = val; }

    get title() { return this.title; }
    set title(val) { this.title = val; }

    get content() { return this.content; }
    set content(val) { this.content = val; }


    get target() { return this.target; }
    set target(val) { this.target = val; }

    get fileContent() { return this.fileContent; }
    set fileContent(val) { this.fileContent = val; }
}

class ModelRequestUpload {
    channel;
    fileContent;

    setChannel(val) { this.channel = val; return this; }

    setFileContent(val) { this.fileContent = val; return this; }


}
class ModelRequestCreate {
    channel;
    title;
    content;
    target;
    fileContent;

    setChannel(val) { this.channel = val; return this; }

    setTitle(val) { this.title = val; return this; }

    setContent(val) { this.content = val; return this; }
    
    setTarget(val) { this.channel = val; return this; }

    setFileContent(val) { this.fileContent = val; return this; }


}

export { ModelView, ModelRequestUpload }