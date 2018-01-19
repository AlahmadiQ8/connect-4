import React from 'react';

import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';

import '../src/index.css';
import CheckerSvg from '../src/components/Checker/CheckerSvg';
import CloudText from '../src/components/CloudTextBox';

storiesOf('CheckerSvg', module)
  .add('red', () => <CheckerSvg color="red" />)
  .add('yellow', () => <CheckerSvg color="yellow" />)
  .add('200px', () => <CheckerSvg color="red" size="100" />)
  .add('200px pulse', () => <CheckerSvg flash color="red" size="100" />)
  .add('CloudText', () => <CloudText textInCloud="Congrats!" bottomText="Goob Job, You Won!" />);
