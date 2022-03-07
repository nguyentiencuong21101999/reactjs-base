class ModelView {
    menuSettingTargetType="";
    menuSettingBmiTarget="";
    target="";
    physicalCondition=""
    monthFrom="";
    monthTo="";

    get menuSettingTargetType() { return this.menuSettingTargetType; }
    set menuSettingTargetType(val) { this.menuSettingTargetType = val; }

    get menuSettingBmiTarget() { return this.menuSettingBmiTarget; }
    set menuSettingBmiTarget(val) { this.menuSettingBmiTarget = val; }

    get target() { return this.target; }
    set target(val) { this.target = val; }


    get physicalCondition() { return this.physicalCondition; }
    set physicalCondition(val) { this.physicalCondition = val; }

    get monthFrom() { return this.monthFrom; }
    set monthFrom(val) { this.monthFrom = val; }

    get monthTo() { return this.monthTo; }
    set monthTo(val) { this.monthTo = val; }


}
class ModelRequestNotRequired {
 
    monthTo;

    target(val) { this.target = val }
}
class ModelRequest {
    menuSettingId;
    menuSettingTargetType;
    menuSettingBmiTarget;
    target;
    physicalCondition;
    monthFrom;
    monthTo;


    setMenuSettingId(val) { this.menuSettingId = val; return this; }

    setMenuSettingTargetType(val) { this.menuSettingTargetType = val; return this; }

    setMenuSettingBmiTarget(val) { this.menuSettingBmiTarget = val; return this; }

    setTarget(val) { this.target = val; return this; }

    setPhysicalCondition(val) { this.physicalCondition = val; return this; }

    setMonthFrom(val) { this.monthFrom = val; return this; }

    setMonthTo(val) { this.monthTo = val; return this; }
}

export { ModelView, ModelRequest,ModelRequestNotRequired }