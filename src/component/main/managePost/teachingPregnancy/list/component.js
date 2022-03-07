import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import CategoryEnum from 'service/enum/category'
import SearchEnum from 'service/enum/search'
import RouteEnum from 'service/enum/route'
import TeachingPregnancyEnum from 'service/enum/teachingPregnancy'

import Helper from 'service/helper'
import { ModelView } from './model'
import HelperService from 'service/helper'
import Localize from 'service/localize'
class ListTeachingPregnancyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
        listOrderBy: [{
          text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.DESC],
          value: SearchEnum.FILTER.DESC
        },
        {
          text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.ASC],
          value: SearchEnum.FILTER.ASC
        }
        ],
        defaultOrderBy: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_TITLE"),
            value: 'pregnancyPost.pregnancyMonth'
          },
        ],
        listStatus: [
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.ALL],
            value: TeachingPregnancyEnum.MONTH.ALL
          },
          {
            text: TeachingPregnancyEnum.MONTH.FIRST,
            value: TeachingPregnancyEnum.MONTH.FIRST
          },
          {
            text: TeachingPregnancyEnum.MONTH.SECOND,
            value: TeachingPregnancyEnum.MONTH.SECOND
          },
          {
            text: TeachingPregnancyEnum.MONTH.THIRD,
            value: TeachingPregnancyEnum.MONTH.THIRD
          },
          {
            text: TeachingPregnancyEnum.MONTH.FOURTH,
            value: TeachingPregnancyEnum.MONTH.FOURTH
          },
          {
            text: TeachingPregnancyEnum.MONTH.FIFTH,
            value: TeachingPregnancyEnum.MONTH.FIFTH
          },
          {
            text: TeachingPregnancyEnum.MONTH.SIXTH,
            value: TeachingPregnancyEnum.MONTH.SIXTH
          },
          {
            text: TeachingPregnancyEnum.MONTH.SEVENTH,
            value: TeachingPregnancyEnum.MONTH.SEVENTH
          },
          {
            text: TeachingPregnancyEnum.MONTH.EIGHTH,
            value: TeachingPregnancyEnum.MONTH.EIGHTH
          },
          {
            text: TeachingPregnancyEnum.MONTH.NINTH,
            value: TeachingPregnancyEnum.MONTH.NINTH
          },
          {
            text: TeachingPregnancyEnum.MONTH.TENTH,
            value: TeachingPregnancyEnum.MONTH.TENTH
          },

        ],
        defaultStatus: {},
        defaultSearch: {},
        resetPage: true,
        dataTable: null,
        searchInput: null,
        list: null,
        searchValue: "",
        tab: {
          current: 1,
          user: 1,
          admin: 2,
        },
        total: 3,
      },
      func: {
        handleSystemError: this.handleSystemError.bind(this),
      },
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        type: React.createRef(),
        filter: React.createRef(),
        search: React.createRef(),
      }
    }

    this.handleOnChangeTableValue = this.handleOnChangeTableValue.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this)
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this)
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this)
  }
  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListTeachingPregnancyComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state

      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.defaultStatus = ui.listStatus[0]
      ui.searchInput = ui.defaultSearch.value

      ui.dataTable = new ModelTable()
        .setOrder("modifiedAt")
        .setBy("desc")
      data['search'] = "pregnancyPost.title"
      data['filterValue'] = undefined
    }
    catch (e) {
      Logger.error(`ListTeachingPregnancyComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListTeachingPregnancyComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListTeachingPregnancyComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListTeachingPregnancyComponent execute handleOnChangeTableValue");
      Logger.debug("ListTeachingPregnancyComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.resetPage = false
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state
      ref[name] = element
      if (name === 'username') {
        ref[name].focus()
      }
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleOnChange')
      Logger.debug('ListTeachingPregnancyComponent execute handleOnChange receive name', name)
      Logger.debug('ListTeachingPregnancyComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
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
          break;
      }
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleOnChangeSearch')
      Logger.debug('ListTeachingPregnancyComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleOnChangeSearchValue')
      Logger.debug('ListTeachingPregnancyComponent execute handleOnChangeSearchValue receive value', value)
      // if(event){
      //   event.preventDefault()
      // }

      const { ui, data } = this.state
      ui.searchValue = !Helper.isEmpty(value) ? value : ""
      let temp = !Helper.isEmpty(value) ? value : undefined
      this.handleOnChange('searchValue', temp)
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleOnChangeOrderBy')
      Logger.debug('ListTeachingPregnancyComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListTeachingPregnancyComponent execute handleSetData");
      Logger.debug("ListTeachingPregnancyComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.posts;
      ui.total = data.total;

      Logger.debug("ListTeachingPregnancyComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleSetData ${e.toString()}`);
    }
  }
  handleSubmitSearch(event) {
    try {
      Logger.info("ListTeachingPregnancyComponent execute handleSubmitSearch");
      if (event) {
        event.preventDefault()
      }
      const { ui, timeout, data } = this.state;
      ui.list = null
      ui.resetPage = true
      let temp = { ...data }
      if (HelperService.isEmpty(temp['searchValue'])) {
        temp['search'] = undefined
        temp['searchValue'] = undefined
      }
      ui.dataTable = ui.dataTable.setFilter(temp.filter)
        .setFilterValue(temp.filterValue)
        .setSearch(temp.search)
        .setSearchValue(temp.searchValue)
        .setBy(temp.by)
        .setFrom(0)
      Logger.debug("ListTeachingPregnancyComponent execute handleSubmitSearch data", data);
      Logger.debug("ListTeachingPregnancyComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY.CREATE)
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleRedirectDetail')
      Logger.debug('ListTeachingPregnancyComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY.DETAIL
      const path = route.replace(':id', item.pregnancyPostId)
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnChangeStatus(event, value) {
    try {
      Logger.info('ListTeachingPregnancyComponent execute handleOnChangeStatus')
      Logger.debug('ListTeachingPregnancyComponent execute handleOnChangeStatus receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      if (value === CategoryEnum.STATUS.ALL) {
        this.handleOnChange('filter', undefined)
        this.handleOnChange('filterValue', undefined)
      } else {
        this.handleOnChange('filter', 'pregnancyPost.pregnancyMonth')
        this.handleOnChange('filterValue', value)
      }

      ui.defaultStatus = ui.listStatus.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListTeachingPregnancyComponent handleOnChangeStatus ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui} handleOnChangeTableValue={this.handleOnChangeTableValue}
        timeout={timeout} handleOnChangeSearch={this.handleOnChangeSearch}
        handleOnChangeOrderBy={this.handleOnChangeOrderBy}
        handleOnChangeSearchValue={this.handleOnChangeSearchValue}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleSubmitSearch={this.handleSubmitSearch} handleCreate={this.handleCreate}
        handleRedirectDetail={this.handleRedirectDetail}
        handleOnChangeStatus={this.handleOnChangeStatus}
      />

    )
  }
}

export default BaseComponent(ListTeachingPregnancyComponent)