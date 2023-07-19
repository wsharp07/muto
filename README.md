# oclif-hello-world

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g muto
$ muto COMMAND
running command...
$ muto (--version)
muto/0.0.0 darwin-arm64 node-v18.17.0
$ muto --help [COMMAND]
USAGE
  $ muto COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`muto hello PERSON`](#muto-hello-person)
- [`muto hello world`](#muto-hello-world)
- [`muto help [COMMANDS]`](#muto-help-commands)
- [`muto plugins`](#muto-plugins)
- [`muto plugins:install PLUGIN...`](#muto-pluginsinstall-plugin)
- [`muto plugins:inspect PLUGIN...`](#muto-pluginsinspect-plugin)
- [`muto plugins:install PLUGIN...`](#muto-pluginsinstall-plugin-1)
- [`muto plugins:link PLUGIN`](#muto-pluginslink-plugin)
- [`muto plugins:uninstall PLUGIN...`](#muto-pluginsuninstall-plugin)
- [`muto plugins:uninstall PLUGIN...`](#muto-pluginsuninstall-plugin-1)
- [`muto plugins:uninstall PLUGIN...`](#muto-pluginsuninstall-plugin-2)
- [`muto plugins update`](#muto-plugins-update)

## `muto hello PERSON`

Say hello

```
USAGE
  $ muto hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/wsharp07/muto/blob/v0.0.0/dist/commands/hello/index.ts)_

## `muto hello world`

Say hello world

```
USAGE
  $ muto hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ muto hello world
  hello world! (./src/commands/hello/world.ts)
```

## `muto help [COMMANDS]`

Display help for muto.

```
USAGE
  $ muto help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for muto.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.12/src/commands/help.ts)_

## `muto plugins`

List installed plugins.

```
USAGE
  $ muto plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ muto plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `muto plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ muto plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ muto plugins add

EXAMPLES
  $ muto plugins:install myplugin

  $ muto plugins:install https://github.com/someuser/someplugin

  $ muto plugins:install someuser/someplugin
```

## `muto plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ muto plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ muto plugins:inspect myplugin
```

## `muto plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ muto plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ muto plugins add

EXAMPLES
  $ muto plugins:install myplugin

  $ muto plugins:install https://github.com/someuser/someplugin

  $ muto plugins:install someuser/someplugin
```

## `muto plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ muto plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ muto plugins:link myplugin
```

## `muto plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ muto plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ muto plugins unlink
  $ muto plugins remove
```

## `muto plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ muto plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ muto plugins unlink
  $ muto plugins remove
```

## `muto plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ muto plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ muto plugins unlink
  $ muto plugins remove
```

## `muto plugins update`

Update installed plugins.

```
USAGE
  $ muto plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

<!-- commandsstop -->
