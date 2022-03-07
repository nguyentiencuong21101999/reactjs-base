import React from 'react';
import {
    Box,
    Typography,
    Tab,
    Button,
    Stack,
    Avatar,
    Chip,
    Checkbox,
} from '@material-ui/core';
import QuestionHook from "core/hook/createMission/question.hook"
import AnswerHook from "core/hook/createMission/answer.hook"
import CloseIcon from '@material-ui/icons/Close'
import HelperService from 'service/helper'
import ChallengeEnum from 'service/enum/challenge';
import Localize from "service/localize";
import style from "core/hook/button/style"
const AnswerQuestion = (props) => {
    const { ui, timeout, data,
        handleAddQuestion,
        handleRemoveQuestion,
        handleAddAnswer,
        handleRemoveAnswer,
        handleOnRef,
        handleOnChangeQuestion,
        handleOnChangeAnswer,
        handleOnChangeAnswerResult
    } = props;
    const renderCheckBox = (element, index, indexAnswer) => {
        const handleOnChange = (e) => {
            const { checked } = e.target
            handleOnChangeAnswerResult(checked ? ChallengeEnum.MISSION_QUESTION_RESULT.TRUE : ChallengeEnum.MISSION_QUESTION_RESULT.FALSE, index, indexAnswer)
        }
        return (
            <Checkbox
                checked={element.isCorrect === ChallengeEnum.MISSION_QUESTION_RESULT.TRUE}
                onChange={handleOnChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{ marginLeft: "65px" }}
            />
        )
    }
    return (
        <>
            <Typography style={{ fontSize: '1rem', color: '#6b778c' }}>{Localize.getLocalize("LC_QUESTION_LIST")} *</Typography>


            {data['questions'].map((item, index) => (
                <Stack
                    direction="column"
                    spacing={3}
                    justifyContent="center"
                    key={index}
                    sx={{
                        p: 3,
                        width: "auto",
                        bgcolor: "transparent",
                        boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
                        margin: 'auto',
                        width: '750px'
                    }}
                >
                    <Typography style={{ fontSize: '1rem', color: '#6b778c' }}>{Localize.getLocalize("LC_QUESTION")} {index + 1}</Typography>
                    <Stack direction="row" spacing={1}
                        justifyContent="flex-start"
                        alignItems='center'
                        sx={{ width: '100%' }}

                    >

                        <QuestionHook
                            name="questions"
                            value={item.question || ""}
                            type="text"
                            label={Localize.getLocalize("LC_CONTENT_QUESTION")}
                            error={timeout.field === 'question' ? timeout.message : ''}
                            disabled={timeout.status}
                            styleFormControl={{}}
                            onRef={handleOnRef}
                            fullWidth={true}
                            onChange={(name, value) => handleOnChangeQuestion(name, value, index)}
                        />


                    </Stack>
                    <Stack direction="row" spacing={3}
                        justifyContent="flex-start"
                        alignItems='center'
                        sx={{ width: '100%' }}
                    >
                        <Typography style={{ fontSize: '1rem', color: '#6b778c', width: "70%" }}>{Localize.getLocalize("LC_ANSWER_LIST")}</Typography>
                        <Typography style={{ fontSize: '1rem', color: '#6b778c', width: "30%" }}>{Localize.getLocalize("LC_CORRECT_ANSWER")}</Typography>
                    </Stack>
                    {item.answers.map((element, indexAnswer) => (
                        <Stack direction="row" spacing={1}
                            justifyContent="flex-start"
                            alignItems='center'
                            sx={{ width: '100%' }}
                            key={indexAnswer + index}
                        >
                            <Stack direction="row" spacing={2}
                                justifyContent="flex-start"
                                alignItems='center'
                                sx={{ width: '65%' }}
                            >
                                <AnswerHook
                                    name="questions"
                                    value={element.questionAnswer || ""}
                                    type="text"
                                    label={null}
                                    error={timeout.field === 'todo' ? timeout.message : ''}
                                    disabled={timeout.status}
                                    styleFormControl={{}}
                                    onRef={handleOnRef}
                                    fullWidth={true}
                                    onChange={(name, value) => handleOnChangeAnswer(name, value, index, indexAnswer)}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}
                                justifyContent="flex-start"
                                alignItems='center'
                                sx={{ width: '25%' }}
                            >
                                {renderCheckBox(element, index, indexAnswer)}
                            </Stack>

                            {
                                indexAnswer > 1 && item.answers.length === indexAnswer + 1 && data['questions'].length === index + 1 ? <Button
                                    color="primary"
                                    size="small"
                                    variant="text"
                                    disabled={timeout.status}
                                    sx={{ height: "36px" }}
                                    onClick={event => { event.preventDefault(); handleRemoveAnswer(index, indexAnswer) }}
                                >
                                    <CloseIcon />
                                </Button> : null
                            }
                        </Stack>
                    ))}
                    <Stack direction="row" spacing={3}
                        justifyContent="flex-start"
                        alignItems='center'
                        sx={{ width: '100%' }}
                        key={index + 5}
                    >
                        {index > 0 && data['questions'].length === index + 1 ? <Button
                            color="error"
                            size="small"
                            variant="outlined"
                            disabled={timeout.status}
                            sx={{ ...style.buttonOutlined, width: '200px' }}
                            onClick={event => { event.preventDefault(); handleRemoveQuestion(index) }}
                        >
                            {Localize.getLocalize("LC_DEL_QUESTION")}
                        </Button> : null}
                        {data['questions'].length < 100 && index + 1 === data['questions'].length ? <Button
                            color="info"
                            size="small"
                            variant="outlined"
                            disabled={!HelperService.isEmpty(data['questions'][index].answers.find(item => item.questionAnswer === "")) || timeout.status}
                            sx={{ ...style.buttonOutlined, width: '200px' }}
                            onClick={(event) => { event.preventDefault(); handleAddAnswer(index) }}
                        >
                            {Localize.getLocalize("LC_ADD_ANSWER")}
                        </Button> : null}
                    </Stack>
                </Stack>
            ))
            }
            {/* </Stack> */}
            {
                ui.listQuestion.length < 100 ? <Button
                    color="info"
                    size="small"
                    variant="outlined"
                    disabled={!(data['questions'].findIndex(element => element.question === "") === -1 && HelperService.isEmpty(data['questions'].find(element => element.answers.find(item => item.questionAnswer === "")))) || timeout.status}
                    sx={{ ...style.buttonOutlined, width: '200px' }}
                    onClick={handleAddQuestion}
                >
                    {Localize.getLocalize("LC_ADD_QUESTION")}
                </Button> : null
            }


        </>
    )
};

export default AnswerQuestion;