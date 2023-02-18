# R/GA Javascript task by Hitsam

Hi, here is my exercise result with javascript based on document you shared you previously. I use react with materia library to make this exercise. I also implement [deck.gl](https://deck.gl) like you asked me. Here is the things I add on this exercise:

- I implement eslint and prettier to make code better and readable
- I create this project using ``create-react-app``
- I use ``yarn`` to install the packages
- ``react-map-gl`` I use is version 5.0.0 instead of new version
- Additional library ``moment``, ``node-sass`` and ``axios``
- I implement ``scss`` module on styling. Why I don't use styled component because I don't want to make css style inside js file so I think using styled module is more best practice because we dont need to write css styles in js file
- I implement ``useAxios`` hooks for fetching data from api. This is common practice I use when I create such a big project. I use this implementation to replace fetching data using ``redux-saga`` or ``redux-thunk`` like what my previous project. So, the data request/response is more encapsulated which means the request/response cannot be accessed by other page/component.

