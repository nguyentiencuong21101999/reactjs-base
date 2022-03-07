class ModelView {
    gender="";
    dob="";
    username="";
    email="";
    fullName="";
    phoneNumber="";

    get gender() { return this.gender; }
    set gender(val) { this.gender = val; }

    get dob() { return this.dob; }
    set dob(val) { this.dob = val; }
    
    get username() { return this.username; }
    set username(val) { this.username = val; }
    
    get email() { return this.email; }
    set email(val) { this.email = val; }
    
    get fullName() { return this.fullName; }
    set fullName(val) { this.fullName = val; }
    
    get phoneNumber() { return this.phoneNumber; }
    set phoneNumber(val) { this.phoneNumber = val; }
    
    get phoneNumber() { return this.phoneNumber; }
    set phoneNumber(val) { this.phoneNumber = val; }
}

class ModelRequest{
    userId;
    gender;
    dob;
    username;
    email;
    fullName;
    phoneNumber

    setUserId(val) { this.userId = val; return this; }

    setGender(val) { this.gender = val; return this; }
    
    setDob(val) { this.dob = val; return this; }
    
    setUserName(val) { this.username = val; return this; }
    
    setEmail(val) { this.email = val; return this; }
    
    setFullName(val) { this.fullName = val; return this; }
    
    setPhoneNumber(val) { this.phoneNumber = val; return this; }
}

export { ModelView, ModelRequest }