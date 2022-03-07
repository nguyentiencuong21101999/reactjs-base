class ModelView {
    foodId;

    get foodId() { return this.proId; }
    set foodId(val) { this.proId = val; }
}

class ModelRequest {
}

export { ModelView, ModelRequest }