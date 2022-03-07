class ModelView {
    photos="";
    foodName="";
    ingredientsAndPreparation="";
    suitableFor=""
    menuCategoriesList="";
    subFoodList="";

    energy="";
    energyUnit="";

    protein="";
    proteinUnit="";

    lipid="";
    lipidUnit="";

    glucid="";
    glucidUnit="";

    canxi="";
    canxiUnit="";

    iron="";
    ironUnit="";
    
    salt="";
    saltUnit="";

    additionalInfo=""
    postpartumTips=""
    breastfeedingTips=""
    youngChildrenTips=""
    pregnancyTips=""

    cookingSteps=""
    tips=""



    get photos() { return this.photos; }
    set photos(val) { this.photos = val; }

    get foodName() { return this.foodName; }
    set proName(val) { this.foodName = val; }

    get ingredientsAndPreparation() { return this.ingredientsAndPreparation; }
    set ingredientsAndPreparation(val) { this.ingredientsAndPreparation = val; }


    get suitableFor() { return this.suitableFor; }
    set suitableFor(val) { this.suitableFor = val; }

    get menuCategoriesList() { return this.menuCategoriesList; }
    set menuCategoriesList(val) { this.menuCategoriesList = val; }

    get subFoodList() { return this.subFoodList; }
    set subFoodList(val) { this.subFoodList = val; }

    get energy() { return this.energy; }
    set energy(val) { this.energy = val; }
    get energyUnit() { return this.energyUnit; }
    set energyUnit(val) { this.energyUnit = val; }

    get protein() { return this.protein; }
    set protein(val) { this.protein = val; }
    get proteinUnit() { return this.proteinUnit; }
    set proteinUnit(val) { this.proteinUnit = val; }


    get lipid() { return this.lipid; }
    set lipid(val) { this.lipid = val; }
    get lipidUnit() { return this.lipidUnit; }
    set lipidUnit(val) { this.lipidUnit = val; }

    get glucid() { return this.glucid; }
    set glucid(val) { this.glucid = val; }
    get glucidUnit() { return this.glucidUnit; }
    set glucidUnit(val) { this.glucidUnit = val; }

    get canxi() { return this.canxi; }
    set canxi(val) { this.canxi = val; }
    get canxiUnit() { return this.canxiUnit; }
    set canxiUnit(val) { this.canxiUnit = val; }

    get iron() { return this.iron; }
    set iron(val) { this.iron = val; }
    get ironUnit() { return this.ironUnit; }
    set ironUnit(val) { this.ironUnit = val; }

    get salt() { return this.salt; }
    set salt(val) { this.salt = val; }
    get saltUnit() { return this.saltUnit; }
    set saltUnit(val) { this.saltUnit = val; }
  
    get additionalInfo() { return this.additionalInfo; }
    set additionalInfo(val) { this.additionalInfo = val; }


    get postpartumTips() { return this.postpartumTips; }
    set postpartumTips(val) { this.postpartumTips = val; }

    get breastfeedingTips() { return this.breastfeedingTips; }
    set breastfeedingTips(val) { this.breastfeedingTips = val; }

    get youngChildrenTips() { return this.youngChildrenTips; }
    set youngChildrenTips(val) { this.youngChildrenTips = val; }

    get pregnancyTips() { return this.pregnancyTips; }
    set pregnancyTips(val) { this.pregnancyTips = val; }

    get cookingSteps() { return this.cookingSteps; }
    set cookingSteps(val) { this.cookingSteps = val; }

    get tips() { return this.tips; }
    set tips(val) { this.tips = val; }
}
class ModelViewNotRequired {

    protein = false;
    lipid = false;
    glucid = false;
    canxi = false;
    iron = false;
    salt = false;


    get protein() { return this.protein; }
    set protein(val) { this.protein = val; }

    get proteinUnit() { return this.proteinUnit; }
    set proteinUnit(val) { this.proteinUnit = val; }


    get lipid() { return this.lipid; }
    set lipid(val) { this.lipid = val; }
    get lipidUnit() { return this.lipidUnit; }
    set lipidUnit(val) { this.lipidUnit = val; }

    get glucid() { return this.glucid; }
    set glucid(val) { this.glucid = val; }
    get glucidUnit() { return this.glucidUnit; }
    set glucidUnit(val) { this.glucidUnit = val; }

    get canxi() { return this.canxi; }
    set canxi(val) { this.canxi = val; }
    get canxiUnit() { return this.canxiUnit; }
    set canxiUnit(val) { this.canxiUnit = val; }

    get iron() { return this.iron; }
    set iron(val) { this.iron = val; }
    get ironUnit() { return this.ironUnit; }
    set ironUnit(val) { this.ironUnit = val; }

    get salt() { return this.salt; }
    set salt(val) { this.salt = val; }
    get saltUnit() { return this.saltUnit; }
    set saltUnit(val) { this.saltUnit = val; }

}
class ModelRequest {
    foodId;
    photos;
    foodName;
    ingredientsAndPreparation;
    suitableFor
    menuCategoriesList;
    subFoodList;

    energy;
    energyUnit;

    protein;
    proteinUnit;

    lipid;
    lipidUnit;

    glucid;
    glucidUnit;

    canxi;
    canxiUnit;

    iron;
    ironUnit;
    
    salt;
    saltUnit;

    additionalInfo
    postpartumTips
    breastfeedingTips
    youngChildrenTips
    pregnancyTips

    cookingSteps
    tips

    setFoodId(val) { this.foodId = val; return this; }

    setPhotos(val) { this.photos = val; return this; }

    setFoodName(val) { this.foodName = val; return this; }

    setIngredientsAndPreparation(val) { this.ingredientsAndPreparation = val; return this; }

    setSuitableFor(val) { this.suitableFor = val; return this; }

    setMenuCategoriesList(val) { this.menuCategoriesList = val; return this; }
    
    setSubFoodList(val) { this.subFoodList = val; return this; }

    setEnergy(val) { this.energy = val; return this; }
    setEnergyUnit(val) { this.energyUnit = val; return this; }

    setProtein(val) { this.protein = val; return this; }
    setProteinUnit(val) { this.proteinUnit = val; return this; }

    setLipid(val) { this.lipid = val; return this; }
    setLipidUnit(val) { this.lipidUnit = val; return this; }

    setGlucid(val) { this.glucid = val; return this; }
    setGlucidUnit(val) { this.glucidUnit = val; return this; }

    setCanxi(val) { this.canxi = val; return this; }
    setCanxiUnit(val) { this.canxiUnit = val; return this; }

    setIron(val) { this.iron = val; return this; }
    setIronUnit(val) { this.ironUnit = val; return this; }

    setSalt(val) { this.salt = val; return this; }
    setSaltUnit(val) { this.saltUnit = val; return this; }

    setAdditionalInfo(val) { this.additionalInfo = val; return this; }
    setPostpartumTips(val) { this.postpartumTips = val; return this; }
    setBreastfeedingTips(val) { this.breastfeedingTips = val; return this; }
    setYoungChildrenTips(val) { this.youngChildrenTips = val; return this; }
    setPregnancyTips(val) { this.pregnancyTips = val; return this; }
    setCookingSteps(val) { this.cookingSteps = val; return this; }
    setTips(val) { this.tips = val; return this; }

   
}

export { ModelView, ModelRequest,ModelViewNotRequired }