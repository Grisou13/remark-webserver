# Remark webserver

This project is intended for people wanting to make very simple presentations with Markdown.

This project is based upon the work of [remark js](https://github.com/gnab/remark).
We recommend reading their documentation for more information on how to build your presentations.

This project provides usefull commands in your markdown presentations, that can't be handled by remark.



To get started please visit the [getting-started](#getting-started) section


# Installation

`npm install`

# Running the project

`npm run start`

And open your browser at `http://localhost:3000`

# Getting started

To create your first presentation you will need to add a markdown file in the `views/slides` directory.

See example `./views/slides/0. agenda.md`

After creating your presentation based on `https://github.com/gnab/remark` templating, you can access your presentation in the browser at `localhost:3000`

# Custom instructions

*Disclaimer:* All custom instructions are processed server side and **do not** have any relationship with remarkjs.

> Including another presentation

 You can use the following command: `[include 'any filename.md']`

 This command will lookup any file matching that filename in the `views/slides` directory.
 It is recommended for including presentations into another, but you may include whatever you want.

