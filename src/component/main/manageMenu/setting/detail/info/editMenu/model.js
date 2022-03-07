class ModelView {
    breakfast="";
    lunch="";
    dinner="";
    firstSnack=""
    secondSnack="";


    get breakfast() { return this.breakfast; }
    set breakfast(val) { this.breakfast = val; }

    get lunch() { return this.lunch; }
    set lunch(val) { this.lunch = val; }

    get dinner() { return this.dinner; }
    set dinner(val) { this.dinner = val; }


    get firstSnack() { return this.firstSnack; }
    set firstSnack(val) { this.firstSnack = val; }

    get secondSnack() { return this.secondSnack; }
    set secondSnack(val) { this.secondSnack = val; }

}

class ModelRequest {
    menuSettingId;
    menuSettingDay;
    breakfast;
    lunch;
    dinner;
    firstSnack
    secondSnack;

    setMenuSettingId(val) { this.menuSettingId = val; return this; }

    setMenuSettingDay(val) { this.menuSettingDay = val; return this; }

    setBreakfast(val) { this.breakfast = val; return this; }

    setLunch(val) { this.lunch = val; return this; }

    setDinner(val) { this.dinner = val; return this; }

    setFirstSnack(val) { this.firstSnack = val; return this; }

    setSecondSnack(val) { this.secondSnack = val; return this; }
}

export { ModelView, ModelRequest }