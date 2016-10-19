import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from '../button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ))
  .add('secondary', () => (
    <Button secondary={true}>Hello Button</Button>
  ));
