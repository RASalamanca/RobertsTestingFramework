# Robert's Testing Framework
Robert's Testing Framework, or RTF, is a simple framework for unit testing javascript code in the browser. While multiple such frameworks, with more functionality and a superior developer experience, do exist already, I wanted to make one for didactic purposes. It's main "feature" is that it runs entirely on the browser and does not require node, but it does require a webserver. The UI is also quite nice.

## Installation
Robert's Testing Framework uses ES6 Modules, and thus requires a web server. Any web server will do, but I suggest...
- **Node:** If you allready have Node installed, you can use the [http-server package](https://www.npmjs.com/package/http-server).
- **Windows:** If you're on windows, the easiest one to set up is [WAMP](https://www.wampserver.com/en/)
- **Linux:** [webfsd](https://manpages.ubuntu.com/manpages/trusty/man1/webfsd.1.html) is quick and simple to use

Download this repo on your server's root directory, put your test modules on the test-modules folder, and link them on results.html.
Open results.html to view the test results.

A simple tutorial on how to get started as well as API documentation can be found on the docs folder

