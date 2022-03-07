import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import style from "core/hook/button/style"
import {
    Typography,
    Stack,
    Button
} from '@material-ui/core';
import ButtonHook from "core/hook/button/index.hook"
import Localize from "service/localize";
const initial = Array.from({ length: 3 }, (v, k) => k).map(k => {
    const custom = {
        id: `id-${k}`,
        content: `Quote ${k}`
    };

    return custom;
});
const grid = 8;


const QuoteItem = styled.div`
font-family:"Roboto","Helvetica","Arial",sans-serif;
  width: auto;
  margin-bottom: ${grid}px;
  background-color: white;
  padding: ${grid}px;
  height:"20px";
  max-width: 210px;
  min-width: 210px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  font-size: 0.875rem;
  color: #333;
`;
const Footer = styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 30px 22px;
        font-size: 0.875rem;
        color: #333;
    `
function Quote({ quote, index }) {
    return (
        <Draggable key={index} draggableId={quote.missionId} index={index}>
            {provided => (
                <QuoteItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {index + 1}.{quote.missionTitle}
                </QuoteItem>
            )}
        </Draggable>
    );
}
const QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => (
        <Quote quote={quote} index={index} key={quote.missionId} />
    ));
});
function VerticalListHook(props) {

    const { name, list, label, disabled, onCloseVertical } = props
    const [state, setState] = useState({ quotes: list });
    const [defaultList, setDefaultList] = useState(list)
    const [newList, setNewList] = useState(null)
    const reorder = (list, startIndex, endIndex) => {

        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        props.onChange(name, result)
        setNewList(result)
        return result;

    };


    function onDragEnd(result) {
        if (!result.destination) { return; }

        if (result.destination.index === result.source.index) { return; }

        const quotes = reorder(
            state.quotes,
            result.source.index,
            result.destination.index
        );

        setState({ quotes });
    }
    const handleClose = () => {
        setState({ quotes: defaultList })
        props.onClose(name, defaultList)
    }
    const handleSubmit = () => {
        setDefaultList(newList)
        props.onSubmit()
    }
    const handleOnCloseVertical = () => {
        props.onCloseVertical()
    }
    const styleLabel = { fontFamily: "Roboto", fontFamily: "Helvetica", fontFamily: "Roboto", fontFamily: "sans-serif", fontSize: "14px", color: "#333", fontWeight: 300, width: "90%", }
    return (
        <>
            <Stack direction="column" spacing={3} sx={{ p: 2, width: '250px', maxWidth: 'calc(100vw - 400px)', bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px' }}>

                <Stack direction="row" sx={{ marginBottom: "-15px" }} spacing={3} >
                    <Stack sx={styleLabel} direction="column" spacing={3} >
                        {label ? label : ""}
                    </Stack>
                    <Stack sx={{ cursor: "pointer" }} onClick={handleOnCloseVertical} direction="column" spacing={3} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.001" height="10" viewBox="0 0 10.001 10">
                            <g id="close_1_" data-name="close (1)" opacity="0.7">
                                <g id="Group_5524" data-name="Group 5524">
                                    <path id="Path_60" data-name="Path 60" d="M6.1,5.016,9.841,1.277a.548.548,0,0,0,0-.773L9.513.176a.548.548,0,0,0-.774,0L5,3.915,1.261.176a.548.548,0,0,0-.773,0L.16.5a.547.547,0,0,0,0,.773L3.9,5.016.16,8.755a.549.549,0,0,0,0,.774l.328.328a.548.548,0,0,0,.773,0L5,6.117,8.74,9.856a.543.543,0,0,0,.387.16h0a.543.543,0,0,0,.387-.16l.328-.328a.548.548,0,0,0,0-.774Z" transform="translate(0 -0.016)" fill={props.color} />
                                </g>
                            </g>
                        </svg>
                    </Stack>

                </Stack>
                <hr style={{ fontWeight: 100 }} />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <QuoteList quotes={state.quotes} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Footer>
                    <Button
                        color="primary"
                        size="small"
                        variant="secondary"
                        sx={style.buttonBack}
                        onClick={(e) => { e.preventDefault(); handleClose() }}
                    >
                        {Localize.getLocalize("LC_BUTTON_CANCEL")}
                    </Button>
                    <ButtonHook
                        text={Localize.getLocalize("LC_BUTTON_SAVE")}
                        color="primary"
                        size="small"
                        variant="contained"
                        disabled={disabled}
                        style={{ backgroundColor: "rgb(253, 94, 93)" }}
                        onClick={(e) => { e.preventDefault();  handleSubmit(); }}
                    />
                </Footer>
            </Stack >
        </>
    );
}
export default VerticalListHook
