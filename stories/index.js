import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Checker from '../src/components/SandBox.jsx';
import CheckerIcon from '../src/components/Checker.jsx';

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
