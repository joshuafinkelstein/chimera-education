# Chimera Learning Platform

Chimera is a learning platform based on educational videos available on YouTube. The platform features a tool to take **timestamped notes** on top of videos. In this way, each note serves as a bookmark to reference the original video segment. The goal is to provide a medium for students to directly interact and contribute to educational content on the internet.

![Screenshot](https://github.com/joshuafinkelstein/chimera-education/blob/master/screenshot-1.PNG)

This repository also includes a chrome extension to open YouTube videos on Chimera as well as a **YouTube scraper** for collecting video transcripts and an **indexing/search tool** for navigating this content.

Eventually, the aggregated notes, transcripts and other video metadata will provide an increasingly searchable index of educational videos. So, Chimera will be an education-specific **search engine** as well as a learning platform with potential extensions that include the following:

- access control
- classroom data analytics
- gamification systems
- context-based search tools
- personalized content-filtering
- wikis for collaborating on course content
- notes in a variety of formats


## Getting Started

### Hosted Application
View the most current working version of the Chimera Learning Platform at https://app.chimeraeditor.com/.

### Chrome Extension
The chrome extension allows YouTube videos to be opened on Chimera. It is not available on the Chrome Web Store at the moment. However, you can load the unpacked extension after cloning this repository. Follow the instructions at https://developer.chrome.com/extensions/getstarted#manifest.

If there is enough interest, the extension will be made available on the Chrome Web Store.

### Modifying the User Interface
The user interface is built with Vue.js as the JavaScript framework and Semantic UI for styling. Documentation for Vue.js is available at https://vuejs.org/v2/guide/. Documentation for Semantic UI is available at https://semantic-ui.com/introduction/getting-started.html.

### Search Engine
To get started working with the search engine, you have to install Whoosh and then load the Jupyter notebook index/index.ipynb.
```
pip install Whoosh
```
Chimera maintains a test dataset of a educational video metadata from sources such as MIT OpenCourseware and an index for referencing this content. Send a request to info@chimeraeditor.com to access this dataset.

If you want to generate your own index for a specific YouTube channel, install YouTube -DL. Document for YouTube -DL is available at https://github.com/ytdl-org/youtube-dl/blob/master/README.md#readme.
```
pip install youtube-dl
```
To start scraping YouTube, load the Jupyter notebook crawler/youtube_crawler.ipynb and enter the channel's URL.

## Built With
- HTML/CSS/JavaScript
- JQuery
- Vue.js
- Firebase
- Semantic UI
- YouTube -DL
- Python
- Django REST Framework
- Haystack/Whoosh
- Jupyter
- MathJax


## Overview of Video Annotation Feature
The annotation tool is used for producing notes that are designed to be extensible with potential add-ons ranging from interactive notes to third-party app integrations. Notes follow a hierarchical formatting scheme with headers, descriptions and additional information. Focusing on a note unfolds it and displays an additional description. For example, links to Wikipedia articles provide an image, a header and additional information. The annotation tool currently supports links and will soon support images, files and LaTeX markup. Chimera will also offer a public-facing API that allows developers to build extensions on top of this framework. The annotations are synchronized with a video transcript and classroom discussion which provide an index for each video enabling search.

## Contributing
Check out the issues page for up to date information on how you can best contribute to the project. Feedback is welcome. If you use parts of Chimera in your own project, attribution is not necessary, but it is appreciated.

## Authors
* Joshua Finkelstein - project coordinator and maintains the website
* Nikolas Baya - contributor

## License
Chimera is licensed under Apache 2.0.

## Acknowledgements
Chimera acknowledges MIT OpenCourseware for producing and maintaining a high-quality database of educational content and making this content available under a Creative Commons license.
