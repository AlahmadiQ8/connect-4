import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Checker from '../src/components/SandBox.jsx';
import CheckerIcon from '../src/components/Checker.jsx';
import Board from '../src/components/Board.jsx';

import 'bootstrap/dist/css/bootstrap.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('SandBox', module)
  .add('test', () => <Checker></Checker>);


storiesOf('Checker', module)
  .add('red', () => <CheckerIcon color='red'/>)
  .add('yellow', () => <CheckerIcon color='yellow'/>)
  .add('200px', () => <CheckerIcon color='red' size='100' />)

storiesOf('Board', module)
  .add('7x6 50px circles', () => <Board/>)
  .add('10x10 10px circles', () => <Board rows='10' cols='10' checkerSize='25'/>);
