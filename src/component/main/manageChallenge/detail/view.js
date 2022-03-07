import React, { Fragment } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";

import RouteEnum from 'service/enum/route';
import DetailComponent from './info';
import EditComponent from './edit';
import ParticipantComponent from './participant';
import CreateMissionComponent from './info/createMission'
import CreateSubChallengeComponent from './info/createSubChallenge'
import DetailSubChallengeComponent from './info/detailSubChallenge/info'
import EditSubChallengeComponent from './info/detailSubChallenge/edit'
import DetailMissionComponent from './info/detailMission/info'
import CreateSettingPrizeComponent from './info/createSettingPrize'
import EditSettingPrizeComponent from './info/editSettingPrize'

const DetailChallengeHtml = () => {

    return (
        <Switch>
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL} component={DetailComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.EDIT} component={EditComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.PARTICIPANT} component={ParticipantComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE_MISSION} component={CreateMissionComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE_SUB_CHALLENGE} component={CreateSubChallengeComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL_SUB_CHALLENGE} component={DetailSubChallengeComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.EDIT_SUB_CHALLENGE} component={EditSubChallengeComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL_MISSION} component={DetailMissionComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE_SETTING_PRIZE} component={CreateSettingPrizeComponent} />
            <Route exact path={RouteEnum.PAGE.MANAGE_CHALLENGE.EDIT_SETTING_PRIZE} component={EditSettingPrizeComponent} />
            <Redirect to={RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL} />
        </Switch>
    )
}

export default DetailChallengeHtml;