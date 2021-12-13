# How to run the Platform Utilities?

```shell
> npm i platform-utilities -g
```

### Boodskap Utils Command
```shell
> boodskap <ACTION> <API_URL> <DOMAIN_KEY> <API_KEY> <PATH> <TYPE> <PROTOCOL>
```

#### ACTION (case in-sensitive)
INFO (info)<br>
EXPORT (export) <br>
IMPORT (import) <br>
POPULATE (populate)

#### API_URL 
Deployed platform api url

#### DOMAIN_KEY
Domain Key

#### API_KEY
API Key

#### PATH
Path argument mandatory for export, import & populate

#### TYPE (case in-sensitive)

MESSAGE (message) <br>
RECORD (record)<br>

###### Note: TYPE is not mandatory for info,export,import & populate

#### PROTOCOL (case in-sensitive)

HTTP (http) <br>
MQTT (mqtt)<br>

###### Note: PROTOCOL is not mandatory for info,export,import & populate. In default HTTP will be taken


### How to print the domain info?
```shell
> boodskap info <API_URL> <DOMAIN_KEY> <API_KEY>
```

#### Example
```shell
> boodskap info https://xxxxxx/api XXXXXXXX xxxxxxx
```

### How to export the domain rules & schema?

```shell
> boodskap export <API_URL> <DOMAIN_KEY> <API_KEY> <PATH>
```

###### Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>
PATH<br>

#### Example
```shell
> boodskap export https://xxxxxxx/api XXXXXXXX xxxxxxxx /export
```

### How to import the domain rules & schema?

```shell
> boodskap import <API_URL> <DOMAIN_KEY> <API_KEY> <PATH>
```

###### Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>
PATH<br>

#### Example
```shell
> boodskap import https://xxxxxxx/api XXXXXXXX xxxxxxx /import
```

### How to populate the data into records?

```shell
> boodskap populate <API_URL> <DOMAIN_KEY> <API_KEY> <PATH> <TYPE> <PROTOCOL>
```

###### Mandatory arguments, <br>
API_URL<br>
DOMAIN_KEY<br>
API_KEY<br>
PATH<br>
TYPE (MESSAGE/RECORD)<br>

if TYPE (MESSAGE) then next parameter will the PROTOCOL (HTTP/MQTT) in default HTTP post will trigger

#### Example
```shell
> boodskap populate https://xxxxxxx/api XXXXXXXX xxxxxxx /data RECORD
> boodskap populate https://xxxxxxx/api XXXXXXXX xxxxxxx /data MESSAGE
> boodskap populate https://xxxxxxx/api XXXXXXXX xxxxxxx /data MESSAGE HTTP
> boodskap populate https://xxxxxxx/api XXXXXXXX xxxxxxx /data MESSAGE MQTT
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
