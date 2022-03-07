
import Localize from "service/localize";
const CATEGORY_TYPE = {
  ALL: -1,
  CATEGORY: 1,
  CLASSIFICATION: 2,
};

const CATEGORY_TYPE_PARSE = {
  [CATEGORY_TYPE.ALL]: Localize.getLocalize("LC_ALL"),
  [CATEGORY_TYPE.CATEGORY]: Localize.getLocalize("LC_CATALOG"),
  [CATEGORY_TYPE.CLASSIFICATION]: Localize.getLocalize("LC_CATEGORY"),
};

const FOOD = {
  ALL: -1,
  BREAKFAST: 1,
  LUNCH: 2,
  DINNER: 3,
  FIRST_SNACK: 4,
  SECOND_SNACK: 5,
};
const FOOD_PARSE = {
  [FOOD.ALL]: Localize.getLocalize("LC_ALL"),
  [FOOD.BREAKFAST]: Localize.getLocalize("LC_BREAKFAST"),
  [FOOD.LUNCH]: Localize.getLocalize("LC_LUNCH"),
  [FOOD.DINNER]: Localize.getLocalize("LC_DINNER"),
  [FOOD.FIRST_SNACK]: Localize.getLocalize("LC_SNACKS_1"),
  [FOOD.SECOND_SNACK]: Localize.getLocalize("LC_SNACKS_2"),
};
const FOOD_ENERGY_UNIT = {
  KCAL: 1,
};
const FOOD_ENERGY_UNIT_PARSE = {
  [FOOD_ENERGY_UNIT.KCAL]: Localize.getLocalize("LC_UNIT_KCAL"),
};
const FOOD_UNIT = {
  G: 1,
  MG: 2,
};
const FOOD_UNIT_PARSE = {
  [FOOD_UNIT.G]: Localize.getLocalize("LC_UNIT_G"),
  [FOOD_UNIT.MG]: Localize.getLocalize("LC_UNIT_MG"),
};

const FOOD_TIPS_STATUS = {
  SHOULD: 1,
  SHOULD_NOT: 2,
  CAREFUL: 3,
};
const FOOD_TIPS_STATUS_PARSE = {
  [FOOD_TIPS_STATUS.SHOULD]: Localize.getLocalize("LC_SHOULD"),
  [FOOD_TIPS_STATUS.SHOULD_NOT]: Localize.getLocalize("LC_SHOULD_NOT"),
  [FOOD_TIPS_STATUS.CAREFUL]: Localize.getLocalize("LC_CAREFULLY"),
};

const MENU_SETTING_DAY = {
  MONDAY: 2,
  TUESDAY: 3,
  WEDNESDAY: 4,
  THURSDAY: 5,
  FRIDAY: 6,
  SATURDAY: 7,
  SUNDAY: 8,
};
const MENU_SETTING_DAY_PARSE = {
  [MENU_SETTING_DAY.MONDAY]: `${Localize.getLocalize("LC_DAY")} 1`,
  [MENU_SETTING_DAY.TUESDAY]: `${Localize.getLocalize("LC_DAY")} 2`,
  [MENU_SETTING_DAY.WEDNESDAY]: `${Localize.getLocalize("LC_DAY")} 3`,
  [MENU_SETTING_DAY.THURSDAY]: `${Localize.getLocalize("LC_DAY")} 4`,
  [MENU_SETTING_DAY.FRIDAY]: `${Localize.getLocalize("LC_DAY")} 5`,
  [MENU_SETTING_DAY.SATURDAY]: `${Localize.getLocalize("LC_DAY")} 6`,
  [MENU_SETTING_DAY.SUNDAY]: `${Localize.getLocalize("LC_DAY")} 7`,
};

const MENU_SETTING_BMI_TARGET = {
  LIGHT_WEIGHT: 1,
  NORMAL: 2,
  OVER_WEIGHT: 3,
  NOT_BASED_ON_BMI: 4,
};
const MENU_SETTING_BMI_TARGET_PARSE = {
  [MENU_SETTING_BMI_TARGET.LIGHT_WEIGHT]: Localize.getLocalize("LC_LIGHT_WEIGHT"),
  [MENU_SETTING_BMI_TARGET.NORMAL]: Localize.getLocalize("LC_NORMAL"),
  [MENU_SETTING_BMI_TARGET.OVER_WEIGHT]: Localize.getLocalize("LC_OVERWEIGHT"),
  [MENU_SETTING_BMI_TARGET.NOT_BASED_ON_BMI]: Localize.getLocalize("LC_INDEPENDENT_BMI"),
};

const MENU_SETTING_TARGET_PHYSICAL_CONDITION = {
  HIGH_BLOOD_PRESSURE: 1,
  ANEMIA: 2,
  DIABETES: 3,
  FIRST_3_MONTHS: 4,
  MIDDLE_3_MONTHS: 5,
  LAST_3_MONTHS: 6,
};
const MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE = {
  [MENU_SETTING_TARGET_PHYSICAL_CONDITION.HIGH_BLOOD_PRESSURE]: Localize.getLocalize("LC_HIGH_BLOOD_PRESSURE"),
  [MENU_SETTING_TARGET_PHYSICAL_CONDITION.ANEMIA]: Localize.getLocalize("LC_ANEMIA"),
  [MENU_SETTING_TARGET_PHYSICAL_CONDITION.DIABETES]: Localize.getLocalize("LC_DIABETE"),
  [MENU_SETTING_TARGET_PHYSICAL_CONDITION.FIRST_3_MONTHS]: Localize.getLocalize("LC_FIRST_3_MONTHS"),
  [MENU_SETTING_TARGET_PHYSICAL_CONDITION.MIDDLE_3_MONTHS]: Localize.getLocalize("LC_MIDDLE_3_MONTHS"),
  [MENU_SETTING_TARGET_PHYSICAL_CONDITION.LAST_3_MONTHS]: Localize.getLocalize("LC_LAST_3_MONTHS"),
};
const MENU_SETTING_TARGET_TYPE = {
  ALL: -1,
  BABY: 1,
  MOM: 2,
};

const MENU_SETTING_TARGET_TYPE_PARSE = {
  [MENU_SETTING_TARGET_TYPE.ALL]: Localize.getLocalize("LC_ALL"),
  [MENU_SETTING_TARGET_TYPE.BABY]: Localize.getLocalize("LC_BABY"),
  [MENU_SETTING_TARGET_TYPE.MOM]: Localize.getLocalize("LC_MOM"),
};
class MenuEnum {
  static get CATEGORY_TYPE() {
    return CATEGORY_TYPE;
  }
  static get CATEGORY_TYPE_PARSE() {
    return CATEGORY_TYPE_PARSE;
  }
  static get FOOD() {
    return FOOD;
  }
  static get FOOD_PARSE() {
    return FOOD_PARSE;
  }
  static get FOOD_ENERGY_UNIT() {
    return FOOD_ENERGY_UNIT;
  }
  static get FOOD_ENERGY_UNIT_PARSE() {
    return FOOD_ENERGY_UNIT_PARSE;
  }
  static get FOOD_UNIT() {
    return FOOD_UNIT;
  }
  static get FOOD_UNIT_PARSE() {
    return FOOD_UNIT_PARSE;
  }
  static get FOOD_TIPS_STATUS() {
    return FOOD_TIPS_STATUS;
  }
  static get FOOD_TIPS_STATUS_PARSE() {
    return FOOD_TIPS_STATUS_PARSE;
  }

  static get MENU_SETTING_DAY() {
    return MENU_SETTING_DAY;
  }
  static get MENU_SETTING_DAY_PARSE() {
    return MENU_SETTING_DAY_PARSE;
  }

  static get MENU_SETTING_BMI_TARGET() {
    return MENU_SETTING_BMI_TARGET;
  }
  static get MENU_SETTING_BMI_TARGET_PARSE() {
    return MENU_SETTING_BMI_TARGET_PARSE;
  }
  static get MENU_SETTING_TARGET_PHYSICAL_CONDITION() {
    return MENU_SETTING_TARGET_PHYSICAL_CONDITION;
  }
  static get MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE() {
    return MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE;
  }
  static get MENU_SETTING_TARGET_TYPE() {
    return MENU_SETTING_TARGET_TYPE;
  }
  static get MENU_SETTING_TARGET_TYPE_PARSE() {
    return MENU_SETTING_TARGET_TYPE_PARSE;
  }
}

export default MenuEnum;
