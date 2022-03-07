/**
 * Created By Nguyen Cong Thanh on 04/22/2020 16:03.
 *
 * Copyright intelIn 2020.
 */

 import { connect } from "react-redux";
 import { withRouter } from "react-router-dom";
 
 import LoadingComponent from "./component";
 
 import DialogAction from 'reduxStore/action/dialog'
 
 const mapStateToProps = allReducer => {
   return {
     allReducer: allReducer
   };
 };
 
 const mapDispatchToProps = dispatch => {
   return {
     updateModal: (data) => {
       dispatch(DialogAction.update(data))
     },
   };
 };
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingComponent));
 