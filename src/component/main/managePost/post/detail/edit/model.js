class ModelView {
    postId = "";
    title = "";
    photos = "";
    summary = "";
    topic = "";
    content = "";
    //know
    categoryId = "";
    show = "";
    startDate = "";
    endDate = "";
    toDoList = [""];
    showInInjectSchedule = "";
    //challenge 
    challengeByTopic = ""

    get postId() { return this.postId; }
    set postId(val) { this.postId = val; }

    get title() { return this.title; }
    set title(val) { this.title = val; }

    get photos() { return this.photos; }
    set photos(val) { this.photos = val; }

    get summary() { return this.summary; }
    set summary(val) { this.summary = val; }

    get topic() { return this.topic; }
    set topic(val) { this.topic = val; }

    get content() { return this.content; }
    set content(val) { this.content = val; }

    //know
    get categoryId() { return this.categoryId; }
    set categoryId(val) { this.categoryId = val; }

    get show() { return this.show; }
    set show(val) { this.show = val; }

    get startDate() { return this.startDate; }
    set startDate(val) { this.startDate = val; }

    get endDate() { return this.endDate; }
    set endDate(val) { this.endDate = val; }

    get toDoList() { return this.toDoList; }
    set toDoList(val) { this.toDoList = val; }

    get showInInjectSchedule() { return this.showInInjectSchedule; }
    set showInInjectSchedule(val) { this.showInInjectSchedule = val; }

    //challenge
    get challengeByTopic() { return this.challengeByTopic; }
    set challengeByTopic(val) { this.challengeByTopic = val; }
}

class ModelRequest {
    postId
    title;
    photos;
    summary;
    topic;
    content;
    //know
    categoryId;
    show;
    startDate;
    endDate;
    toDoList;
    showInInjectSchedule;
    //challenge
    challengeByTopic


    setPostId(val) { this.postId = val; return this; }

    setTitle(val) { this.title = val; return this; }

    setPhotos(val) { this.photos = val; return this; }

    setSummary(val) { this.summary = val; return this; }

    setTopic(val) { this.topic = val; return this; }

    setContent(val) { this.content = val; return this; }

    //know
    setCategoryId(val) { this.categoryId = val; return this; }

    setShow(val) { this.show = val; return this; }

    setStartDate(val) { this.startDate = val; return this; }

    setEndDate(val) { this.endDate = val; return this; }

    setToDoList(val) { this.toDoList = val; return this; }

    setShowInInjectSchedule(val) { this.showInInjectSchedule = val; return this; }

    //challenge
    setChallengeByTopic(val) { this.challengeByTopic = val; return this; }


}

class ModelRequestTargetPost {
    postId;
    target;

    setPostId(val) { this.postId = val; return this; }

    setTarget(val) { this.target = val; return this; }

}

export { ModelView, ModelRequest, ModelRequestTargetPost }