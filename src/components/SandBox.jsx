import React from 'react';
import styled, {keyframes, ThemeProvider} from 'styled-components';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
	padding: 4em;
	background: papayawhip;
`;

const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
`;

const Button = styled.button`
	/* Adapt the colours based on primary prop */
	background: ${props => props.primary ? 'palevioletred' : 'white'};
	color: ${props => props.primary ? 'white' : 'palevioletred'};

	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

// We're extending Button with some extra styles
const TomatoButton = Button.extend`
	color: tomato;
	border-color: tomato;
`;

// keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
	display: inline-block;
	animation: ${rotate360} 2s linear infinite;
	padding: 2rem 1rem;
	font-size: 1.2rem;
`;

const ButtonThemed = styled.button`
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border-radius: 3px;
	/* Color the border and text with theme.main */
	color: ${props => props.theme.fg};
	border: 2px solid ${props => props.theme.fg};
	background: ${props => props.theme.bg};
`;

// We're passing a default theme for Buttons that aren't wrapped in the ThemeProvider
ButtonThemed.defaultProps = {
	theme: {
			fg: 'palevioletred',
			bg: 'white'
	}
}

// Define what props.theme will look like
const theme = {
	fg: 'palevioletred',
	bg: 'white'
};
// This theme swaps `fg` and `bg`
const invertTheme = ({ fg, bg }) => ({
	fg: bg,
	bg: fg
});


export default  (props) => {
  return (
    <Wrapper>
			<div>
	  		<Title>
	  			Hello World, this is my first styled component!
	  		</Title>
	      <Button>Normal</Button>
	  		<Button primary>Primary</Button>
	      <TomatoButton>Test</TomatoButton>
	      <Rotate>&lt; 💅 &gt;</Rotate>
			</div>
			<div>
				<ThemeProvider theme={theme}>
					<div>
						<ButtonThemed>Normal</ButtonThemed>
						<ThemeProvider theme={invertTheme}>
							<ButtonThemed>Inverted Theme</ButtonThemed>
						</ThemeProvider>
					</div>
				</ThemeProvider>
			</div>
  	</Wrapper>
  );
}
