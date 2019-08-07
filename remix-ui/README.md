Remix UI Package
---
## Overview

The core UI project contains UI-specific code required to host the core system.  This dependency is loaded by host applications and is assumed to run in the browser only in web applications and on the mobile device in mobile applications, providing an application abstraction that is similar to the abstraction provided on the server. It manages UI components as well as executes logic specified in screen and view artifacts.

## Example

````javascript
import Localization from 'remix-plugin-i18n';
import Remix from 'remix-ui';
import Adapter from 'remix-platform-web-adapter';
import RemixComponents from 'remix-ui-components-react';
import RenderingEngine from 'remix-ui-rendering-react-web';
import { render } from 'react-dom';
import ApplicationComponents from './components/index';
import ApplicationTransformers from './transformers/index';
import ApplicationTokens from './tokens/index';
import ApplicationAnnotations from './annotations/index';
import translationTables from './translationTables';

Remix.initializer((app) => {
    const registerComponents = (name, type, schema) => {
        app.register('component', name, type, schema);
    };

    const registerTransformers = (name, fn) => {
        app.register('transformer', name, fn);
    };

    const registerTokens = (name, fn) => {
        app.register('token', name, fn);
    };

    const registerAnnotations = (name, fn) => {
        app.register('annotation', name, fn);
    };

    RemixComponents(registerComponents);
    ApplicationComponents(registerComponents);
    ApplicationTransformers(registerTransformers);
    ApplicationTokens(registerTokens);
    ApplicationAnnotations(registerAnnotations);
    return Localization({
        app,
        lang: 'english',
        fetch: (lang) => {
            return translationTables[lang];
        }
    });
}).create({
    debug: process.env.NODE_ENV === 'production',
    rendering: {
        engine: RenderingEngine
    },
    workflow: {
        adapter: Adapter
    }
}).run().then((root) => {
    render(root, document.getElementById('app'));
});
````

## Initializer

Initialize should be called on the object exported by this package to subscribe to system events and register custom tokens, annotations, transformers, UI components, and plugins. These custom elements can then be referenced in screen and view artifacts.

Initializer takes a function that is called with an application object. The following functions can be called on this object.

#### Register

The application object can be used to register custom Remix elements defined in the application outside of the Remix project. Registering these elements allows them to referenced successfully in the metadata.

The first parameter of the register function is always the type of element to register. This can be 'component', 'transformer', 'token', or 'annotation'.

Registering UI components:

````javascript
app.register('component', name, type, schema)
````
- name: The name of the component that it can be referenced by in view artifact type properties.
- type: The UI component itself.
- scehma: The [UI component schema]{@tutorial uiComponentSchema} for the component.

Registering [transformers]{@tutorial transformers}:

````javascript
app.register('transformer', name, fn)
````
- name: The name of the transformer that it can be referenced by in annotations.
- fn: The transformer function.

Registering [tokens]{@tutorial tokens}:

````javascript
app.register('token', name, fn)
````
- name: The name of the token that it can be referenced by in rules.
- fn: The token function.

Registering [annotations]{@tutorial bindingAnnotations}:

````javascript
app.register('annotation', name, fn)
````
- name: The name of the annotation that it will be referenced by in input objects and output properties.
- fn: The constructor of the annotation.

#### Subscribe

The subscribe function can be used to subscribe to system level events. See [Rules Schema]{@tutorial rulesSchema} for a full list of system events.

````javascript
subscribe(event, handler, once)
````
- event: A string that is the system event name to subscribe to.
- handler: The function that will be called when the specified event is executed.
- once: A boolean that is not required. Defaults to false. If true it will execute the provided callback at most one time throughout the life of the program.

## Create

The create function takes an object that has various settings:

````javascript
{
    logger,
    debug,
    rendering: {
        engine
        element
    },
    routing,
    workflow: {
        adapter
    }
}
````

- logger: Object used to log issues and application state. Defaults to console.
- debug: If true it allows the logger to log using the debug method.
- rendering.engine: The rendering package to use. This varies depending on the technology used for UI components. Since 1.5 version, rendering engine must be passed explicitly.
- rendering.element: The element id in index.html to insert Remix elements at.
- rendering.args: Some extra arguments for underlying rendering engine which will be passed when it's created, if it supports them, of course.
- routing: An object with properties used in initializing the history object that maintains session history. It uses [the history package](https://www.npmjs.com/package/history). Type specifies the type of history object to use as specified in the history package. Setting this to 'memory' uses createMemoryHistory, 'hash' uses createHashHistory, and anything else uses createBrowserHistory. The other properties are used as arguments in initizlizing the history object, including basename, forceRefresh, hashType, initialEntries, and initialIndex.  Defaults to:
````javascript
{
    type: 'browser',
    basepath: '/',
    forceRefresh: false
}
````
- workflow.adapter: The package that will be used to communicate with the server. This should be set to an instance of [remix-platform-web-adapter](../remix-platform-web-adapter/index.html) for web applications and  [remix-platform-mobile-adapter](../remix-platform-mobile-adapter/index.html) for mobile applications.

## Run

The run function starts the client-side application and returns an output of underlying rendering engine. It's up to an application developer to inject it to a document.
