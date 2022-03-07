import React, {useState} from 'react';
import { Redirect, Switch, Route } from "react-router-dom";
import { experimentalStyled } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import RouteEnum from 'service/enum/route';
import Navbar from 'component/layout/navbar';
import Sidebar from 'component/layout/sidebar';

import DialogComponent from 'component/layout/dialog'
import ToastComponent from 'component/layout/toast'

import DashboardComponent from "./dashboard"
import ManageAccountComponent from "./manageAccount"
import ManagePostComponent from "./managePost"
import ProfileComponent from "./profile"
import ManageNotifyComponent from "./manageNotify"
import ManageChallengeComponent from './manageChallenge'
import ManageLoyaltyComponent from './manageLoyalty'
import ManageSettingComponent from './manageSetting'
import ManageMenuComponent from './manageMenu'

const LayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: '#fafafa',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const LayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const LayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const LayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'hidden'
});

const View = (props) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <SnackbarProvider>
    <LayoutRoot>
      <Navbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <Sidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>
            <Switch>
                <Route  exact path={RouteEnum.PAGE.DASHBOARD} component={DashboardComponent}/>
                <Route exact path={RouteEnum.PAGE.PROFILE} component={ProfileComponent} />
                <Route path={RouteEnum.PAGE.MANAGE_ACCOUNT._} component={ManageAccountComponent} />
                <Route path={RouteEnum.PAGE.MANAGE_POST._} component={ManagePostComponent} />
                <Route path={RouteEnum.PAGE.MANAGE_NOTIFY._} component={ManageNotifyComponent} />
                <Route path={RouteEnum.PAGE.MANAGE_CHALLENGE._} component={ManageChallengeComponent} />
                <Route path={RouteEnum.PAGE.MANAGE_LOYALTY._} component={ManageLoyaltyComponent} />
                <Route path={RouteEnum.PAGE.MANAGE_SETTING._} component={ManageSettingComponent} />
                <Route path={RouteEnum.PAGE.MANAGE_MENU._} component={ManageMenuComponent} />
                <Redirect to={RouteEnum.PAGE.DASHBOARD} />
            </Switch>
          </LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
    <DialogComponent />
    <ToastComponent />
    </SnackbarProvider>
  );
};

export default View;
