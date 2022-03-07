class ModelView {
    name="";
    icon="";
    targetMeijiId="";
    status=""
   

    get name() { return this.name; }
    set name(val) { this.name = val; }

    get icon() { return this.icon; }
    set icon(val) { this.icon = val; }

    get targetMeijiId() { return this.targetMeijiId; }
    set targetMeijiId(val) { this.targetMeijiId = val; }


    get status() { return this.status; }
    set status(val) { this.status = val; }


  



}

class ModelRequest {
   
    name;
    icon;
    targetMeijiId;
    status;

    setName(val) { this.name = val; return this; }

    setIcon(val) { this.icon = val; return this; }

    setTargetMeijiId(val) { this.targetMeijiId = val; return this; }

    setStatus(val) { this.status = val; return this; }

   
}

export { ModelView, ModelRequest }