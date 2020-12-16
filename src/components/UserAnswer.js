import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { colors, fonts } from "../assets/styles";
import { fadeIn, moveUp, fadeOut } from "../assets/keyframes";

const UserAnswer = ({
  sentence,
  isAnswered,
  isChecked,
  isCompleted,
  startTask,
  checkSolution,
  cleanSolution,
  completeTask
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [value, setValue] = useState("");
  const [rows, setRows] = useState(1);
  const inputRef = useRef();
  const minRows = 1;
  const lineHeight = 18;

  useEffect(
    () => {
      if (isCompleted) {
        completeTask(false);
        setIsVisible(true);
        cleanSolution();
        startTask();
        setValue("");
        setRows(1);
      }
    },
    [isCompleted]
  );

  useEffect(
    () => {
      if (!isAnswered) inputRef.current.focus();
    },
    [isAnswered]
  );

  function handleChange(event) {
    const elementRows = resizeTextarea(event, minRows, lineHeight);
    setValue(event.target.value);
    setRows(elementRows);
  }

  function handleCheck(event) {
    event.preventDefault();

    if (value) {
      checkSolution(value);
      setIsVisible(false);
    };
  }

  function handleAnimation(event) {
    if (isChecked && event.animationName === fadeOut.name) {
      completeTask(true);
    }
  }

  function resizeTextarea(event, minRows, lineHeight) {
    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    return currentRows;
  }

  return (
    <Form
      isChecked={isChecked}
      isAnswered={isAnswered}
      isCompleted={isCompleted}
      onAnimationEnd={handleAnimation}
    >
      <Polish>{sentence.polish}</Polish>
      <Textarea
        rows={rows}
        value={value}
        ref={inputRef}
        onChange={handleChange}
        autoFocus
        lang="en"
        placeholder="type transcription"
      />
      <Button isVisible={isVisible} onClick={handleCheck}>check</Button>
    </Form>
  );
};

const Form = styled.form`
  background: ${colors.white};
  translation: transform 0.3s ease-out;
  z-index: 1;
  position: relative;
  opacity: 0;
  padding: 1px 0;

  ${({ isChecked, isAnswered, isCompleted }) => {

    if (!isCompleted && !isAnswered)
      return css`
        animation: ${fadeIn("20vh", "15vh")} 1s both;
      `;

    else if (isAnswered && !isChecked)
      return css`
        animation: ${moveUp} 1s both;
      `;

    else if (isAnswered && isChecked)
      return css`
        animation: ${fadeOut} 0.7s;
      `;
  }}};
`;

const Polish = styled.h1`
  font-weight: ${fonts.bold};
  font-size: 2.2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.6rem;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid ${colors.lightGray};
  font-family: ${fonts.minorFamily};
  color: ${colors.black};
  appearance: none;
  width: 100%;
  height: auto;
  line-height: 1.8rem;
  font-size: 1.6rem;
  box-sizing: border-box;
  border-radius: 2rem;
  padding: 8px 2rem;
  margin: 3rem auto;
  outline: none;
  overflow: hidden;
  resize: none;

  &:focus {
    border: 1px solid ${colors.black};
  }

  &::placeholder {
    color: ${colors.lightGray};
  }

  @media (min-width: 768px) {
    margin: 4rem auto;
  }
`;

const Button = styled.button`
  display: ${({ isVisible }) => isVisible ? "block" : "none"};
  box-shadow: 5px 5px 15px -5px ${colors.lightGray};
  font-family: ${fonts.minorFamily};
  background: ${colors.black};
  color: ${colors.white};
  margin: 0 auto;
  padding: 1rem 4rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 5rem;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
    font-size: 1.6rem;
  }
`;

export default UserAnswer;