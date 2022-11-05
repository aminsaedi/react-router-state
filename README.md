# react-router-state

<p align="center">React state api which append value to quey params</p>

## Preview

Open this example on [StackBlitz](https://stackblitz.com):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/react-ts-idndo7?file=App.tsx)

## Installation

Using npm:

```bash
npm install react-router-state
```

Or using yarn:

```bash
yarn add react-router-state
```

## API

### useQueryState(defaultValue, key)

|     Name     |  Type  |          Description           |
| :----------: | :----: | :----------------------------: |
| defaultValue | string |      default state value       |
|     key      | string | param key to append to the url |

## Example

```jsx
import { useQueryState } from 'react-router-state';

export default function () => {
    const [value, setValue] = useQueryState("john", "name");

    return (
        <div>
            <h1>Name query param: ${value}</h1>
            <button onClick={() => setValue("amin")} >
            click to change name query parameter
            </button>
        </div>
    )
}

```

## Use cases

There are some cases that you want to have a persistance state when you share a url of you web application to someone else. For example you click on a button which opens a modal and you want to share the link and the modal should be open once the app is loaded. use can do something like this example:

```jsx
const [isOpen, setIsOpen] = useQueryState("false", "isModalOpen");

return (
  <div>
    <button onClick={() => setIsOpen("true")}>click to open modal</button>
    <Modal isOpen={isOpen} onClose={() => setIsOpen("false")} />
  </div>
);
```
