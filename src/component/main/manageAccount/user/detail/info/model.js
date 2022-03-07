class ModelView {
    userId;
    userType;
    
    get userId() { return this.userId; }
    set userId(val) { this.userId = val; }
    
    get userType() { return this.userType; }
    set userType(val) { this.userType = val; }
}

class ModelRequest{
    userId;
    userType;
    
    setUserId(val) { this.userId = val; return this; }
    setUserType(val) { this.userType = val; return this; }
}

export { ModelView, ModelRequest }