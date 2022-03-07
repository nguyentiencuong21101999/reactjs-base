class ModelView {
    userId;

    get userId() { return this.userId; }
    set userId(val) { this.userId = val; }
}

class ModelRequest{
    userId;

    setUserId(val) { this.userId = val; return this; }
}

export { ModelView, ModelRequest }