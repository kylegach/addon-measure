<img src="https://user-images.githubusercontent.com/42671/119589951-dbcd9600-bda1-11eb-9227-078f3cfc1e74.png" width="200" height="200">

# Storybook Addon Measure

Storybook addon for inspecting layouts and visualizing the box model.

1. Hold down the modifier key:

- MacOS: <kbd>⌥ Option</kbd>
- Windows: <kbd>Alt</kbd>

2. Hover over a DOM node

3. Storybook will display the dimensions of the selected element—margin, padding, border, width and height—in pixels.

![](https://user-images.githubusercontent.com/42671/119589961-dff9b380-bda1-11eb-9550-7ae28bc70bf4.gif)

## Usage

Install the addon:

```sh
npm i -D @storybook/addon-measure
```

Then, add `"@storybook/addon-measure"` to the addons array in your `.storybook/main.js`:

```js
module.exports = {
  addons: ["@storybook/addon-measure"],
};
```

## Contributing

### Development scripts

Clone the repository and install dependencies.

```sh
yarn
```

- `yarn start` runs babel in watch mode and starts Storybook
- `yarn build` build and package your addon code

## Release Management

### Setup

This project is configured to use [auto](https://github.com/intuit/auto) for release management. It generates a changelog and pushes it to both GitHub and npm. Therefore, you need to configure access to both:

- [`NPM_TOKEN`](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-access-tokens) Create a token with both _Read and Publish_ permissions.
- [`GH_TOKEN`](https://github.com/settings/tokens) Create a token with the `repo` scope.

Then open your `package.json` and edit the following fields:

- `name`
- `author`
- `repository`

#### Local

To use `auto` locally create a `.env` file at the root of your project and add your tokens to it:

```bash
GH_TOKEN=<value you just got from GitHub>
NPM_TOKEN=<value you just got from npm>
```

Lastly, **create labels on GitHub**. You’ll use these labels in the future when making changes to the package.

```bash
npx auto create-labels
```

If you check on GitHub, you’ll now see a set of labels that `auto` would like you to use. Use these to tag future pull requests.

#### GitHub Actions

This template comes with GitHub actions already set up to publish your addon anytime someone pushes to your repository.

Go to `Settings > Secrets`, click `New repository secret`, and add your `NPM_TOKEN`.

### Creating a releasing

To create a release locally you can run the following command, otherwise the GitHub action will make the release for you.

```sh
npm run release
```

That will:

- Build and package the addon code
- Bump the version
- Push a release to GitHub and npm
- Push a changelog to GitHub
