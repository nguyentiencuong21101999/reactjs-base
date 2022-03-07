/**
 * Created By Nguyen Cong Thanh on 02/28/2020 14:34.
 *
 * Copyright intelIn 2020.
 */

 import React, {Fragment, useEffect, useState} from 'react';
 import {ExpandMore} from '@material-ui/icons'
 
 import Styles from 'core/_app.scss'
 
 const Select = props => {
     const {
         styleFormControl = {minWidth: 80},
         classFormControl,
         id = `input-${new Date().getTime()}`,
         label,
         error = "",
         list = [{ text: '', value: '' }],
         defaultValue,
         disabled,
         onChange = (e, item) => {
         },
         iconEnd = <ExpandMore/>,
         isTextImage
     } = props
 
     const [open, setOpen] = useState(false)
     const [val, setVal] = useState({
         text: '',
         value: ''
     })
 
     useEffect(() => {
         setVal(defaultValue)
     }, [defaultValue])
 
     const openMenu = (f) => {
         setOpen(f)
     }
 
     const change = (e, item) => {
         e.preventDefault();
         setVal(item)
         onChange(e, item)
     }
 
     return (
         <div className={[Styles['field'], classFormControl].join(' ')} style={styleFormControl}>
             <label htmlFor={id} className={Styles['field-label']}>{label}</label>
             <div
                 className={[Styles['input-base'], Styles['select-base'], disabled ? Styles['select-disable'] : ''].join(' ')}>
                 <button className={Styles['select-value']} onClick={() => {
                     openMenu(!open)
                 }}>{!isTextImage ? <span className={Styles['select-txt']}>{val.text}</span> :
                     <img src={val.text} alt={val.text}/>}
                     <span className={Styles['select-icon']}>{iconEnd}</span>
                 </button>
                 <ul className={[Styles['menu'], open ? Styles['fade-in'] : Styles['fade-out']].join(' ')}>
                     {
                         list.map((item, key) => <li key={key}
                                                     className={[Styles['option'], val.value === item.value ? Styles['active'] : ''].join(' ')}
                                                     onClick={(e) => {
                                                         change(e, item);
                                                         openMenu(false)
                                                     }}>
                                 {!isTextImage ? <span>{item.text}</span> : <img src={item.text} alt={item.text}/>}
                             </li>
                         )
                     }
                 </ul>
                 {open ? <div className={Styles['popover']} onClick={() => {
                     openMenu(false)
                 }}/> : null}
             </div>
             <p className={Styles['field-error']}>{error}</p>
         </div>
     )
 
 }
 
 export default Select