# World Calendars

This library implements various calendars used throughout the world.
It allows manipulation of dates within those calendars.
Calendars currently implemented are:
* Coptic
* Ethiopian
* Gregorian
* Hebrew
* Islamic
* Julian
* Mayan
* Nepali
* Persian
* Umm al-Qura

## Usage

### Installation

```
npm install kbwood/worldCalendars --save
```

### Access

Import the library base code and a calendar implementation.

```
import Calendars from 'kbwood/worldCalendars/Calendars'
import 'kbwood/worldCalendars/Gregorian'
```

Use the `Calendars` object to access the calendar implementations.

```
const gregorian = Calendars.instance('gregorian')
```

Create a date within that calendar.

```
const date = gregorian.date(2022, 1, 26)
```

Retrieve information about that date or manipulate it.

```
console.log(date.year(), date.month(), date.day)
const earlier = date.sub(7, 'd') // 7 days previous
```

Dates are immutable.

## Table of Contents

1. [Application Structure](#application-structure)
1. [Setup](#setup)
1. [Development](#development)
    1. [TypeScript](#typescript)
    1. [Linting](#linting)
    1. [Testing](#testing)
	1. [Build](#build)
    1. [Dependencies](#dependencies)

## Application Structure

```
│── .babelrc                               # Babel configuration file
│── .eslintrc.js                           # ESLint configuration file
│── .gitignore                             # Git configuration file
│── jest.config.js                         # Jest configuration file
│── tsconfig.json                          # TypeScript configuration file
│── package.json                           # Holds dependencies references and app-related tasks
│── package-lock.json                      # Generated by npm. See https://docs.npmjs.com/files/package-lock.json
│── node_modules                           # Dependencies
│── src                                    # Main code folder
│── test                                   # Unit test folder
```

## Setup

Run `npm install` to install the necessary dependencies. These will be added inside the `node_modules` folder.

## Development

### TypeScript

To check for TypeScript errors,

```bash
npm run type-check
```

Or to check continuously,

```bash
npm run type-check:watch
```

### Linting

To run the linting to check only,

```bash
npm run lint
```

To check and automatically fix errors,

```bash
npm run format
```

## Testing

To run unit tests,

```bash
npm test
```

To run unit test coverage,

```bash
npm run coverage
```

## Build

To build the modules,

```bash
npm run build
```

## Dependencies

This project uses the following libraries and frameworks -

Lint

* [ESLint](https://eslint.org/)

Test

* [Jest](https://facebook.github.io/jest/)

Compile

* [Babel](https://babeljs.io/)
