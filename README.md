<div>
	<p align="center">
		<a href="https://quasar.dev/">
			<img src="https://cdn.quasar.dev/logo/512/quasar-logo.png" height="200px" />
		</a>
	</p>
	<p align="center">
		<a href="https://twitter.com/thewizardlink">
			<img src="https://img.shields.io/twitter/follow/thewizardlink.svg?style=social&logo=twitter">
		</a>
		<a href="https://github.com/wizardlink/interview_vizir/issues">
			<img src="https://img.shields.io/github/issues/wizardlink/interview_vizir.svg?style=flat-square">
		</a>
		<a href="https://github.com/wizardlink/interview_vizir/graphs/contributors">
			<img src="https://img.shields.io/github/contributors/wizardlink/interview_vizir.svg?style=flat-square">
		</a>
	</p>
</div>

## companyhero_interview

Repository responsible for showcasing the test done for an interview with [Vizir].

### Requirements

- [`yarn`]
- [NodeJS], [LTS] recommended


## Getting started

1. [Clone] the repository;
2. [Install] the dependencies using [`yarn`];
3. [Install] [Quasar]'s cli using `yarn global add @quasar/cli`.
  - Works similarly to [`@vue/cli`]
4. Run `quasar dev` to start the development server or `quasar build` to make a production build into `./dist`.

### Configuration

- [Quasar] can be configured with [quasar.conf.js](./quasar.conf.js), [quasar.extensions.json](./quasar.extensions.json) and [quasar.testing.json](./quasar.testing.json).
  - This is where you also configure your [webpack].
- [ESLint] can be configured with [.eslintrc.json](./.eslintrc.js).
- [Babel] can be configured with [babel.config.js](./babel.config.js).
- The theme is based on [SASS] variables which can be altered with the [quasar.variables.sass](./src/css/quasar.variables.sass) file.

### Testing

Testing can be done using [`@quasar/cli`] or by running the scripts in the [`package.json`](./package.json). Though it is recommended to stick to [`@quasar/cli`].

#### [Jest]

- `quasar test --unit jest`

#### [Cypress]

- `quasar test --e2e cypress`

---

Both can be tested by combining the commands as follows: `quasar test --e2e cypress --unit jest` the test files are located in [`./test`](./test) and [Cypress] generates videos and screenshots when an error occurs, those can be found inside [`./test/cypress`](./test/cypress).

## Considerations

This is a small project that follows the requirements given by the company, feel free to open a pull request or issue, however I am likely to close it. The repository serves only for showcase.


<!-- LINKS -->

[vizir]: https://vizir.com.br/
[`yarn`]: https://yarnpkg.com/
[nodejs]: https://nodejs.org/en/
[lts]: https://en.wikipedia.org/wiki/Long-term_support
[clone]: https://github.com/git-guides/git-clone
[install]: https://yarnpkg.com/cli/install
[quasar]: https://quasar.dev/
[`@vue/cli`]: https://github.com/vuejs/vue-cli
[webpack]: https://github.com/webpack/webpack
[eslint]: https://github.com/eslint/eslint
[babel]: https://github.com/babel/babel
[sass]: https://sass-lang.com/
[`@quasar/cli`]: https://github.com/quasarframework/quasar/tree/dev/cli
[jest]: https://jestjs.io/
[cypress]: https://www.cypress.io/
