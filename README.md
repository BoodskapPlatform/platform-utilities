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
> npm start INFO <API_URL> <DOMAIN_KEY> <API_KEY>
```

####Example
```shell
> npm start INFO https://xxxxxx/api XXXXXXXX xxxxxxx
```

#### Output

```shell
> platform-utilities@1.0.0 start
> node index.js "info" "https://xxxxxxx/api" "XXXXXXXX" "xxxxxxx"

Tue Dec 07 2021 12:43:06 GMT+0530 (India Standard Time) | Fetching info process started...
Tue Dec 07 2021 12:43:08 GMT+0530 (India Standard Time) | Domain rule Found!
Tue Dec 07 2021 12:43:08 GMT+0530 (India Standard Time) | 1 message rule's Found!
Tue Dec 07 2021 12:43:09 GMT+0530 (India Standard Time) | 2 named rule's Found!
Tue Dec 07 2021 12:43:10 GMT+0530 (India Standard Time) | No named rule found!
Tue Dec 07 2021 12:43:11 GMT+0530 (India Standard Time) | No binary rule found!
Tue Dec 07 2021 12:43:12 GMT+0530 (India Standard Time) | 2 job rule's Found!
Tue Dec 07 2021 12:43:12 GMT+0530 (India Standard Time) | No file rule found!
Tue Dec 07 2021 12:43:13 GMT+0530 (India Standard Time) | 6 process rule's Found!
Tue Dec 07 2021 12:43:14 GMT+0530 (India Standard Time) | No sftp rule found!
Tue Dec 07 2021 12:43:15 GMT+0530 (India Standard Time) | No mqtt rule found!
Tue Dec 07 2021 12:43:15 GMT+0530 (India Standard Time) | No udp rule found!
Tue Dec 07 2021 12:43:16 GMT+0530 (India Standard Time) | No tcp rule found!
Tue Dec 07 2021 12:43:17 GMT+0530 (India Standard Time) | No email rule found!
Tue Dec 07 2021 12:43:18 GMT+0530 (India Standard Time) | 1 mico api's Found!

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
> npm start EXPORT https://xxxxxxx/api XXXXXXXX xxxxxxxx /export
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
> npm start IMPORT https://xxxxxxx/api XXXXXXXX xxxxxxx /import
```

#### Output

```shell

```