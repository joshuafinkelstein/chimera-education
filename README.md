# Chimera
**Open-Access Education Framework** \
An online learning platform with tools for information retrieval, context-based annotations, behavioral tracking and reinforcement, and personalized content-filtering. It is designed as an interface for viewing existing course material and a wiki for collaborating on new course material.

## Motivation
Students have access to more resources than they have ever had, and those resources are available in a variety of formats. However, students are just stressed as ever. The question is why? And the answer is at the end of the day, it does not matter how much information is available. It only matters what information students can find and understand in a limited amount of time. So, students take notes only to find those notes becomes incomprehensible after a few days. There is not enough context for those notes to serve as reliable references. And when students go out in search of supplementary resources, they find there is a ton of results for common search terms, but not for specific questions. Even if they have access to a lecture recording, the video is not searchable and when a student is pressed for time they are not going to be able to wade through a 1.5 hour video to find the 5 minute segment they actually need. At the same time, consider that students are not the same. Sometimes a student needs more time to learn something. Sometimes a student needs to be taught in a different way.

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

### User Interface

### Wikicourses

### Data Mining

### Content Indexing

### Search Algorithm

### Content Filtering

### Gamification

### Credentialing


## Contributing
Check out the issues page for up to date information on how you can best contribute to the project.

## Authors
* Joshua Finkelstein - project coordinator and maintains the website
* Nikolas Baya - contributor

## License
Chimera is licensed under Apache 2.0.

## Acknowledgements
Chimera acknowledges MIT OpenCourseware for producing and maintaining a high-quality database of educational content and making this content available under a Creative Commons license.
