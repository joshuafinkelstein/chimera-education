# Chimera
**Open-Access Education Framework** \
An online learning platform with tools for information retrieval, context-based annotations, behavioral tracking and reinforcement, and personalized content-filtering. It is designed as an interface for viewing existing course material and a wiki for collaborating on new course material.

## Motivation
Students have access to more resources than they have ever had and those resources are available in a variety of formats. However, at the end of the day, it does not matter how much information is available. It only matters what information students can find and understand in a limited amount of time. So, students take notes only to find those notes become incomprehensible after a few days. There is not enough context for those notes to serve as reliable references. And when students go out in search of supplementary resources, they find there is a ton of results for common search terms, but not for specific questions. Even if they have access to a lecture recording, the video is not searchable and when a student is pressed for time they are not going to be able to wade through a 1.5 hour video to find the 5 minute segment they actually need. At the same time, consider that students are not the same. Sometimes a student needs more time to learn something. Sometimes a student needs to be taught in a different way.

There are three primary components of our solution that center around lecture recordings and livestreams. First, we offer a video annotation tool that allows students and educators to take timestamped notes on top of a video stream such that those notes serve as bookmarks for referencing the original content. Second, those notes are coupled with video transcripts to produce a searchable index of each video which means you can now search inside of videos for relevant content. Third, we aggregate notes and user behavior data to suggest content and define ideal learning paths for each student.

The interface consists of a video player and an annotation editor that is synchronized to the video. Static descriptions are provided below the video similar to YouTube.

## Getting Started

### Prerequisites
Instructions for Vue.js can be found at https://vuejs.org/v2/guide/.

Install youtube -dl (https://github.com/ytdl-org/youtube-dl/blob/master/README.md#readme)
```
pip install youtube-dl
```

### Access the Data
Chimera maintains a dataset of a educational video metadata from sources such as MIT OpenCourseware and an index for referencing this content. Send a request to info@chimeraeditor.com to access this dataset.

## Built With
* Vue.js -- JavaScript Framework
* youtube-dl -- a command-line program for downloading YouTube videos and video metadata via a Python interpreter
* MathJax -- LaTeX and MathML markup

## Features

### Video Annotations
The annotation tool is used for producing notes that are designed to be extensible with potential add-ons ranging from interactive notes to third-party app integrations. Notes follow a hierarchical formatting scheme with headers, descriptions and additional information. Focusing on a note unfolds it and displays an additional description. For example, links to Wikipedia articles provide an image, a header and additional information. The annotation tool currently supports links and will soon support images, files and LaTeX markup. Chimera will also offer a public-facing API that allows developers to build extensions on top of this framework. The annotations are synchronized with a video transcript and classroom discussion which provide an index for each video enabling search.

### Knowledge Extraction
Reference youtube-dl to download video metadata from YouTube and other video hosting sites.

Additional details on this subsystem will be provided soon.

### Information Retrieval
Before a search is made each keyword in the index is processed through semantic embedding which looks at word-family associations like synonyms and the distribution of those keywords in the video. A search is then based on the meaning of the query rather than the words in the query itself. With Chimera you can search for videos and video segments which gives students instant access to relevant content. Going the other way, at any timepoint in a video a user can effectively ask for clarification and Chimera will feed in notes and a portion of the transcript that is nearby into search. In this way, search queries can be context-based rather than prompting a user.

### Recommender System
Search data and additional user behavior metrics allow us to group students based on how they learn and recommend content based on that information. The model follows a machine learning technique called collaborative filtering where the underlying premise is a group of people who have similar preferences will likely continue to have similar preferences. In the context of Chimera, that group of people has a shared background, interests and habits. This means we can provide targeted recommendations like personalized search results and user-specific learning paths.

## Contributing
Check out the issues page for up to date information on how you can best contribute to the project. Feedback is always welcome as well.

## Authors
* Joshua Finkelstein - project coordinator and maintains the website
* Nikolas Baya - contributor

## License
Chimera is licensed under Apache 2.0.

## Acknowledgements
Chimera acknowledges MIT OpenCourseware for producing and maintaining a high-quality database of educational content and making this content available under a Creative Commons license.
