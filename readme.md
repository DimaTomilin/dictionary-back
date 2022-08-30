<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Word Dictionary Server</h3>

  <p align="center">
    Server to my dictionary service
    <br />
    <br />
    <a href="http://dima-app-dictionary.s3-website-us-east-1.amazonaws.com">View Demo</a>
    ·
    <a href="https://github.com/DimaTomilin/dictionary-back/issues">Report Bug</a>
    ·
    <a href="https://github.com/DimaTomilin/dictionary-back/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

I decided to create dictionary, that will help to me and other people that want to learn English. So I made comfort aplication to search words and learning them meanings, also it is functionality to search random word by part of speech so you can learn every day random word.
My Database have 70.000 words and i will improve it. All words have definition and part of speech so i hope that will help to somebody to learn more efficient.

This directory is server part of my project. The application you can see here [My Dictionary](http://dima-app-dictionary.s3-website-us-east-1.amazonaws.com)

<p align="right">(<a href="#top">Back to top</a>)</p>

### Built With

- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [AWS](https://docs.aws.amazon.com/)
- [Postgres](https://www.postgresql.org/)
- [Heroku-Deploy](https://heroku.com/)

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

If you want to help me improve my service or you want to work with this project on your local machine. You can follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/DimaTomilin/dictionary-front.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run servser
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- GET /:word - if word has more than one parts of speech return all words part of speech, else,return a word + definition + part of speech.
- GET /:word/:partOfSpeech - return a word + definition + part of speech (noun, verb, adjectives, etc...)
- GET /part-of-speech/:part - for example, /part-of-speech/adjective, return a random word + definition + part of speech (part is enum)
- GET /part-of-speech/:part?letter=X - for example, /part-of-speech/noun?letter=m, return a random word with the same letter + definition + part of speech

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

### Update 2.0

- Adding typescript to project
- Changing work with DB to more effective
- Adding some comments
- Heroku deploy

### Update 3.0

- Changing DB to Postgress

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">Back to top</a>)</p>

## Contact

Tomilin Dima - [@twitter_handle](https://twitter.com/TomilinDima) - tomilin.dimon@gmail.com

Also you have all my contacts in my application wegpage <a href="http://dima-app-dictionary.s3-website-us-east-1.amazonaws.com">View Demo</a>

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[issues-shield]: https://img.shields.io/badge/Issues-0-red
[issues-url]: https://github.com/DimaTomilin/dictionary-back/issues
[forks-shield]: https://img.shields.io/badge/Forks-0-green
[forks-url]: https://github.com/DimaTomilin/dictionary-back/network/members
[stars-shield]: https://img.shields.io/badge/Stars-0-yellow
[stars-url]: https://github.com/DimaTomilin/dictionary-back/stargazers
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-LinkedIn-blue.svg?style=flat&logo=linkedin
[linkedin-url]: https://www.linkedin.com/in/dima-tomilin/
