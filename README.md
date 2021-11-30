# How to run the Platform Utilities?

### Getting Started
This plugin requires node `>= 6.0.0` and npm `>= 1.4.15` (latest stable is recommended).

```shell
> git clone https://github.com/BoodskapPlatform/platform-utilities
```

Once the repository has been cloned:
```shell
> cd platform-utilities
```

### NPM Module Installation

```shell
> npm install
```

### To print the info
```shell
> npm start INFO
```
#### Output

```shell

```

### How to export the rules?

```shell
> npm start EXPORT <API_URL> <DOMAIN_KEY> <API_KEY> <EXPORT_PATH>
```

######Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>

######Optional arguments, <br>
EXPORT_PATH<br>

####Example
```shell
> npm start EXPORT https://platform.boodskap.io/api QERATESYUF 23rweb484 /export
```

#### Output

```shell

```


### How to import the rules?

```shell
> npm start IMPORT <API_URL> <DOMAIN_KEY> <API_KEY> <IMPORT_PATH>
```

######Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>

######Optional arguments, <br>
IMPORT_PATH<br>

####Example
```shell
> npm start IMPORT https://platform.boodskap.io/api QERATESYUF 23rweb484 /import
```

#### Output

```shell

```