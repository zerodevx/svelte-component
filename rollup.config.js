import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase())

function serve() {
	let server

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default production
? {
		input: 'src/index.js',
		output: [
			{ file: pkg.module, format: 'es' },
			{ file: pkg.main, format: 'umd', name }
		],
		plugins: [
			svelte(),
			resolve()
		]
	}
: {
		input: 'docs/main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'docs/build/bundle.js'
		},
		plugins: [
			svelte({
				dev: true,
				css: css => {
					css.write('bundle.css');
				}
			}),
			resolve(),
			serve(),
			livereload('docs')
		],
		watch: {
			clearScreen: false
		}
	}
