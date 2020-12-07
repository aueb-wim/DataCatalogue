[![AUEB](https://img.shields.io/badge/AUEB-RC-red.svg)](https://www.aueb.gr/) [![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](https://github.com/HBPMedical/DataCatalogue/blob/master/LICENSE) [![CircleCI](https://circleci.com/gh/aueb-wim/DataCatalogue.svg?style=svg)](https://circleci.com/gh/aueb-wim/DataCatalogue)

# HBP-MIP DataCatalogue
## Overview
Data Catalogue (DC) is a component of the [Medical Informatics Platform](https://mip.ebrains.eu/) (MIP) for the [Human Brain Project](https://www.humanbrainproject.eu/). Initially, it was designed and tasked to be the single source of truth of metadata descriptions for data residing in hospitals that have joined the MIP. In the course of things, additional needs have been recognized; therefore DC ended up supporting the following:
* Presentation of the Medical Conditions to which data refer in the MIP.
* Presentation and visualisation of the Common Data Elements (CDEs) data models for the Medical Conditions in the MIP.
* Presentation and visualisation of the hospital local data models that have been mapped and harmonized to the CDE data models.
* Management (create, edit, delete) of the above (global and local) data models with version control by authorized accounts. Data models are defined via DC's GUI or are imported in XLSX format.
* Generation of metadata files in JSON format according to MIP's specifications.

## Users
The user of DC is the researcher who, prior to executing experiments with the MIP, needs to investigate the included Medical Conditions along with their semantics as well as what type of information is available in each hospital.

Another user is the data provider / manager of a hospital that has joined the MIP. The data provider / manager has to define and manage the metadata of her hospital data.

Lastly, the MIP portal itself is a DC user as it uses its REST API to get the latest CDEs versions.

## User Guide
### Informative Features (No login required)
The user can perform a set of actions without being logged in.

Common Data Elements (CDEs):
-   View all medical conditions [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/DCMedicalConditions.png)
-   Select the current or any previous version of the CDEs meta-data of a specific medical condition [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/CDEsVersion.png)
-   Search CDEs meta-data based on variables' category or code for a medical condition version [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/CDEsVersion.png)
-   View details about the meta-data [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/CDEsVersion.png)
-   Download the JSON that contains the meta-data that will be used in the MIP Federated Node for a specific medical condition [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/CDEsVersion.png)
-   View the hierarchy of the meta-data in an indexable tree structure [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/CDEsTree.png)

Hospital Meta-Data:
-   View the meta-data of all hospitals combined [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l1.png)
-   View the versions of the meta-data of each hospital and search with category and/or code [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l2.png)
-   Download the JSON that contains the meta-data of the hospital local data model [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l2.png)
-   View the hierarchy of the meta-data in an indexable tree structure [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l3.png)
-   View / Download / Index  the results of the Quality Control Tool for the meta-data [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l4.png)
-   View the graphical representation of how variables are mapped to CDEs and using which rule [here](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l5.png)

### Management Features (Login and appropriate role required)
Data Catalogue uses a keycloak instance setup for the MIP in order to authorize users. There are 3 role types available 
-   administrator - has access to everything
-   pathology owner - has access to everything that is included in a pathology (cde_version,hospital,local_version)
-   hospital owner - has access to everything that is included in a hospital (hospital,local version)

The extra actions that the user can do with appropriate role are the following:
-   Create a new medical condition **(administrator/pathology owner)**
-   Create/delete hospital **(administrator/pathology owner/hospital owner)**
-   Create/edit/delete a meta-data for global model using the GUI or uploading a file **(administrator/pathology owner)**
-   Create/edit/delete a meta-data for local hospitaldata model version using the GUI or uploading a file **(administrator/pathology owner/hospital owner)**
[step1](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l11.png), [step2](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l8_2.png), [step3](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l8_1.png) [step1](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l9.png), [step2](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l10.png)
-   Download a template file that contains the schema of the meta-data that should be completed **(anyone logged in)** [step1](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l9.png), [step2](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/l10.png)
## Installing / Getting started
### General Architecture
![architecture](https://github.com/HBPMedical/DataCatalogue/blob/master/frontend/src/assets/images/architecture.png) 

### Prerequisites

Required installed packages:

-   Java 1.8 (Oracle)
-   PostgreSQL 9.5
-   Spring Boot 2.1
-   Angular 6.2
-   Angular CLI 6.2
-   Typescript 2.9
-   D3 5.7

### Installation
Clone the repo:
```shell
git clone https://github.com/aueb-wim/DataCatalogue.git
```
After loging in PostgreSQL shell we create an empty database named datacatalog:
```shell
create database datacatalog;
```
##### Backend
Install Maven. In a terminal:
```shell
sudo apt install maven
```
Fill in the credentials that we use to login to PostgreSQL and the IP / port of the server at application.properties file in DataCatalogue:
-   spring.datasource.username= yourUser
-   spring.datasource.password= yourPassword
-   server.port=8086
-   server.address=172.16.10.138

Change the URL of the Authentication Entry Point in service/MIPSecurity.java line 150 if necessary.
Run spring boot:
```shell
mvn spring-boot:run
```
This will initiate the back end services.
##### Frontend
Need to have Angular and Angular CLI installed.
Having Angular already installed, inside the frontend directory run:
```shell
npm install
```
To configure frontend, change the following files with the correct URLs:
-   frontend/proxy.conf.js
-   frontend/proxy.conf.json
-   frontend/src/app/shared/hospital.service.ts
-   frontend/src/app/components/form-upload.component.ts
-   frontend/src/app/components/form-upload-cdes.component.ts

To initiate the frontend services, we use angular CLI:
``` shell 
cd DataCatalogue/frontend
ng serve --host 0.0.0.0
```
### For developers
Open the DataCatalogue project with any IDE (Intelij recommended).
To run Spring boot, execute the class DataCatalogueSpringBootApplication.
Frontend is initiated as said with ng serve.
## Authors

-   Admir Demiraj - AUEB/RC Team

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This work is part of HBP SGA2 T8.5.2 .

Special thanks to:

-   **Prof. Vasilis Vassalos** - Athens University of Economics and Business

