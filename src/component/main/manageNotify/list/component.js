import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import View from "./view";
import ModelTable from "core/table/model";
import NotifyEnum from "service/enum/notify";
import SearchEnum from "service/enum/search";
import RouteEnum from "service/enum/route";

import Helper from "service/helper";
import { ModelView } from "./model";
import Localize from "service/localize";
class ListNotifyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      ui: {
        listOrderBy: [
          {
            text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.DESC],
            value: SearchEnum.FILTER.DESC,
          },
          {
            text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.ASC],
            value: SearchEnum.FILTER.ASC,
          },
        ],
        defaultOrderBy: {},
        listStatus: [
          {
            text: NotifyEnum.FILTER_PARSE[NotifyEnum.FILTER.ALL],
            value: NotifyEnum.FILTER.ALL,
          },
          {
            text: NotifyEnum.FILTER_PARSE[NotifyEnum.FILTER.DEVICE],
            value: NotifyEnum.FILTER.DEVICE,
          },
          {
            text: NotifyEnum.FILTER_PARSE[NotifyEnum.FILTER.EMAIL],
            value: NotifyEnum.FILTER.EMAIL,
          },
          {
            text: NotifyEnum.FILTER_PARSE[NotifyEnum.FILTER.SMS],
            value: NotifyEnum.FILTER.SMS,
          },
        ],
        defaultStatus: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_TITLE"),
            value: "notification.title",
          },
          {
            text: Localize.getLocalize("LC_CONTENT"),
            value: "notification.content",
          },
        ],
        defaultSearch: {},
        dataTable: null,
        searchInput: null,
        list: null,
        searchValue: "",
        resetPage: true,
        tab: {
          current: 1,
          created: 1,
          received: 2,
        },
        total: 0,
      },
      func: {
      },
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        type: React.createRef(),
        filter: React.createRef(),
        search: React.createRef(),
      },
    };

    this.handleOnChangeTableValue = this.handleOnChangeTableValue.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this);
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this);
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this);
    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleSetData = this.handleSetData.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("ListNotifyComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { state } = this.props.location
      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)

      ui.defaultOrderBy = ui.listOrderBy[0];
      ui.defaultStatus = ui.listStatus[0];
      ui.defaultSearch = ui.listSearch[0];
      ui.searchInput = ui.defaultSearch.value;

      ui.dataTable = new ModelTable().setOrder("createdAt").setBy("desc");
      ui.dataTable.type = [1];
      data["search"] = "notification.title";
      data["filterValue"] = undefined;
    } catch (e) {
      Logger.error(`ListNotifyComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("ListNotifyComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`ListNotifyComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("ListNotifyComponent execute handleRequest");
      const { ui, timeout } = this.state;
    } catch (e) {
      Logger.error(`ListNotifyComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListNotifyComponent execute handleOnChangeTableValue");
      Logger.debug("ListNotifyComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state;
      ui.list = null;
      ui.resetPage = false
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListNotifyComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state;
      ref[name] = element;
      if (name === "username") {
        ref[name].focus();
      }
    } catch (e) {
      Logger.error(`ListNotifyComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("ListNotifyComponent execute handleOnChange");
      Logger.debug("ListNotifyComponent execute handleOnChange receive name", name);
      Logger.debug("ListNotifyComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      switch (name) {
        case 'by':
        case 'filter':
        case 'filterValue':
          data[name] = value
          break;
        case 'search':
        case 'searchValue':
          data[name] = value
          break;
      };
    } catch (e) {
      Logger.error(`ListNotifyComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info("ListNotifyComponent execute handleOnChangeSearch");
      Logger.debug("ListNotifyComponent execute handleOnChangeSearch receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      ui.searchInput = value;
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListNotifyComponent handleOnChangeSearch ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info("ListNotifyComponent execute handleOnChangeSearchValue");
      Logger.debug("ListNotifyComponent execute handleOnChangeSearchValue receive value", value);

      const { ui } = this.state;
      ui.searchValue = !Helper.isEmpty(value) ? value : "";
      let temp = !Helper.isEmpty(value) ? value : null;
      this.handleOnChange("searchValue", temp);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListNotifyComponent handleOnChangeSearchValue ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeStatus(event, value) {
    try {
      Logger.info("ListNotifyComponent execute handleOnChangeStatus");
      Logger.debug("ListNotifyComponent execute handleOnChangeStatus receive value", value);
      if (event) {
        event.preventDefault();
      }

      const { ui } = this.state;
      if (value === NotifyEnum.FILTER.ALL) {
        this.handleOnChange('filter', undefined)
        this.handleOnChange('filterValue', undefined)
      } else {
        this.handleOnChange('filter', 'notification.channel')
        this.handleOnChange('filterValue', value)
      }
      ui.defaultStatus = ui.listStatus.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListNotifyComponent handleOnChangeStatus ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info("ListNotifyComponent execute handleOnChangeOrderBy");
      Logger.debug("ListNotifyComponent execute handleOnChangeOrderBy receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListNotifyComponent handleOnChangeOrderBy ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListNotifyComponent execute handleSetData");
      Logger.debug("ListNotifyComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      Logger.debug("ListNotifyComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`ListNotifyComponent handleSetData ${e.toString()}`);
    }
  }


  handleSubmitSearch(event) {
    try {
      Logger.info("ListNotifyComponent execute handleSubmitSearch");
      if (event) {
        event.preventDefault();
      }
      const { ui, data } = this.state;
      ui.list = null;
      ui.resetPage = true
      let temp = { ...data };
      if (Helper.isEmpty(temp['searchValue'])) {
        temp['search'] = undefined
        temp['searchValue'] = undefined
      }
      ui.dataTable = ui.dataTable.setFilter(temp.filter)
        .setFilterValue(temp.filterValue)
        .setSearch(temp.search)
        .setSearchValue(temp.searchValue)
        .setBy(temp.by)
        .setFrom(0)
      Logger.debug("ListNotifyComponent execute handleSubmitSearch data", data);
      Logger.debug("ListNotifyComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListNotifyComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info("ListNotifyComponent execute handleCreate");
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_NOTIFY.CREATE, { tab: ui.tab.current });
    } catch (e) {
      Logger.error(`ListNotifyComponent handleCreate ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info("ListNotifyComponent execute handleRedirectDetail");
      Logger.debug("ListNotifyComponent execute handleRedirectDetail recieve item", item);
      const { ui } = this.state;
      let route = RouteEnum.PAGE.MANAGE_NOTIFY.DETAIL;
      const path = route.replace(":id", item.notificationId);
      item.tab = ui.tab.current
      this.handleRedirectWithState(path, item);
    } catch (e) {
      Logger.error(`ListNotifyComponent handleRedirectDetail ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleChangeTab(event, value) {
    try {
      Logger.info("ListNotifyComponent execute handleChangeTab");
      Logger.debug("ListNotifyComponent execute handleChangeTab recieve value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      switch (value) {
        case `${ui.tab.created}`:
          ui.tab.current = ui.tab.created;
          break;
        case `${ui.tab.received}`:
          ui.tab.current = ui.tab.received;
          break;
      }
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListNotifyComponent handleChangeTab ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  render() {
    const { ui, timeout } = this.state;
    return <View ui={ui} handleOnChangeTableValue={this.handleOnChangeTableValue} timeout={timeout} handleOnChangeSearch={this.handleOnChangeSearch} handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeOrderBy={this.handleOnChangeOrderBy} handleOnChangeSearchValue={this.handleOnChangeSearchValue} handleOnRef={this.handleOnRef} handleSetData={this.handleSetData} handleSubmitSearch={this.handleSubmitSearch} handleCreate={this.handleCreate} handleRedirectDetail={this.handleRedirectDetail} handleChangeTab={this.handleChangeTab} />;
  }
}

export default BaseComponent(ListNotifyComponent);
