import {createGlobalStyle} from 'styled-components';

export const lightTheme = {
  body: '#E2E2E2',
  text: '#363537',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
};

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
};

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    display: flex;
    max-width: 600px;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, FontAwesome, MaterialIcons;
    transition: all 0.25s linear;
  }`;
