---
title: "Random tech notes"
slug: /blog/random-tech-notes-2024
date: 2024-07-03
description: "While coding I am reading a lot of tech notes. This is a collection of random tech notes on RDBMS, SQLite, Javascript and Typescript."
tags: ["tech notes"]
---

**2024-07-03**

While writing test case, I needed to set environment variables for Jest. I don't want to setup dotenv in the spec. 

### Setting Environment Variables for Jest with dotenv

This setup ensures that environment variables from a `.env` file are loaded before running Jest tests:

1. **Update `package.json`**: Modify the test script to run `jest`.
2. **Install `dotenv`**: Add the `dotenv` package to manage environment variables.
3. **Create `jest.config.js`**: Load environment variables by requiring `dotenv` in the Jest configuration file.
4. **Ensure `.env` file**: Place your environment variables in a `.env` file in the project root.


- Update `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

- Install `dotenv`:
   ```sh
   npm install dotenv
   ```

7. Create `jest.config.js`:
   ```js
   require('dotenv').config();

   module.exports = {
     // Jest config options
   };
   ```

8. Ensure `.env` file is in the project root.

