import React from 'react';
import Localize from "service/localize";
import VerticalListComponent from 'core/hook/createChallengeChild/verticalList.hook'
const View = (props) => {
  const { ui, timeout, handleOnchange, handleClose, handleOnSubmit, handleHiddenVertical } = props
  return (
    <VerticalListComponent
      name={'missions'}
      label={Localize.getLocalize("LC_REORDER")}
      list={ui.listMission}
      onChange={handleOnchange}
      onSubmit={handleOnSubmit}
      onClose={handleClose}
      onCloseVertical={handleHiddenVertical}
      disabled={ui.isShowBtn || timeout.status}
    />
  );
}

export default View;
