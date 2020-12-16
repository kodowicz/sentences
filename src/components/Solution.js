import React, { useState } from "react";
import styled, { css } from "styled-components";

import { fonts, colors } from "../assets/styles";
import { fadeIn, fadeOut } from "../assets/keyframes";

const Solution = ({ isAnswered, correctAnswer, checkTask }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleConfirm(event) {
    event.preventDefault();
    setIsConfirmed(true);
  }

  function handleAnimationEnd(event) {
    if (event.animationName === fadeOut.name) {
      checkTask();
    }
  }

  return (
    <Wrapper
      isVisible={isAnswered}
      isConfirmed={isConfirmed}
      onAnimationEnd={handleAnimationEnd}
    >
      <Text>original sentence:</Text>
      <English>{correctAnswer}</English>
      <ButtonWrapper>
        <Button onClick={handleConfirm}>next</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ isVisible }) =>
    isVisible
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `};

  ${({ isConfirmed }) =>
    isConfirmed
      ? css`
          animation: ${fadeOut} 0.5s both;
        `
      : css`
          animation: ${fadeIn("-5vh", "0")} 0.5s 0.3s both;
        `};
`;

const Text = styled.p`
  font-family: ${fonts.minorFamily};
  font-weight: ${fonts.medium};
  font-size: 1.6rem;
  text-align: center;
  margin-top: 6rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

const English = styled.h2`
  font-weight: ${fonts.bold};
  font-size: 2rem;
  text-align: center;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.6rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 3rem auto;
  max-width: 30rem;

  @media (min-width: 768px) {
    margin: 4rem auto;
    max-width: 40rem;
  }
`;

const Button = styled.button`
  box-shadow: 5px 5px 15px -5px ${colors.lightGray};
  font-family: ${fonts.minorFamily};
  background: ${colors.black};
  color: ${colors.white};
  display: block;
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

export default Solution;