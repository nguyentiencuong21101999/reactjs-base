import React from 'react'
import styled from '@emotion/styled'
import Logger from 'service/logger'
import RouteEnum from "service/enum/route";
import { GENERAL } from "core/color";
import Auth from 'service/auth'


import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Helper from 'service/helper'
// const Container = styled.div`
//     ul{
//         display: flex;
//         margin-left: 10px;
//         li{
//             list-style: none;
//             cursor: pointer;
//             letter-spacing: 0.32px;
//             color: ${GENERAL.GRAY1};
//             font-size: 18px;
//             &:not(:nth-of-type(1)){
//                     &:before{
//                         content: ">";
//                         margin: 0 5px;
//                         color: ${GENERAL.GRAY1};
//                 }
//             }
//             &.active{
//                 color: ${GENERAL.BLACK};
//             }
//         }
//     }
// `;
class Breadcrumb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ui: {
        list: [],
        listKey: [],
        path: "",
        breadcrumb: [],
      }
    }

    this.handleBreadcrumb = this.handleBreadcrumb.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleAddHomeBreadcrumb = this.handleAddHomeBreadcrumb.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.handleBreadcrumb()

    this.unlisten = this.props.history.listen((location, action) => {
      this.handleBreadcrumb()
    });
  }

  componentWillUnmount() {
    this.unlisten()
  }

  handleBreadcrumb() {
    try {
      Logger.info('BreadcrumbComponent execute handleBreadcrumb')
      const { ui } = this.state
      const { history } = this.props
      ui.breadcrumb = RouteEnum.BREADCRUMB
      ui.path = history.location.pathname;
      
      Logger.debug(`BreadcrumbComponent execute handleBreadcrumb receive breadcrumb`, ui.breadcrumb);
      Logger.debug(`BreadcrumbComponent handleBreadcrumb Receive location`, ui.path)
      let temp = ui.path.split("/");
      temp.shift();
      Logger.debug(`BreadcrumbComponent handleBreadcrumb Receive temp`, temp)
      let value = "";
      let str = "";
      let tempID = null;
      let arrTemp = []
      temp.forEach((item, index) => {
        str = str + "/" + item;
        let tempStr = String(str)
        let tempPath
        if (ui.breadcrumb.hasOwnProperty(tempStr)) {
          tempPath = tempStr
        } else {
          tempID = item;
          tempPath = tempStr.replace(item, ":id")
        }
        if (tempID) {
          str = tempStr.replace(":id", tempID)
        } else {
          str = tempStr
        }
        value = index === 0 ? ui.breadcrumb[tempPath] : value + "/" + ui.breadcrumb[tempPath];
        arrTemp.push({ value: str.toString(), text: tempPath })
        str = tempPath
      });
      Logger.debug(`BreadcrumbComponent handleBreadcrumb Receive value`, value)
      ui.list =!Helper.isEmpty(value) ? value.split("/") : []
      // Logger.debug(`BreadcrumbComponent handleBreadcrumb Receive list`, ui.list)
      ui.listKey = arrTemp
      // // Logger.debug(`BreadcrumbComponent handleBreadcrumb Receive listKey`, ui.listKey)

      // this.handleAddHomeBreadcrumb()
      this.setState({ ui })
    } catch (e) {
      Logger.error(`BreadcrumbComponent handleBreadcrumb ${e.toString()}`)
    }
  }

  handleRedirect(e, item, index) {
    try {
      Logger.info(`Breadcrumb handleRedirect`)
      Logger.debug(`Breadcrumb handleRedirect Receive item`, item)
      e.preventDefault()
      const { ui } = this.state
      let temp = ui.listKey[index].value
      Logger.debug(`Breadcrumb handleRedirect Receive list`, ui.listKey)
      Logger.debug(`Breadcrumb handleRedirect Receive item`, temp)
      const { history } = this.props
      let path = temp === "/home" ? Auth.getRedirect() : temp
      history.push({
        pathname: path,
        state: history.location.state
      })
    } catch (e) {
      Logger.error(`BreadcrumbComponent handleRedirect ${e.message.toString()}`)
    }
  }

  handleAddHomeBreadcrumb() {
    try {
      Logger.info(`Breadcrumb handleAddHomeBreadcrumb`)
      const { ui } = this.state
      ui.list.unshift(ui.breadcrumb["/home"])
      ui.listKey.unshift({ value: "/home", text: "/home" })
      Logger.debug(`BreadcrumbComponent handleBreadcrumb Receive list`, ui.list)
      Logger.debug(`BreadcrumbComponent handleBreadcrumb Receive listKey`, ui.listKey)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`BreadcrumbComponent handleAddHomeBreadcrumb ${e.message.toString()}`)
    }
  }

  render() {
    const { ui } = this.state

    return (
      // <Container>
      //     <ul data-test-id="breadcrumb">
      //         {ui.list.map(( item, index )=>{
      //           
      //             return (
      //                 <li key={index} className={ui.path === ui.listKey[index].value ? "active" : null}
      //                     onClick={event=> this.handleRedirect(event, item, index)}>
      //                     {item}
      //                 </li>
      //             )
      //         })}
      //     </ul>
      // </Container>
      <div role="presentation" style={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb" data-test-id="breadcrumb" sx={{ marginLeft: '10px' }}>
          {ui.list.map((item, index) => {
            return (
              <Link    key={index} color={ui.path === ui.listKey[index].value ? "primary.main" : "inherit"}
                // onClick={event => this.handleRedirect(event, item, index)}
                onClick={event => { event.preventDefault() }}
                sx={{ textDecoration:"none", letterSpacing: '0.32px', fontSize: '18px' }}
              >
                {item}
              </Link>
            )
          })}
        </Breadcrumbs>
      </div>
    )
  }

}

export default Breadcrumb
