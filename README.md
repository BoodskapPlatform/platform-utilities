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

#### Example
```shell
> npm start INFO https://xxxxxx/api XXXXXXXX xxxxxxx
```

### How to export the rules?

```shell
> npm start EXPORT <API_URL> <DOMAIN_KEY> <API_KEY> <EXPORT_PATH>
```

###### Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>
EXPORT_PATH<br>

#### Example
```shell
> npm start EXPORT https://xxxxxxx/api XXXXXXXX xxxxxxxx /export
```

### How to import the rules?

```shell
> npm start IMPORT <API_URL> <DOMAIN_KEY> <API_KEY> <IMPORT_PATH>
```

###### Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>
IMPORT_PATH<br>

#### Example
```shell
> npm start IMPORT https://xxxxxxx/api XXXXXXXX xxxxxxx /import
```

### How to populate the data into records?

```shell
> npm start POPULATE <API_URL> <DOMAIN_KEY> <API_KEY> <DATA_PATH> <TYPE> <PROTOCOL>
```

###### Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>
DATA_PATH<br>
TYPE (MESSAGE/RECORD)<br>

if TYPE (MESSAGE) then next parameter will the PROTOCOL (HTTP/MQTT) in default HTTP will be processed

#### Example
```shell
> npm start POPULATE https://xxxxxxx/api XXXXXXXX xxxxxxx /data RECORD
> npm start POPULATE https://xxxxxxx/api XXXXXXXX xxxxxxx /data MESSAGE
> npm start POPULATE https://xxxxxxx/api XXXXXXXX xxxxxxx /data MESSAGE HTTP
> npm start POPULATE https://xxxxxxx/api XXXXXXXX xxxxxxx /data MESSAGE MQTT
```

### File Names
Inside the respective folder (Export, Import & Populate) save the rules in the below file names format,
```shell
Message Definition > messages.json
Record Definition > records.json
Domain Rule > domain_rule.json
Message Rule > message_rule.json
Named Rule > named_rule.json
Schedule Rule > schedule_rule.json
Binary Rule > binary_rule.json
Job Rule > job_rule.json
File Rule > file_rule.json
Process Rule > process_rule.json
SFTP Rule > sftp_rule.json
MQTT Rule > mqtt_rule.json
TCP Rule > tcp_rule.json
UDP Rule > udp_rule.json
Email Rule > email_rule.json
Micro API Rule > micro_api_rule.json

#To populate the data into records,
<RECORD_ID>.json
#example
1001.json
1002.json

#To populate the data into messages,

<MESSAGE_ID>.json
#example
1001.json
1002.json
```
