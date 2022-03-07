/**
 * Created By Nguyen Cong Thanh on 04/22/2020 16:58.
 *
 * Copyright intelIn 2020.
 */

import React from 'react'
import styled from "@emotion/styled";
import CheckBox from "../checkbox";
import Button from "../button";

const Select = styled.div`
    position: relative;
`

const DropdownOption = styled.button`
    height: 48px;
    padding: 15px 20px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: #d8d8d8;
    background-color: #f8f8f8;
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.17;
    letter-spacing: 0.9px;
    color: #222;
    outline: 0;
    position: relative;
    z-index: 3;
    cursor: pointer;
`

const FilterIcon = styled.span`
    padding-right: 12px;
`

const OptionGroup = styled.ul`
    position: absolute;
    list-style: none;
    background-color: white;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
    border-radius: 4px;
    top: 48px;
    left: 0;
    z-index: 3;
    border: 1px solid rgba(0,0,0,.16);
    box-sizing: border-box;
    display: ${props => props.show ? 'block' : 'none'};
`

const Option = styled.li`
    padding-left: 15px;
`

const OverView = styled.div`
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`

const MultiSelectCheckBox = props => {

    const [listField, setListField] = React.useState([])
    const [showOption, setShowOption] = React.useState(false)
    const [labelDropdown, setLabelDropdown] = React.useState(null)
    const [mapSelected, setMapSelected] = React.useState(new Map())
    const selected = mapSelected

    React.useEffect(() => {
        setListField(props.data)
    }, [props.data])

    React.useEffect(() => {
        if (props.defaultComponent){
            props.defaultComponent.map((item, index) => {
                selected.set(item.name, item)
            })
            setMapSelected(selected)
            let strings = [];
            let components = [];
            selected.forEach((value) => {
                strings.push(value.label)
                components.push(value)
            })
            setLabelDropdown(strings.join('; '))
            props.callback(components)
        }
    }, [props.defaultComponent])

    const handleCheckBox = (name, value) => {
        value ? !selected.has(name) ? selected.set(name, listField.find(i => i.name === name)) : null : selected.has(name) ? selected.delete(name) : null
        setMapSelected(selected)
        let strings = [];
        let components = [];
        selected.forEach((value) => {
            strings.push(value.label)
            components.push(value)
        })
        setLabelDropdown(strings.join('; '))
        props.callback(components)
        props.handleOnChangeCheckBox(name, value)
    }

    return (
        <>
            <Select>
                <DropdownOption onClick={event => {
                    setShowOption(!showOption)
                }}>
                    <FilterIcon>
                        <svg id="Layer_2" enableBackground="new 0 0 24 24" height="21" viewBox="0 0 24 24" width="21"
                             xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path
                                    d="m7.5 21c-.076 0-.153-.018-.224-.053-.169-.085-.276-.258-.276-.447v-8.171c0-.395-.16-.782-.44-1.061l-5.827-5.824c-.473-.472-.733-1.1-.733-1.768v-2.176c0-.827.673-1.5 1.5-1.5h16c.827 0 1.5.673 1.5 1.5v2.176c0 .668-.26 1.296-.733 1.769l-5.827 5.823c-.28.279-.44.666-.44 1.061v4.671c0 .47-.224.918-.6 1.2l-3.6 2.7c-.088.066-.194.1-.3.1zm-6-20c-.276 0-.5.224-.5.5v2.176c0 .401.156.778.44 1.062l5.827 5.823c.466.464.733 1.109.733 1.768v7.171l2.8-2.1c.125-.094.2-.243.2-.4v-4.671c0-.659.267-1.303.733-1.769l5.827-5.823c.284-.283.44-.66.44-1.061v-2.176c0-.276-.224-.5-.5-.5z" />
                            </g>
                            <g>
                                <path
                                    d="m22.5 24h-7c-.827 0-1.5-.673-1.5-1.5v-9c0-.827.673-1.5 1.5-1.5h7c.827 0 1.5.673 1.5 1.5v9c0 .827-.673 1.5-1.5 1.5zm-7-11c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5z" />
                            </g>
                            <g>
                                <path
                                    d="m20.5 17h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                            </g>
                            <g>
                                <path
                                    d="m20.5 20h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                            </g>
                        </svg>
                    </FilterIcon>
                    {labelDropdown ? labelDropdown : 'Tìm kiếm có điều kiện'}
                </DropdownOption>
                <OptionGroup show={showOption}>
                    {
                        listField.map((_, index) => (
                            <Option key={index}>
                                <CheckBox label={_.label} name={_.name} onChange={handleCheckBox} status={selected.has(_.name)} />
                            </Option>
                        ))
                    }
                </OptionGroup>
                {
                    showOption ? <OverView onClick={event => {
                        event.preventDefault();
                        setShowOption(false)
                    }} /> : null
                }
            </Select>
        </>
    )
}
const Wrapper = styled.div`
  width: 100%;
  min-height: 100px;
  margin-bottom: 30px;
`

const ContainerComponent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const WrapperComponent = styled.div`
    margin-right: 30px;
`

const FilterComponent = props => {

    const { data, defaultComponent, handleSubmit = () => { }, handleSelectCheckbox, disabled = false } = props

    const [initData, setInitData] = React.useState([])
    const [components, setComponents] = React.useState([])

    React.useEffect(() => {
        setInitData(data)
    }, [data])

    return (
        <>
            <Wrapper>
                <MultiSelectCheckBox
                    data={initData}
                    defaultComponent={defaultComponent || null}
                    callback={dtoElement => setComponents(dtoElement)}
                    handleOnChangeCheckBox={handleSelectCheckbox}
                />

                <ContainerComponent>
                    {
                        components.map((props, index) => {
                            const {
                                type,
                                styleFormControl,
                                classFormControl,
                                id,
                                label,
                                name,
                                placeholder,
                                value,
                                error,
                                maxLength,
                                disabled,
                                onRef,
                                onChange,
                                onFocus,
                                onBlur,
                                iconStart,
                                iconEnd,
                                helperText,
                                style,
                                list,
                                valueIsNumber,
                                row,
                                defaultValue,
                                isSearch,
                                minDate,
                                maxDate,
                                lang,
                                Component,
                                secondPlaceholder,
                                onSecondRef,
                                secondName,
                                secondId,
                                secondValue,
                                onSecondChange,
                                maxDateSecond,
                            } = props
                            return <WrapperComponent key={index}>
                                <Component
                                    onRef={onRef}
                                    type={type}
                                    value={value}
                                    placeholder={placeholder}
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    name={name}
                                    id={id}
                                    iconStart={iconStart}
                                    iconEnd={iconEnd}
                                    helperText={helperText}
                                    error={error}
                                    styleFormControl={styleFormControl}
                                    classFormControl={classFormControl}
                                    label={label}
                                    style={style}
                                    list={list}
                                    valueIsNumber={valueIsNumber}
                                    row={row}
                                    defaultValue={defaultValue}
                                    isSearch={isSearch}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    lang={lang}
                                    secondPlaceholder={secondPlaceholder}
                                    onSecondRef={onSecondRef}
                                    secondName={secondName}
                                    secondId={secondId}
                                    secondValue={secondValue}
                                    onSecondChange={onSecondChange}
                                    maxDateSecond={maxDateSecond}
                                />
                            </WrapperComponent>
                        })
                    }

                    {
                        components.length > 0 ? <Button text='Tìm kiêm' onClick={handleSubmit} disabled={disabled} /> : null
                    }
                </ContainerComponent>
            </Wrapper>
        </>
    )

}

export default FilterComponent
