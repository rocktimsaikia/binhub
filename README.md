<br/>
<a href="https://binhub.vercel.app/">
  <p align="center">
      <img height=90 src="https://user-images.githubusercontent.com/33410545/118024876-d1140980-b37c-11eb-8fe4-481144756b0f.png">
    </p>
</a>
<p align="center"><strong>Bulk removing github repositories made easy 🗑️</strong></p>

<br/>


<br/>

## Motivation

The main motive behind this app is that the manual way of deleting a repo is quite tedious. And if you want to bulk delete redundant/old/fork repos then it can be a frustrating process. There are other alternatives like scripts that does the same thing. But I prefer a UI while selecting what to delete because it is much more clear and just to be sure that you are not accidentally deleting any important stuff.

<br/>

## Features

- Minimal user interface and easy to use
- Github authorization over token-based approach

<br/>

## Stack

| Codebase                                  |           Description            |
| :---------------------------------------- | :------------------------------: |
| [next](https://nextjs.org/)               |        Frontend framework        |
| [nextauth](https://next-auth.js.org/)     |    Authentication for Nextjs     |
| [immer](https://immerjs.github.io/immer/) |         State management         |
| [geist-ui](https://react.geist-ui.dev/)   | UI component library             |

<br/>

## Setup

Create a new `.env.local` file and add the required credentials included in the `.env.template`. \
Create an OAuth Github app manually here and grab the `GITHUB_ID` and `GITHUB_SECRET` to add to the env file.

Install the dependencies

```bash
yarn install
```

Start the development server

```bash
yarn dev
```

<br/>

## Support

If you like the project and want to support it, you can do so in the following platforms: <br/>

<a href="https://www.buymeacoffee.com/rocktimcodes"><img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg" height="35px"/></a>

<br/>

## License

MIT License © 2021 [Rocktim Saikia](https://github.com/rocktimsaikia)
