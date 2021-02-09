import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import { changeTheme } from "../store/actions";
import { sunrise, sunset } from "../assets/keyframes";

const ThemeSwitcher = ({ isHome }) => {
  const [ isSwitched, setSwitched ] = useState(false);
  const { isLight } = useSelector(state => ({
    isLight: state.theme.isLight
  }));

  const dispatch = useDispatch();
  const setChangeTheme = (state) => dispatch(changeTheme(state));

  useEffect(
    () => {
      if (!isSwitched) {
        setChangeTheme(!isHome);
      }
    },
    [isHome]
  );

  function switchTheme () {
    setSwitched(true);
    setChangeTheme(!isLight);
  };

  return (
    <Button onClick={switchTheme}>
      <SwitchControl isLight={isLight} />
    </Button>
  )
};

const SwitchControl = ({ isLight }) => (
  <Svg viewBox="0 0 219 155" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <Sun isLight={isLight}>
        <path d="M88.1194 55C88.1194 73.2913 73.2913 88.1194 54.9999 88.1194C36.7085 88.1194 21.8804 73.2913 21.8804 55C21.8804 36.7086 36.7085 21.8806 54.9999 21.8806C73.2913 21.8806 88.1194 36.7086 88.1194 55Z" strokeWidth="8"/>
        <line x1="55.5376" y1="3" x2="55.5376" y2="11.7761" strokeWidth="8" strokeLinecap="round" />
        <line x1="3" y1="54.4627" x2="11.7762" y2="54.4627" strokeWidth="8" strokeLinecap="round" />
        <line x1="98.2236" y1="54.4627" x2="107" y2="54.4627" strokeWidth="8" strokeLinecap="round" />
        <line x1="3" y1="-3" x2="11.7761" y2="-3" transform="matrix(0.707108 0.707106 -0.707108 0.707106 14.4805 17.7609)" strokeWidth="8" strokeLinecap="round" />
        <line x1="3" y1="-3" x2="11.7761" y2="-3" transform="matrix(0.707108 0.707106 -0.707108 0.707106 82.0898 85.3731)" strokeWidth="8" strokeLinecap="round" />
        <line x1="55.5376" y1="98.2239" x2="55.5376" y2="107" strokeWidth="8" strokeLinecap="round" />
        <line x1="3" y1="-3" x2="11.7761" y2="-3" transform="matrix(0.707108 -0.707106 0.707108 0.707106 17.6489 95.6343)" strokeWidth="8" strokeLinecap="round" />
        <line x1="3" y1="-3" x2="11.7761" y2="-3" transform="matrix(0.707108 -0.707106 0.707108 0.707106 85.7842 28.3209)" strokeWidth="8" strokeLinecap="round" />
      </Sun>
      <Cloud>
        <path d="M190.5 151.5H97.5C90.4987 151.5 81 144.207 81 129.5C81 122.725 83.0437 117.274 86.488 113.468C89.9177 109.679 94.9541 107.276 101.429 106.968C104.816 106.807 107.839 104.41 108.57 100.966C112.512 82.4147 127.165 69.9432 147.485 69.0037C156.14 69.4819 162.605 70.7629 168.081 73.6794C173.55 76.5922 178.327 81.2966 183.272 89.1547C184.567 91.2133 186.782 92.426 189.103 92.56C197.433 93.0407 203.974 96.3739 208.449 101.43C212.942 106.508 215.5 113.495 215.5 121.5C215.5 138.455 205.291 151.5 190.5 151.5Z" strokeWidth="8"/>
      </Cloud>
    </g>
  </Svg>
);

const Button = styled.button`
  background: none;
  border: none;
  margin: 0;
`;

const Svg = styled.svg`
  width: 3.5rem;
`;

const Sun = styled.g`
  fill: ${({ theme }) => theme.white};
  stroke: ${({ theme }) => theme.black};
  transition: fill 0.5s, stroke 0.5s;

  ${({ isLight }) =>
    isLight
      ? css`
        animation: ${sunset} 1s both;
        `
      : css`
        animation: ${sunrise} 1s both;
        `};
`;

const Cloud = styled.g`
  fill: ${({ theme }) => theme.white};
  stroke: ${({ theme }) => theme.black};
  transition: fill 0.5s, stroke 0.5s;
`;

export default ThemeSwitcher;
