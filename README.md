[![AUEB](https://img.shields.io/badge/AUEB-RC-red.svg)](https://www.aueb.gr/) [![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](https://github.com/HBPMedical/DataCatalogue/blob/master/LICENSE) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/c08a182fec11456a8ba98ddeedb9ed4f)](https://www.codacy.com/app/iosifsp/QCtool?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=aueb-wim/QCtool&amp;utm_campaign=Badge_Grade) [![CircleCI](https://circleci.com/gh/aueb-wim/DataCatalogue.svg?style=svg)](https://circleci.com/gh/aueb-wim/DataCatalogue)

# HBP-MIP DataCatalogue
## Overview
This tool is a component developed for the [Human Brain Project Medical Informatics Platform](https://www.humanbrainproject.eu/en/medicine/medical-informatics-platform/) (HBP-MIP). Data Catalogue of HBP SGA2 T8.5.2 is an end-to-end platform, created with the latest technologies and tasked with versioning the meta-data of the hospital variables and the Common Data Elements (CDEs). It utilizes a global schema for the collection of the meta-data and provides information about the mappings of the variables to CDEs. DataCatalogue is currently being hosted [here](http://195.251.252.222:2442/hospitals/).

## Potential Users
The potential users of the tool are first of all the researchers that prior to executing experiments through the Portal of the MIP may want to investigate what type of information is available in each hospital. Moreover, the tool aims at facilitating the collaboration between the authorized hospital personnel and the development team of MIP.

## User Guide
### Informative View

Hospital Meta-Data:
-   View the meta-data of all hospitals combined 
-   View the meta-data of each specific hospital
-   Select the current or any previous version of the hospital meta-data
-   Search meta-data based on their category or code
-   View details about the meta-data
-   Download the json that contains the meta-data that will be used in the MIP Local Node
-   View the hierarchy of the meta-data in an indexable tree structure
-   View / Download / Index  the results of the Quality Control Tool for the meta-data
-   View the graphical representation of how variables should be mapped to CDEs and using which rule

Common Data Elements (CDEs):
-   Select the current or any previous version of the CDE meta-data
-   Search meta-data based on their category or code
-   View details about the meta-data
-   Download the json that contains the meta-data that will be used in the MIP Federated Node

## Installing / Getting started
### General Architecture

### Prerequisites

Required installed packages:

-   Java 1.8 (Oracle)
-   PostgreSQL 9.5
-   Spring Boot 2.1
-   Angular 6.2
-   Angular CLI 6.2
-   Typescript 2.9
-   D3 5.7

### Installation for developers

In a terminal we run:

```shell
git clone https://github.com/aueb-wim/DataCatalogue.git
```

We save the credentials that we use to login to PostgreSQL and the IP / port of the server at application.properties file in DataCatalogue:
-   spring.datasource.username= yourUser
-   spring.datasource.password= yourPassword
-   server.port=8086
-   server.address=172.16.10.138

After loging in PostgreSQL shell we create an empty database named datacatalog:
```shell
create database datacatalog;
```
We open the DataCatalogue project with any IDE (Intelij recommended) and we run the class DataCatalogueSpringBootApplication, that will initiate the back end services.

Finally we initiate the frontend services using angular CLI:
``` shell 
cd DataCatalogue/frontend
ng serve --host 0.0.0.0
```

## Authors

-   Admir Demiraj - AUEB/RC Team

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This work is part of HBP SGA2 T8.5.2 .

Special thanks to:

-   **Prof. Vasilis Vassalos** - Athens University of Economics and Business
