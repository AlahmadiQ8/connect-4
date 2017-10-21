import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Checker from '../src/components/SandBox.jsx';
import CheckerIcon from '../src/components/Checker.jsx';
import Board from '../src/components/Board.jsx';
import CloudTextBox from '../src/components/CloudTextBox.jsx';
import PlayerDash from '../src/components/PlayerDash';

import 'bootstrap/dist/css/bootstrap.css';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('SandBox', module).add('test', () => <Checker />);

storiesOf('Checker', module)
  .add('red', () => <CheckerIcon color="red" />)
  .add('yellow', () => <CheckerIcon color="yellow" />)
  .add('200px', () => <CheckerIcon color="red" size="100" />);

storiesOf('Board', module)
  .add('7x6 50px circles', () => <Board />)
  .add('10x10 10px circles', () => (
    <Board rows="10" cols="10" checkerSize="25" />
  ));

storiesOf('CloudTextBox', module)
  .addDecorator(story => (
    <div
      style={{
        marginLeft: '100px',
        marginTop: '100px',
        fontFamily: 'Boogaloo, cursive',
      }}
    >
      {story()}
    </div>
  ))
  .add('test', () => <CloudTextBox />)
  .add('bad', () => <CloudTextBox text="omg" />);

storiesOf('PlayerDash', module)
  .addDecorator(story => (
    <div
      style={{
        marginLeft: '100px',
        marginTop: '100px',
        fontFamily: 'Boogaloo, cursive',
      }}
    >
      {story()}
    </div>
  ))
  .add('test', () => <PlayerDash color="red" total={21} used={15} />)
  .add('two', () => <PlayerDash color="yellow" total={21} used={15} />);
