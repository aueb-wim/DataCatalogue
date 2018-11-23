import {Component, OnInit} from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";
import {Link, Node} from "../../d3/models";
import APP_CONFIG from "../../app.config";
import {TreeComponent} from "../../visuals/tree/tree.component";
@Component({
  selector: 'app-get-all-hospitals',
  templateUrl: './get-all-hospitals.component.html',
  styleUrls: ['./get-all-hospitals.component.css']
})



export class GetAllHospitalsComponent implements OnInit{

hospitals: Array<any>;
allVersionsPerHospital: Array<any>;
searchTermHosp: String;
searchTermVar: String;
searchTermVer: String;
hierarchical=false;
data3 = {
    "code": "root",
    "groups": [
      {
        "code": "genetic",
        "groups": [
          {
            "code": "polymorphism",
            "label": "polymorphism",
            "groups": [
              {
                "code": "apoe4",
                "description": "Apolipoprotein E (APOE) e4 allele: is the strongest risk factor for Late Onset Alzheimer Disease (LOAD). At least one copy of APOE-e4 ",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "ApoE4",
                "methodology": "adni-merge",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs3818361_t",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs3818361_T",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs744373_c",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs744373_C",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs190982_g",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs190982_G",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs1476679_c",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs1476679_C",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs11767557_c",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs11767557_C",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs11136000_t",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs11136000_T",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs610932_a",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs610932_A",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs3851179_a",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs3851179_A",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs17125944_c",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs17125944_C",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs10498633_t",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs10498633_T",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs3764650_g",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs3764650_G",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs3865444_t",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs3865444_T",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              },
              {
                "code": "rs2718058_g",
                "description": "",
                "enumerations": [
                  {
                    "code": 0,
                    "label": 0
                  },
                  {
                    "code": 1,
                    "label": 1
                  },
                  {
                    "code": 2,
                    "label": 2
                  }
                ],
                "label": "rs2718058_G",
                "methodology": "lren-nmm-volumes",
                "sql_type": "int",
                "type": "polynominal"
              }
            ]
          },

        ],
        "label": "Genetic"
      },
      {
        "code": "pet",
        "label": "PET - Positron Emission Tomography",
        "groups": [
          {
            "code": "fdg",
            "description": " Average FDG-PET of angular, temporal, and posterior cingulate. Most important hypometabolic regions that are indicative of pathological metabolic change in MCI and AD.",
            "label": "FDG-PET",
            "methodology": "adni-merge",
            "type": "real"
          },
          {
            "code": "pib",
            "description": "Average PIB SUVR of frontal cortex, anterior cingulate, precuneus cortex, and parietal cortex.",
            "label": "PIB",
            "methodology": "adni-merge",
            "type": "real"
          },
          {
            "code": "av45",
            "description": "AV45 Average AV45 SUVR of frontal, anterior cingulate, precuneus, and parietal cortex relative to the cerebellum",
            "label": "AV45",
            "methodology": "adni-merge",
            "type": "real"
          }
        ]
      }]};
data = {
    "parent": "",
    "children": [{
      "parent": "root",
      "children": [{
        "parent": "brain_anatomy",
        "children": [{
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightsmcsupplementarymotorcortex",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightsmcsupplementarymotorcortex",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftscasubcallosalarea",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftscasubcallosalarea",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftorifgorbitalpartoftheinferiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftorifgorbitalpartoftheinferiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftsmcsupplementarymotorcortex",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftsmcsupplementarymotorcortex",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftprgprecentralgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftprgprecentralgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftcocentraloperculum",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftcocentraloperculum",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightscasubcallosalarea",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightscasubcallosalarea",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftopifgopercularpartoftheinferiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftopifgopercularpartoftheinferiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightopifgopercularpartoftheinferiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightopifgopercularpartoftheinferiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmsfgsuperiorfrontalgyrusmedialsegment",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmsfgsuperiorfrontalgyrusmedialsegment",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftpoparietaloperculum",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftpoparietaloperculum",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "righttrifgtriangularpartoftheinferiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "righttrifgtriangularpartoftheinferiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftgregyrusrectus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftgregyrusrectus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftsfgsuperiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftsfgsuperiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmorgmedialorbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmorgmedialorbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmsfgsuperiorfrontalgyrusmedialsegment",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmsfgsuperiorfrontalgyrusmedialsegment",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftaorganteriororbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftaorganteriororbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightpoparietaloperculum",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightpoparietaloperculum",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmorgmedialorbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmorgmedialorbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightprgprecentralgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightprgprecentralgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightorifgorbitalpartoftheinferiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightorifgorbitalpartoftheinferiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmfgmiddlefrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmfgmiddlefrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftfofrontaloperculum",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftfofrontaloperculum",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftporgposteriororbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftporgposteriororbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "lefttrifgtriangularpartoftheinferiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "lefttrifgtriangularpartoftheinferiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightgregyrusrectus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightgregyrusrectus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmfgmiddlefrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmfgmiddlefrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmprgprecentralgyrusmedialsegment",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmprgprecentralgyrusmedialsegment",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmfcmedialfrontalcortex",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmfcmedialfrontalcortex",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightsfgsuperiorfrontalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightsfgsuperiorfrontalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmprgprecentralgyrusmedialsegment",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmprgprecentralgyrusmedialsegment",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightcocentraloperculum",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightcocentraloperculum",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftlorglateralorbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftlorglateralorbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightfrpfrontalpole",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightfrpfrontalpole",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftfrpfrontalpole",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftfrpfrontalpole",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightaorganteriororbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightaorganteriororbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmfcmedialfrontalcortex",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmfcmedialfrontalcortex",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightlorglateralorbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightlorglateralorbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightfofrontaloperculum",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightfofrontaloperculum",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightporgposteriororbitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightporgposteriororbitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "frontal"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "insula",
            "unit": "cm3",
            "code": "rightainsanteriorinsula",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightainsanteriorinsula",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "insula",
            "unit": "cm3",
            "code": "leftpinsposteriorinsula",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftpinsposteriorinsula",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "insula",
            "unit": "cm3",
            "code": "leftainsanteriorinsula",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftainsanteriorinsula",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "insula",
            "unit": "cm3",
            "code": "rightpinsposteriorinsula",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightpinsposteriorinsula",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "insula"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "parent": "cerebral_nuclei",
            "children": [{
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftbasalforebrain",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "leftbasalforebrain",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftputamen",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "leftputamen",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftcaudate",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "leftcaudate",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightpallidum",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "rightpallidum",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightputamen",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "rightputamen",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightbasalforebrain",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "rightbasalforebrain",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightcaudate",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "rightcaudate",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftpallidum",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "leftpallidum",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftaccumbensarea",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "leftaccumbensarea",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightaccumbensarea",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "rightaccumbensarea",
              "description": "",
              "type": "real",
              "methodology": ""
            }],
            "name": "basal_ganglia"
          }, {
            "parent": "cerebral_nuclei",
            "children": [{
              "canBeNull": "",
              "parent": "amygdala",
              "unit": "cm3",
              "code": "leftamygdala",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "leftamygdala",
              "description": "",
              "type": "real",
              "methodology": ""
            }, {
              "canBeNull": "",
              "parent": "amygdala",
              "unit": "cm3",
              "code": "rightamygdala",
              "comments": "",
              "csvFile": "custom_file",
              "values": "",
              "name": "rightamygdala",
              "description": "",
              "type": "real",
              "methodology": ""
            }],
            "name": "amygdala"
          }],
          "name": "cerebral_nuclei"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightpogpostcentralgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightpogpostcentralgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftpcuprecuneus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftpcuprecuneus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightmpogpostcentralgyrusmedialsegment",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmpogpostcentralgyrusmedialsegment",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftsmgsupramarginalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftsmgsupramarginalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftsplsuperiorparietallobule",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftsplsuperiorparietallobule",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightsmgsupramarginalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightsmgsupramarginalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightangangulargyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightangangulargyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightsplsuperiorparietallobule",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightsplsuperiorparietallobule",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftangangulargyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftangangulargyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftpogpostcentralgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftpogpostcentralgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftmpogpostcentralgyrusmedialsegment",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmpogpostcentralgyrusmedialsegment",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightpcuprecuneus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightpcuprecuneus",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "parietal"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "diencephalon",
            "unit": "cm3",
            "code": "leftventraldc",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftventraldc",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "diencephalon",
            "unit": "cm3",
            "code": "rightventraldc",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightventraldc",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "diencephalon"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightfugfusiformgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightfugfusiformgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "lefttmptemporalpole",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "lefttmptemporalpole",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftitginferiortemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftitginferiortemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightptplanumtemporale",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightptplanumtemporale",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightttgtransversetemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightttgtransversetemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightppplanumpolare",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightppplanumpolare",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftptplanumtemporale",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftptplanumtemporale",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftmtgmiddletemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmtgmiddletemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftttgtransversetemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftttgtransversetemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightitginferiortemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightitginferiortemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "righttmptemporalpole",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "righttmptemporalpole",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftppplanumpolare",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftppplanumpolare",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightmtgmiddletemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmtgmiddletemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftfugfusiformgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftfugfusiformgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftstgsuperiortemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftstgsuperiortemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightstgsuperiortemporalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightstgsuperiortemporalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "temporal"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "rightcerebellumexterior",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightcerebellumexterior",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "leftcerebellumexterior",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftcerebellumexterior",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "cerebellarvermallobulesiv",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "cerebellarvermallobulesiv",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "cerebellarvermallobulesviiix",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "cerebellarvermallobulesviiix",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "cerebellarvermallobulesvivii",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "cerebellarvermallobulesvivii",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "cerebellum"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightmogmiddleoccipitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmogmiddleoccipitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftliglingualgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftliglingualgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightofugoccipitalfusiformgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightofugoccipitalfusiformgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightsogsuperioroccipitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightsogsuperioroccipitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftcalccalcarinecortex",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftcalccalcarinecortex",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftocpoccipitalpole",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftocpoccipitalpole",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightliglingualgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightliglingualgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightioginferioroccipitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightioginferioroccipitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftmogmiddleoccipitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmogmiddleoccipitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightcalccalcarinecortex",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightcalccalcarinecortex",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftcuncuneus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftcuncuneus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightocpoccipitalpole",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightocpoccipitalpole",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftsogsuperioroccipitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftsogsuperioroccipitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightcuncuneus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightcuncuneus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftofugoccipitalfusiformgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftofugoccipitalfusiformgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftioginferioroccipitalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftioginferioroccipitalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "occipital"
        }, {
          "parent": "grey_matter_volume",
          "children": [{
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightpcggposteriorcingulategyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightpcggposteriorcingulategyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftmcggmiddlecingulategyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftmcggmiddlecingulategyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftpcggposteriorcingulategyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftpcggposteriorcingulategyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftententorhinalarea",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftententorhinalarea",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightententorhinalarea",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightententorhinalarea",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightphgparahippocampalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightphgparahippocampalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightacgganteriorcingulategyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightacgganteriorcingulategyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftacgganteriorcingulategyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftacgganteriorcingulategyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightmcggmiddlecingulategyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightmcggmiddlecingulategyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "righthippocampus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "righthippocampus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftphgparahippocampalgyrus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftphgparahippocampalgyrus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftthalamusproper",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "leftthalamusproper",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "lefthippocampus",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "lefthippocampus",
            "description": "",
            "type": "real",
            "methodology": ""
          }, {
            "canBeNull": "",
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightthalamusproper",
            "comments": "",
            "csvFile": "custom_file",
            "values": "",
            "name": "rightthalamusproper",
            "description": "",
            "type": "real",
            "methodology": ""
          }],
          "name": "limbic"
        }],
        "name": "grey_matter_volume"
      }, {
        "parent": "brain_anatomy",
        "children": [{
          "canBeNull": "",
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "_4thventricle",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "_4thventricle",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "leftinflatvent",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "leftinflatvent",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "_3rdventricle",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "_3rdventricle",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "leftlateralventricle",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "leftlateralventricle",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "csfglobal",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "csfglobal",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "rightinflatvent",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "rightinflatvent",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "rightlateralventricle",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "rightlateralventricle",
          "description": "",
          "type": "real",
          "methodology": ""
        }],
        "name": "csf_volume"
      }, {
        "parent": "brain_anatomy",
        "children": [{
          "canBeNull": "",
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "opticchiasm",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "opticchiasm",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "rightcerebralwhitematter",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "rightcerebralwhitematter",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "leftcerebralwhitematter",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "leftcerebralwhitematter",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "leftcerebellumwhitematter",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "leftcerebellumwhitematter",
          "description": "",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "rightcerebellumwhitematter",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "rightcerebellumwhitematter",
          "description": "",
          "type": "real",
          "methodology": ""
        }],
        "name": "white_matter_volume"
      }],
      "name": "brain_anatomy"
    }, {
      "parent": "root",
      "children": [{
        "parent": "genetic",
        "children": [{
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs190982_g",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs190982_g",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs11136000_t",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs11136000_t",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs3851179_a",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3851179_a",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "apoe4",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "apoe4",
          "description": "Apolipoprotein E (APOE) e4 allele: is the strongest risk factor for Late Onset Alzheimer Disease (LOAD). At least one copy of APOE-e4 ",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs1476679_c",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs1476679_c",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs10498633_t",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs10498633_t",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs3865444_t",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3865444_t",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs610932_a",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs610932_a",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs3764650_g",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3764650_g",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs744373_c",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs744373_c",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs3818361_t",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3818361_t",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs11767557_c",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs11767557_c",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs17125944_c",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs17125944_c",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "polymorphism",
          "unit": "",
          "code": "rs2718058_g",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs2718058_g",
          "description": "",
          "type": "polynominal",
          "methodology": ""
        }],
        "name": "polymorphism"
      }],
      "name": "genetic"
    }, {
      "parent": "root",
      "children": [{
        "parent": "proteome",
        "children": [{
          "canBeNull": "",
          "parent": "csf_proteome",
          "unit": "",
          "code": "t_tau",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "t_tau",
          "description": "Tau proteins (or \\u03c4 proteins) are proteins that stabilize microtubules. They are abundant in neurons of the central nervous system and are less common elsewhere, but are also expressed at very low levels in CNS astrocytes and oligodendrocytes. Pathologies and dementias of the nervous system such as Alzheimer''s disease and Parkinson''s disease are associated with tau proteins that have become defective and no longer stabilize microtubules properly.",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_proteome",
          "unit": "",
          "code": "p_tau",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "p_tau",
          "description": "Hyperphosphorylation of the tau protein (tau inclusions, pTau) can result in the self-assembly of tangles of paired helical filaments and straight filaments, which are involved in the pathogenesis of Alzheimer''s disease, frontotemporal dementia, and other tauopathies.",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_proteome",
          "unit": "",
          "code": "ab1_42",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "ab1_42",
          "description": "A\\u03b2 is the main component of amyloid plaques (extracellular deposits found in the brains of patients with Alzheimer''s disease). Similar plaques appear in some variants of Lewy body dementia and in inclusion body myositis (a muscle disease), while A\\u03b2 can also form the aggregates that coat cerebral blood vessels in cerebral amyloid angiopathy. The plaques are composed of a tangle of regularly ordered fibrillar aggregates called amyloid fibers, a protein fold shared by other peptides such as the prions associated with protein misfolding diseases.",
          "type": "real",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "csf_proteome",
          "unit": "",
          "code": "ab1_40",
          "comments": "",
          "csvFile": "custom_file",
          "values": "",
          "name": "ab1_40",
          "description": "A\\u03b2 is the main component of amyloid plaques (extracellular deposits found in the brains of patients with Alzheimer''s disease). Similar plaques appear in some variants of Lewy body dementia and in inclusion body myositis (a muscle disease), while A\\u03b2 can also form the aggregates that coat cerebral blood vessels in cerebral amyloid angiopathy. The plaques are composed of a tangle of regularly ordered fibrillar aggregates called amyloid fibers, a protein fold shared by other peptides such as the prions associated with protein misfolding diseases.",
          "type": "real",
          "methodology": ""
        }],
        "name": "csf_proteome"
      }],
      "name": "proteome"
    }, {
      "parent": "root",
      "children": [{
        "canBeNull": "",
        "parent": "demographics",
        "unit": "",
        "code": "agegroup",
        "comments": "",
        "csvFile": "custom_file",
        "values": "“-50y”,”50-59y”,”60-69y”,”70-79y”,”+80y”",
        "name": "agegroup",
        "description": "",
        "type": "polynominal",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "demographics",
        "unit": "months",
        "code": "subjectage",
        "comments": "",
        "csvFile": "custom_file",
        "values": "0-11",
        "name": "subjectage",
        "description": "Exact age of the subject  for datasets that allow such precision.",
        "type": "real",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "demographics",
        "unit": "",
        "code": "handedness",
        "comments": "",
        "csvFile": "custom_file",
        "values": "“R”,”L”,”A”",
        "name": "handedness",
        "description": "Describes the tendency of the patient to use either the right or the left hand more naturally than the other.",
        "type": "polynominal",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "demographics",
        "unit": "",
        "code": "gender",
        "comments": "",
        "csvFile": "custom_file",
        "values": "“M”,”F”",
        "name": "gender",
        "description": "Gender of the patient - Sex assigned at birth",
        "type": "binominal",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "demographics",
        "unit": "years",
        "code": "subjectageyears",
        "comments": "",
        "csvFile": "custom_file",
        "values": "0-130",
        "name": "subjectageyears",
        "description": "Subject age in years.",
        "type": "integer",
        "methodology": ""
      }],
      "name": "demographics"
    }, {
      "canBeNull": "",
      "parent": "root",
      "unit": "",
      "code": "dataset",
      "comments": "",
      "csvFile": "custom_file",
      "values": "“edsd”,”adni”,”ppmi”",
      "name": "dataset",
      "description": "Variable used to differentiate datasets",
      "type": "polynominal",
      "methodology": ""
    }, {
      "parent": "root",
      "children": [{
        "parent": "neuropsychology",
        "children": [{
          "canBeNull": "",
          "parent": "updrs",
          "unit": "",
          "code": "updrshy",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0-5",
          "name": "updrshy",
          "description": "The Hoehn and Yahr scale (HY) is a widely used clinical rating scale  which defines broad categories of motor function in Parkinson\\u2019s disease (PD). It captures typical patterns of progressive motor impairment.",
          "type": "integer",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "updrs",
          "unit": "",
          "code": "updrstotal",
          "comments": "",
          "csvFile": "custom_file",
          "values": "0-172",
          "name": "updrstotal",
          "description": "The unified Parkinson s disease rating scale (UPDRS) is used to follow the longitudinal course of Parkinson s disease. The UPD rating scale is the most commonly used scale in the clinical study of Parkinson s disease.",
          "type": "integer",
          "methodology": ""
        }],
        "name": "updrs"
      }, {
        "canBeNull": "",
        "parent": "neuropsychology",
        "unit": "",
        "code": "minimentalstate",
        "comments": "",
        "csvFile": "custom_file",
        "values": "0-30",
        "name": "minimentalstate",
        "description": "The Mini Mental State Examination (MMSE) or Folstein test is a 30-point questionnaire that is used extensively in clinical and research settings to measure cognitive impairment. It is commonly used to screen for dementia.",
        "type": "integer",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "neuropsychology",
        "unit": "",
        "code": "montrealcognitiveassessment",
        "comments": "",
        "csvFile": "custom_file",
        "values": "0-30",
        "name": "montrealcognitiveassessment",
        "description": "The Montreal Cognitive Assessment (MoCA) was designed as a rapid screening instrument for mild cognitive dysfunction. It assesses different cognitive domains: attention and concentration  executive functions  memory  language  visuoconstructional skills  conceptual thinking  calculations  and orientation. MoCA Total Scores refer to the final count obtained by patients after the complete test is performed.",
        "type": "integer",
        "methodology": ""
      }],
      "name": "neuropsychology"
    }, {
      "canBeNull": "",
      "parent": "root",
      "unit": "cm3",
      "code": "brainstem",
      "comments": "",
      "csvFile": "custom_file",
      "values": "",
      "name": "brainstem",
      "description": "Brainstem volume",
      "type": "real",
      "methodology": ""
    }, {
      "parent": "root",
      "children": [{
        "canBeNull": "",
        "parent": "pet",
        "unit": "",
        "code": "pib",
        "comments": "",
        "csvFile": "custom_file",
        "values": "",
        "name": "pib",
        "description": "Average PIB SUVR of frontal cortex  anterior cingulate  precuneus cortex  and parietal cortex.",
        "type": "real",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "pet",
        "unit": "",
        "code": "fdg",
        "comments": "",
        "csvFile": "custom_file",
        "values": "",
        "name": "fdg",
        "description": "Average FDG-PET of angular  temporal  and posterior cingulate. Most important hypometabolic regions that are indicative of pathological metabolic change in MCI and AD.",
        "type": "real",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "pet",
        "unit": "",
        "code": "av45",
        "comments": "",
        "csvFile": "custom_file",
        "values": "",
        "name": "av45",
        "description": "AV45 Average AV45 SUVR of frontal  anterior cingulate  precuneus  and parietal cortex\\nrelative to the cerebellum",
        "type": "real",
        "methodology": ""
      }],
      "name": "pet"
    }, {
      "parent": "root",
      "children": [{
        "parent": "diagnosis",
        "children": [{
          "canBeNull": "",
          "parent": "dataset_specific_diagnosis",
          "unit": "",
          "code": "ppmicategory",
          "comments": "",
          "csvFile": "custom_file",
          "values": "“PD”,”HC”,”PRODROMA”,”GENPD”,”REGUN”,”REGPD”,”REGUN”",
          "name": "ppmicategory",
          "description": "Terms aggregating the Parkinson s diseases into classes. For this instance the diagnosis given at enrollment is taken as the clinical diagnosis. Note that the diagnosis in this categories are given only for the PPMI data set.",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "dataset_specific_diagnosis",
          "unit": "",
          "code": "edsdcategory",
          "comments": "",
          "csvFile": "custom_file",
          "values": "“AD”,”MCI”,”CN”",
          "name": "edsdcategory",
          "description": "Terms aggregating illnesses into classes. Note that the diagnosis in this categories are given only for the EDSD data set.",
          "type": "polynominal",
          "methodology": ""
        }, {
          "canBeNull": "",
          "parent": "dataset_specific_diagnosis",
          "unit": "",
          "code": "adnicategory",
          "comments": "",
          "csvFile": "custom_file",
          "values": "“AD”,”MCI”,”CN”",
          "name": "adnicategory",
          "description": "Terms aggregating illnesses into classes. Note that the diagnosis in this categories are given only for the ADNI data set.",
          "type": "polynominal",
          "methodology": ""
        }],
        "name": "dataset_specific_diagnosis"
      }, {
        "canBeNull": "",
        "parent": "diagnosis",
        "unit": "",
        "code": "neurodegenerativescategories",
        "comments": "",
        "csvFile": "custom_file",
        "values": "“PD”,”AD”,”HD”,”ALS”,”BD”,”MCI”,”LBD”,”CJD”,”FTD”,”MD”,”CN”",
        "name": "neurogenerativescategories",
        "description": "There will be two broad categories taken into account. Parkinson s disease without disability or light disability: Without fluctuation of the effect. Dementia in Parkinson s disease",
        "type": "polynominal",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "diagnosis",
        "unit": "",
        "code": "alzheimerbroadcategory",
        "comments": "",
        "csvFile": "custom_file",
        "values": "“PD”,”CN”,”Other”",
        "name": "alzheimerbroadcategory",
        "description": "There will be two broad categories taken into account. Alzheimer s disease (AD) in which the diagnostic is 100% certain and <Other> comprising the rest of Alzheimer s related categories. The <Other> category refers to Alzheime s related diagnosis which origin can be traced to other pathology eg. vascular. In this category MCI diagnosis can also be found. In summary  all Alzheimer s related diagnosis that are not pure.",
        "type": "polynominal",
        "methodology": ""
      }, {
        "canBeNull": "",
        "parent": "diagnosis",
        "unit": "",
        "code": "parkinsonbroadcategory",
        "comments": "",
        "csvFile": "custom_file",
        "values": "“PD”,”CN”,”Other”",
        "name": "parkinsonbroadcategory",
        "description": "There will be two broad categories taken into account. Parkinson s disease without disability or light disability: Without fluctuation of the effect. Dementia in Parkinson s disease",
        "type": "polynominal",
        "methodology": ""
      }],
      "name": "diagnosis"
    }, {
      "parent": "root",
      "name": "brain_anatomygrey_matter_volume"
    }, {
      "canBeNull": "",
      "parent": "root",
      "unit": "cm3",
      "code": "tiv",
      "comments": "",
      "csvFile": "custom_file",
      "values": "",
      "name": "tiv",
      "description": "Total intra-cranial volume",
      "type": "real",
      "methodology": ""
    }],
    "name": "root"
  };
dataList = {
    "code": "root",
    "children": [{
      "parent": "root",
      "code": "brain_anatomy",
      "comments": "Variables category",
      "csvFile": "custom_file",
      "children": [{
        "parent": "brain_anatomy",
        "code": "white_matter_volume",
        "comments": "Variables category",
        "csvFile": "custom_file",
        "children": [{
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "rightcerebralwhitematter",
          "csvFile": "custom_file",
          "name": "Right Cerebral White Matter",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/white_matter_volume\/rightcerebralwhitematter"
        }, {
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "rightcerebellumwhitematter",
          "csvFile": "custom_file",
          "name": "Right Cerebellum White Matter",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/white_matter_volume\/rightcerebellumwhitematter"
        }, {
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "leftcerebellumwhitematter",
          "csvFile": "custom_file",
          "name": "Left Cerebellum White Matter",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/white_matter_volume\/leftcerebellumwhitematter"
        }, {
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "leftcerebralwhitematter",
          "csvFile": "custom_file",
          "name": "Left Cerebral White Matter",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/white_matter_volume\/leftcerebralwhitematter"
        }, {
          "parent": "white_matter_volume",
          "unit": "cm3",
          "code": "opticchiasm",
          "csvFile": "custom_file",
          "name": "Optic chiasm",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/white_matter_volume\/opticchiasm"
        }],
        "name": "White matter volume",
        "conceptPath": "\/root\/brain_anatomy\/white_matter_volume\/"
      }, {
        "parent": "brain_anatomy",
        "code": "grey_matter_volume",
        "comments": "Variables category",
        "csvFile": "custom_file",
        "children": [{
          "parent": "grey_matter_volume",
          "code": "frontal",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightfrpfrontalpole",
            "csvFile": "custom_file",
            "name": "Right frontal pole",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightfrpfrontalpole"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "lefttrifgtriangularpartoftheinferiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Left triangular part of the inferior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/lefttrifgtriangularpartoftheinferiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmfcmedialfrontalcortex",
            "csvFile": "custom_file",
            "name": "Left medial frontal cortex",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftmfcmedialfrontalcortex"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmprgprecentralgyrusmedialsegment",
            "csvFile": "custom_file",
            "name": "Right precentral gyrus medial segment",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightmprgprecentralgyrusmedialsegment"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightscasubcallosalarea",
            "csvFile": "custom_file",
            "name": "Right subcallosal area",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightscasubcallosalarea"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightporgposteriororbitalgyrus",
            "csvFile": "custom_file",
            "name": "Right posterior orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightporgposteriororbitalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftsfgsuperiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Left superior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftsfgsuperiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightorifgorbitalpartoftheinferiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Right orbital part of the inferior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightorifgorbitalpartoftheinferiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightfofrontaloperculum",
            "csvFile": "custom_file",
            "name": "Right frontal operculum",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightfofrontaloperculum"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightgregyrusrectus",
            "csvFile": "custom_file",
            "name": "Right gyrus rectus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightgregyrusrectus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftopifgopercularpartoftheinferiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Left opercular part of the inferior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftopifgopercularpartoftheinferiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightsfgsuperiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Right superior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightsfgsuperiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightlorglateralorbitalgyrus",
            "csvFile": "custom_file",
            "name": "Right lateral orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightlorglateralorbitalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftlorglateralorbitalgyrus",
            "csvFile": "custom_file",
            "name": "Left lateral orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftlorglateralorbitalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmfcmedialfrontalcortex",
            "csvFile": "custom_file",
            "name": "Right medial frontal cortex",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightmfcmedialfrontalcortex"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftfofrontaloperculum",
            "csvFile": "custom_file",
            "name": "Left frontal operculum",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftfofrontaloperculum"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftscasubcallosalarea",
            "csvFile": "custom_file",
            "name": "Left subcallosal area",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftscasubcallosalarea"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightsmcsupplementarymotorcortex",
            "csvFile": "custom_file",
            "name": "Right supplementary motor cortex",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightsmcsupplementarymotorcortex"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftporgposteriororbitalgyrus",
            "csvFile": "custom_file",
            "name": "Left posterior orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftporgposteriororbitalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmfgmiddlefrontalgyrus",
            "csvFile": "custom_file",
            "name": "Right middle frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightmfgmiddlefrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightcocentraloperculum",
            "csvFile": "custom_file",
            "name": "Right central operculum",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightcocentraloperculum"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftpoparietaloperculum",
            "csvFile": "custom_file",
            "name": "Left parietal operculum",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftpoparietaloperculum"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftsmcsupplementarymotorcortex",
            "csvFile": "custom_file",
            "name": "Left supplementary motor cortex",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftsmcsupplementarymotorcortex"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightprgprecentralgyrus",
            "csvFile": "custom_file",
            "name": "Right precentral gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightprgprecentralgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmsfgsuperiorfrontalgyrusmedialsegment",
            "csvFile": "custom_file",
            "name": "Right superior frontal gyrus medial segment",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightmsfgsuperiorfrontalgyrusmedialsegment"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmfgmiddlefrontalgyrus",
            "csvFile": "custom_file",
            "name": "Left middle frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftmfgmiddlefrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmorgmedialorbitalgyrus",
            "csvFile": "custom_file",
            "name": "Left medial orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftmorgmedialorbitalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftaorganteriororbitalgyrus",
            "csvFile": "custom_file",
            "name": "Left anterior orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftaorganteriororbitalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftfrpfrontalpole",
            "csvFile": "custom_file",
            "name": "Left frontal pole",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftfrpfrontalpole"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmprgprecentralgyrusmedialsegment",
            "csvFile": "custom_file",
            "name": "Left precentral gyrus medial segment",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftmprgprecentralgyrusmedialsegment"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftorifgorbitalpartoftheinferiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Left orbital part of the inferior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftorifgorbitalpartoftheinferiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "righttrifgtriangularpartoftheinferiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Right triangular part of the inferior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/righttrifgtriangularpartoftheinferiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftcocentraloperculum",
            "csvFile": "custom_file",
            "name": "Left central operculum",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftcocentraloperculum"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightpoparietaloperculum",
            "csvFile": "custom_file",
            "name": "Right parietal operculum",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightpoparietaloperculum"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightopifgopercularpartoftheinferiorfrontalgyrus",
            "csvFile": "custom_file",
            "name": "Right opercular part of the inferior frontal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightopifgopercularpartoftheinferiorfrontalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftmsfgsuperiorfrontalgyrusmedialsegment",
            "csvFile": "custom_file",
            "name": "Left superior frontal gyrus medial segment",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftmsfgsuperiorfrontalgyrusmedialsegment"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftprgprecentralgyrus",
            "csvFile": "custom_file",
            "name": "Left precentral gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftprgprecentralgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightaorganteriororbitalgyrus",
            "csvFile": "custom_file",
            "name": "Right anterior orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightaorganteriororbitalgyrus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "leftgregyrusrectus",
            "csvFile": "custom_file",
            "name": "Left gyrus rectus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/leftgregyrusrectus"
          }, {
            "parent": "frontal",
            "unit": "cm3",
            "code": "rightmorgmedialorbitalgyrus",
            "csvFile": "custom_file",
            "name": "Right medial orbital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/rightmorgmedialorbitalgyrus"
          }],
          "name": "Frontal",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/frontal\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "parietal",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightmpogpostcentralgyrusmedialsegment",
            "csvFile": "custom_file",
            "name": "Right postcentral gyrus medial segment",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/rightmpogpostcentralgyrusmedialsegment"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightangangulargyrus",
            "csvFile": "custom_file",
            "name": "Right angular gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/rightangangulargyrus"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightsmgsupramarginalgyrus",
            "csvFile": "custom_file",
            "name": "Right supramarginal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/rightsmgsupramarginalgyrus"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightpcuprecuneus",
            "csvFile": "custom_file",
            "name": "Right precuneus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/rightpcuprecuneus"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftpogpostcentralgyrus",
            "csvFile": "custom_file",
            "name": "Left postcentral gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/leftpogpostcentralgyrus"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightsplsuperiorparietallobule",
            "csvFile": "custom_file",
            "name": "Right superior parietal lobule",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/rightsplsuperiorparietallobule"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "rightpogpostcentralgyrus",
            "csvFile": "custom_file",
            "name": "Right postcentral gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/rightpogpostcentralgyrus"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftsplsuperiorparietallobule",
            "csvFile": "custom_file",
            "name": "Left superior parietal lobule",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/leftsplsuperiorparietallobule"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftmpogpostcentralgyrusmedialsegment",
            "csvFile": "custom_file",
            "name": "Left postcentral gyrus medial segment",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/leftmpogpostcentralgyrusmedialsegment"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftangangulargyrus",
            "csvFile": "custom_file",
            "name": "Left angular gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/leftangangulargyrus"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftpcuprecuneus",
            "csvFile": "custom_file",
            "name": "Left precuneus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/leftpcuprecuneus"
          }, {
            "parent": "parietal",
            "unit": "cm3",
            "code": "leftsmgsupramarginalgyrus",
            "csvFile": "custom_file",
            "name": "Left supramarginal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/leftsmgsupramarginalgyrus"
          }],
          "name": "Parietal",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/parietal\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "temporal",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "temporal",
            "unit": "cm3",
            "code": "lefttmptemporalpole",
            "csvFile": "custom_file",
            "name": "Left temporal pole",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/lefttmptemporalpole"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftstgsuperiortemporalgyrus",
            "csvFile": "custom_file",
            "name": "Left superior temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/leftstgsuperiortemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightppplanumpolare",
            "csvFile": "custom_file",
            "name": "Right planum polare",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/rightppplanumpolare"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightitginferiortemporalgyrus",
            "csvFile": "custom_file",
            "name": "Right inferior temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/rightitginferiortemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftppplanumpolare",
            "csvFile": "custom_file",
            "name": "Left planum polare",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/leftppplanumpolare"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftitginferiortemporalgyrus",
            "csvFile": "custom_file",
            "name": "Left inferior temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/leftitginferiortemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightmtgmiddletemporalgyrus",
            "csvFile": "custom_file",
            "name": "Right middle temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/rightmtgmiddletemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightstgsuperiortemporalgyrus",
            "csvFile": "custom_file",
            "name": "Right superior temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/rightstgsuperiortemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightfugfusiformgyrus",
            "csvFile": "custom_file",
            "name": "Right fusiform gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/rightfugfusiformgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftmtgmiddletemporalgyrus",
            "csvFile": "custom_file",
            "name": "Left middle temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/leftmtgmiddletemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftttgtransversetemporalgyrus",
            "csvFile": "custom_file",
            "name": "Left transverse temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/leftttgtransversetemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightttgtransversetemporalgyrus",
            "csvFile": "custom_file",
            "name": "Right transverse temporal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/rightttgtransversetemporalgyrus"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "righttmptemporalpole",
            "csvFile": "custom_file",
            "name": "Right temporal pole",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/righttmptemporalpole"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "rightptplanumtemporale",
            "csvFile": "custom_file",
            "name": "Right planum temporale",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/rightptplanumtemporale"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftptplanumtemporale",
            "csvFile": "custom_file",
            "name": "Left planum temporale",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/leftptplanumtemporale"
          }, {
            "parent": "temporal",
            "unit": "cm3",
            "code": "leftfugfusiformgyrus",
            "csvFile": "custom_file",
            "name": "Left fusiform gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/leftfugfusiformgyrus"
          }],
          "name": "Temporal",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/temporal\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "cerebral_nuclei",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "cerebral_nuclei",
            "code": "basal_ganglia",
            "comments": "Variables category",
            "csvFile": "custom_file",
            "children": [{
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftcaudate",
              "csvFile": "custom_file",
              "name": "Left Caudate",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/leftcaudate"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightpallidum",
              "csvFile": "custom_file",
              "name": "Right Pallidum",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/rightpallidum"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightcaudate",
              "csvFile": "custom_file",
              "name": "Right Caudate",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/rightcaudate"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightbasalforebrain",
              "csvFile": "custom_file",
              "name": "Right Basal Forebrain",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/rightbasalforebrain"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightputamen",
              "csvFile": "custom_file",
              "name": "Right Putamen",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/rightputamen"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "rightaccumbensarea",
              "csvFile": "custom_file",
              "name": "Right Accumbens Area",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/rightaccumbensarea"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftputamen",
              "csvFile": "custom_file",
              "name": "Left Putamen",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/leftputamen"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftpallidum",
              "csvFile": "custom_file",
              "name": "Left Pallidum",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/leftpallidum"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftaccumbensarea",
              "csvFile": "custom_file",
              "name": "Left Accumbens Area",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/leftaccumbensarea"
            }, {
              "parent": "basal_ganglia",
              "unit": "cm3",
              "code": "leftbasalforebrain",
              "csvFile": "custom_file",
              "name": "Left Basal Forebrain",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/leftbasalforebrain"
            }],
            "name": "Basal Ganglia",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/basal_ganglia\/"
          }, {
            "parent": "cerebral_nuclei",
            "code": "amygdala",
            "comments": "Variables category",
            "csvFile": "custom_file",
            "children": [{
              "parent": "amygdala",
              "unit": "cm3",
              "code": "rightamygdala",
              "csvFile": "custom_file",
              "name": "Right Amygdala",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/amygdala\/rightamygdala"
            }, {
              "parent": "amygdala",
              "unit": "cm3",
              "code": "leftamygdala",
              "csvFile": "custom_file",
              "name": "Left Amygdala",
              "type": "real",
              "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/amygdala\/leftamygdala"
            }],
            "name": "Amygdala",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/amygdala\/"
          }],
          "name": "Cerebral nuclei",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebral_nuclei\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "limbic",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "limbic",
            "unit": "cm3",
            "code": "lefthippocampus",
            "csvFile": "custom_file",
            "name": "Left Hippocampus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/lefthippocampus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightpcggposteriorcingulategyrus",
            "csvFile": "custom_file",
            "name": "Right posterior cingulate gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/rightpcggposteriorcingulategyrus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightmcggmiddlecingulategyrus",
            "csvFile": "custom_file",
            "name": "Right middle cingulate gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/rightmcggmiddlecingulategyrus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightententorhinalarea",
            "csvFile": "custom_file",
            "name": "Right entorhinal area",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/rightententorhinalarea"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftententorhinalarea",
            "csvFile": "custom_file",
            "name": "Left entorhinal area",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/leftententorhinalarea"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftphgparahippocampalgyrus",
            "csvFile": "custom_file",
            "name": "Left parahippocampal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/leftphgparahippocampalgyrus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "righthippocampus",
            "csvFile": "custom_file",
            "name": "Right Hippocampus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/righthippocampus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightphgparahippocampalgyrus",
            "csvFile": "custom_file",
            "name": "Right parahippocampal gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/rightphgparahippocampalgyrus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftpcggposteriorcingulategyrus",
            "csvFile": "custom_file",
            "name": "Left posterior cingulate gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/leftpcggposteriorcingulategyrus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftthalamusproper",
            "csvFile": "custom_file",
            "name": "Left Thalamus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/leftthalamusproper"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightacgganteriorcingulategyrus",
            "csvFile": "custom_file",
            "name": "Right anterior cingulate gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/rightacgganteriorcingulategyrus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftmcggmiddlecingulategyrus",
            "csvFile": "custom_file",
            "name": "Left middle cingulate gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/leftmcggmiddlecingulategyrus"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "rightthalamusproper",
            "csvFile": "custom_file",
            "name": "Right Thalamus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/rightthalamusproper"
          }, {
            "parent": "limbic",
            "unit": "cm3",
            "code": "leftacgganteriorcingulategyrus",
            "csvFile": "custom_file",
            "name": "Left anterior cingulate gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/leftacgganteriorcingulategyrus"
          }],
          "name": "Limbic",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/limbic\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "occipital",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightcalccalcarinecortex",
            "csvFile": "custom_file",
            "name": "Right calcarine cortex",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightcalccalcarinecortex"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftocpoccipitalpole",
            "csvFile": "custom_file",
            "name": "Left occipital pole",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftocpoccipitalpole"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightliglingualgyrus",
            "csvFile": "custom_file",
            "name": "Right lingual gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightliglingualgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightsogsuperioroccipitalgyrus",
            "csvFile": "custom_file",
            "name": "Right superior occipital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightsogsuperioroccipitalgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftcuncuneus",
            "csvFile": "custom_file",
            "name": "Left cuneus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftcuncuneus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightocpoccipitalpole",
            "csvFile": "custom_file",
            "name": "Right occipital pole",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightocpoccipitalpole"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftliglingualgyrus",
            "csvFile": "custom_file",
            "name": "Left lingual gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftliglingualgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightofugoccipitalfusiformgyrus",
            "csvFile": "custom_file",
            "name": "Right occipital fusiform gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightofugoccipitalfusiformgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftmogmiddleoccipitalgyrus",
            "csvFile": "custom_file",
            "name": "Left middle occipital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftmogmiddleoccipitalgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightmogmiddleoccipitalgyrus",
            "csvFile": "custom_file",
            "name": "Right middle occipital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightmogmiddleoccipitalgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftioginferioroccipitalgyrus",
            "csvFile": "custom_file",
            "name": "Left inferior occipital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftioginferioroccipitalgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftsogsuperioroccipitalgyrus",
            "csvFile": "custom_file",
            "name": "Left superior occipital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftsogsuperioroccipitalgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightcuncuneus",
            "csvFile": "custom_file",
            "name": "Right cuneus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightcuncuneus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftcalccalcarinecortex",
            "csvFile": "custom_file",
            "name": "Left calcarine cortex",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftcalccalcarinecortex"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "leftofugoccipitalfusiformgyrus",
            "csvFile": "custom_file",
            "name": "Left occipital fusiform gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/leftofugoccipitalfusiformgyrus"
          }, {
            "parent": "occipital",
            "unit": "cm3",
            "code": "rightioginferioroccipitalgyrus",
            "csvFile": "custom_file",
            "name": "Right inferior occipital gyrus",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/rightioginferioroccipitalgyrus"
          }],
          "name": "Occipital",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/occipital\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "insula",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "insula",
            "unit": "cm3",
            "code": "leftpinsposteriorinsula",
            "csvFile": "custom_file",
            "name": "Left posterior insula",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/insula\/leftpinsposteriorinsula"
          }, {
            "parent": "insula",
            "unit": "cm3",
            "code": "rightpinsposteriorinsula",
            "csvFile": "custom_file",
            "name": "Right posterior insula",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/insula\/rightpinsposteriorinsula"
          }, {
            "parent": "insula",
            "unit": "cm3",
            "code": "rightainsanteriorinsula",
            "csvFile": "custom_file",
            "name": "Right anterior insula",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/insula\/rightainsanteriorinsula"
          }, {
            "parent": "insula",
            "unit": "cm3",
            "code": "leftainsanteriorinsula",
            "csvFile": "custom_file",
            "name": "Left anterior insula",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/insula\/leftainsanteriorinsula"
          }],
          "name": "Insula",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/insula\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "cerebellum",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "leftcerebellumexterior",
            "csvFile": "custom_file",
            "name": "Left Cerebellum Exterior",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebellum\/leftcerebellumexterior"
          }, {
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "rightcerebellumexterior",
            "csvFile": "custom_file",
            "name": "Right Cerebellum Exterior",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebellum\/rightcerebellumexterior"
          }, {
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "cerebellarvermallobulesviiix",
            "csvFile": "custom_file",
            "name": "Cerebellar Vermal Lobules VIII-X",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebellum\/cerebellarvermallobulesviiix"
          }, {
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "cerebellarvermallobulesvivii",
            "csvFile": "custom_file",
            "name": "Cerebellar Vermal Lobules VI-VII",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebellum\/cerebellarvermallobulesvivii"
          }, {
            "parent": "cerebellum",
            "unit": "cm3",
            "code": "cerebellarvermallobulesiv",
            "csvFile": "custom_file",
            "name": "Cerebellar Vermal Lobules I-V",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebellum\/cerebellarvermallobulesiv"
          }],
          "name": "Cerebellum",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/cerebellum\/"
        }, {
          "parent": "grey_matter_volume",
          "code": "diencephalon",
          "comments": "Variables category",
          "csvFile": "custom_file",
          "children": [{
            "parent": "diencephalon",
            "unit": "cm3",
            "code": "rightventraldc",
            "csvFile": "custom_file",
            "name": "Right Ventral DC",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/diencephalon\/rightventraldc"
          }, {
            "parent": "diencephalon",
            "unit": "cm3",
            "code": "leftventraldc",
            "csvFile": "custom_file",
            "name": "Left Ventral DC",
            "type": "real",
            "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/diencephalon\/leftventraldc"
          }],
          "name": "Diencephalon",
          "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/diencephalon\/"
        }],
        "name": "Grey matter volume",
        "conceptPath": "\/root\/brain_anatomy\/grey_matter_volume\/"
      }, {
        "parent": "brain_anatomy",
        "code": "csf_volume",
        "comments": "Variables category",
        "csvFile": "custom_file",
        "children": [{
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "_3rdventricle",
          "csvFile": "custom_file",
          "name": "3rd Ventricle",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/csf_volume\/_3rdventricle"
        }, {
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "rightinflatvent",
          "csvFile": "custom_file",
          "name": "Right inferior lateral ventricle",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/csf_volume\/rightinflatvent"
        }, {
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "leftinflatvent",
          "csvFile": "custom_file",
          "name": "Left inferior lateral ventricle",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/csf_volume\/leftinflatvent"
        }, {
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "_4thventricle",
          "csvFile": "custom_file",
          "name": "4th Ventricle",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/csf_volume\/_4thventricle"
        }, {
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "rightlateralventricle",
          "csvFile": "custom_file",
          "name": "Right lateral ventricle",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/csf_volume\/rightlateralventricle"
        }, {
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "csfglobal",
          "csvFile": "custom_file",
          "name": "CSF global",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/csf_volume\/csfglobal"
        }, {
          "parent": "csf_volume",
          "unit": "cm3",
          "code": "leftlateralventricle",
          "csvFile": "custom_file",
          "name": "Left lateral ventricle",
          "type": "real",
          "conceptPath": "\/root\/brain_anatomy\/csf_volume\/leftlateralventricle"
        }],
        "name": "CSF volume",
        "conceptPath": "\/root\/brain_anatomy\/csf_volume\/"
      }, {
        "parent": "brain_anatomy",
        "unit": "cm3",
        "code": "tiv",
        "csvFile": "custom_file",
        "name": "TIV",
        "description": "Total intra-cranial volume",
        "type": "real",
        "conceptPath": "\/root\/brain_anatomy\/tiv"
      }, {
        "parent": "brain_anatomy",
        "unit": "cm3",
        "code": "brainstem",
        "csvFile": "custom_file",
        "name": "Brainstem",
        "description": "Brainstem volume",
        "type": "real",
        "conceptPath": "\/root\/brain_anatomy\/brainstem"
      }],
      "name": "Brain Anatomy",
      "conceptPath": "\/root\/brain_anatomy\/"
    }, {
      "parent": "root",
      "code": "proteome",
      "comments": "Variables category",
      "csvFile": "custom_file",
      "children": [{
        "parent": "proteome",
        "code": "csf_proteome",
        "comments": "Variables category",
        "csvFile": "custom_file",
        "children": [{
          "parent": "csf_proteome",
          "code": "t_tau",
          "csvFile": "custom_file",
          "name": "Total level of tau proteins in cerebrospinal fluid",
          "description": "Tau proteins (or \\u03c4 proteins) are proteins that stabilize microtubules. They are abundant in neurons of the central nervous system and are less common elsewhere, but are also expressed at very low levels in CNS astrocytes and oligodendrocytes. Pathologies and dementias of the nervous system such as Alzheimer''s disease and Parkinson''s disease are associated with tau proteins that have become defective and no longer stabilize microtubules properly.",
          "type": "real",
          "conceptPath": "\/root\/proteome\/csf_proteome\/t_tau"
        }, {
          "parent": "csf_proteome",
          "code": "ab1_42",
          "csvFile": "custom_file",
          "name": "Level of amyloid beta 1-42 peptides in cerebrospinal fluid",
          "description": "A\\u03b2 is the main component of amyloid plaques (extracellular deposits found in the brains of patients with Alzheimer''s disease). Similar plaques appear in some variants of Lewy body dementia and in inclusion body myositis (a muscle disease), while A\\u03b2 can also form the aggregates that coat cerebral blood vessels in cerebral amyloid angiopathy. The plaques are composed of a tangle of regularly ordered fibrillar aggregates called amyloid fibers, a protein fold shared by other peptides such as the prions associated with protein misfolding diseases.",
          "type": "real",
          "conceptPath": "\/root\/proteome\/csf_proteome\/ab1_42"
        }, {
          "parent": "csf_proteome",
          "code": "p_tau",
          "csvFile": "custom_file",
          "name": "Level of phosphorylated tau proteins in cerebrospinal fluid",
          "description": "Hyperphosphorylation of the tau protein (tau inclusions, pTau) can result in the self-assembly of tangles of paired helical filaments and straight filaments, which are involved in the pathogenesis of Alzheimer''s disease, frontotemporal dementia, and other tauopathies.",
          "type": "real",
          "conceptPath": "\/root\/proteome\/csf_proteome\/p_tau"
        }, {
          "parent": "csf_proteome",
          "code": "ab1_40",
          "csvFile": "custom_file",
          "name": "Level od amyloid beta 1-40 peptides ion cerebrospinal fluid",
          "description": "A\\u03b2 is the main component of amyloid plaques (extracellular deposits found in the brains of patients with Alzheimer''s disease). Similar plaques appear in some variants of Lewy body dementia and in inclusion body myositis (a muscle disease), while A\\u03b2 can also form the aggregates that coat cerebral blood vessels in cerebral amyloid angiopathy. The plaques are composed of a tangle of regularly ordered fibrillar aggregates called amyloid fibers, a protein fold shared by other peptides such as the prions associated with protein misfolding diseases.",
          "type": "real",
          "conceptPath": "\/root\/proteome\/csf_proteome\/ab1_40"
        }],
        "name": "Cerebrospinal fluid",
        "description": "Protein content of the cerebrospinal fluid",
        "conceptPath": "\/root\/proteome\/csf_proteome\/"
      }],
      "name": "Entire set of proteins expressed by the patient''s organism at the time of the medical workup",
      "description": "Protein biology as detected using routine lab chemistries in blood and cerebrospinal fluid specimens as well as in biopsy, measurement of protein-protein interactions, level of antibodies, auto-antibodies, etc.",
      "conceptPath": "\/root\/proteome\/"
    }, {
      "parent": "root",
      "code": "genetic",
      "comments": "Variables category",
      "csvFile": "custom_file",
      "children": [{
        "parent": "genetic",
        "code": "polymorphism",
        "comments": "Variables category",
        "csvFile": "custom_file",
        "children": [{
          "parent": "polymorphism",
          "code": "rs3818361_t",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3818361_T",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs3818361_t"
        }, {
          "parent": "polymorphism",
          "code": "rs1476679_c",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs1476679_C",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs1476679_c"
        }, {
          "parent": "polymorphism",
          "code": "rs610932_a",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs610932_A",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs610932_a"
        }, {
          "parent": "polymorphism",
          "code": "rs744373_c",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs744373_C",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs744373_c"
        }, {
          "parent": "polymorphism",
          "code": "rs11767557_c",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs11767557_C",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs11767557_c"
        }, {
          "parent": "polymorphism",
          "code": "apoe4",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "ApoE4",
          "description": "Apolipoprotein E (APOE) e4 allele: is the strongest risk factor for Late Onset Alzheimer Disease (LOAD). At least one copy of APOE-e4 ",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/apoe4"
        }, {
          "parent": "polymorphism",
          "code": "rs3865444_t",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3865444_T",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs3865444_t"
        }, {
          "parent": "polymorphism",
          "code": "rs3851179_a",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3851179_A",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs3851179_a"
        }, {
          "parent": "polymorphism",
          "code": "rs17125944_c",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs17125944_C",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs17125944_c"
        }, {
          "parent": "polymorphism",
          "code": "rs2718058_g",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs2718058_G",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs2718058_g"
        }, {
          "parent": "polymorphism",
          "code": "rs3764650_g",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs3764650_G",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs3764650_g"
        }, {
          "parent": "polymorphism",
          "code": "rs11136000_t",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs11136000_T",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs11136000_t"
        }, {
          "parent": "polymorphism",
          "code": "rs10498633_t",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs10498633_T",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs10498633_t"
        }, {
          "parent": "polymorphism",
          "code": "rs190982_g",
          "csvFile": "custom_file",
          "values": "0,1,2",
          "name": "rs190982_G",
          "type": "polynominal",
          "conceptPath": "\/root\/genetic\/polymorphism\/rs190982_g"
        }],
        "name": "polymorphism",
        "conceptPath": "\/root\/genetic\/polymorphism\/"
      }],
      "name": "Genetic",
      "conceptPath": "\/root\/genetic\/"
    }, {
      "parent": "root",
      "code": "demographics",
      "comments": "Variables category",
      "csvFile": "custom_file",
      "children": [{
        "parent": "demographics",
        "unit": "months",
        "code": "subjectage",
        "csvFile": "custom_file",
        "values": "0-11",
        "name": "SubjectAge",
        "description": "Exact age of the subject  for datasets that allow such precision.",
        "type": "real",
        "conceptPath": "\/root\/demographics\/subjectage"
      }, {
        "parent": "demographics",
        "unit": "years",
        "code": "subjectageyears",
        "csvFile": "custom_file",
        "values": "0-130",
        "name": "Age Years",
        "description": "Subject age in years.",
        "type": "integer",
        "conceptPath": "\/root\/demographics\/subjectageyears"
      }, {
        "parent": "demographics",
        "code": "handedness",
        "csvFile": "custom_file",
        "values": "{“R”,”Right”},{”L”,”Left”},{”A”,”Ambidextrous”}",
        "name": "Handedness",
        "description": "Describes the tendency of the patient to use either the right or the left hand more naturally than the other.",
        "type": "polynominal",
        "conceptPath": "\/root\/demographics\/handedness"
      }, {
        "parent": "demographics",
        "code": "gender",
        "csvFile": "custom_file",
        "values": "{“M”,”Male”},{”F”,”Female”}",
        "name": "Gender",
        "description": "Gender of the patient - Sex assigned at birth",
        "type": "binominal",
        "conceptPath": "\/root\/demographics\/gender"
      }, {
        "parent": "demographics",
        "code": "agegroup",
        "csvFile": "custom_file",
        "values": "{“-50y”,“-50y”},{”50-59y”,”50-59y”},{,”50-59y”},{”70-79y”,”70-79y”},{”+80y”,”+80y”}",
        "name": "agegroup",
        "type": "polynominal",
        "conceptPath": "\/root\/demographics\/agegroup"
      }],
      "name": "Demographics",
      "conceptPath": "\/root\/demographics\/"
    }, {
      "parent": "root",
      "code": "neuropsychology",
      "comments": "Variables category",
      "csvFile": "custom_file",
      "children": [{
        "parent": "neuropsychology",
        "code": "montrealcognitiveassessment",
        "csvFile": "custom_file",
        "values": "0-30",
        "name": "MoCA Total",
        "description": "The Montreal Cognitive Assessment (MoCA) was designed as a rapid screening instrument for mild cognitive dysfunction. It assesses different cognitive domains: attention and concentration  executive functions  memory  language  visuoconstructional skills  conceptual thinking  calculations  and orientation. MoCA Total Scores refer to the final count obtained by patients after the complete test is performed.",
        "type": "integer",
        "conceptPath": "\/root\/neuropsychology\/montrealcognitiveassessment"
      }, {
        "parent": "neuropsychology",
        "code": "minimentalstate",
        "csvFile": "custom_file",
        "values": "0-30",
        "name": "MMSE Total scores",
        "description": "The Mini Mental State Examination (MMSE) or Folstein test is a 30-point questionnaire that is used extensively in clinical and research settings to measure cognitive impairment. It is commonly used to screen for dementia.",
        "type": "integer",
        "conceptPath": "\/root\/neuropsychology\/minimentalstate"
      }, {
        "parent": "neuropsychology",
        "code": "updrs",
        "comments": "Variables category",
        "csvFile": "custom_file",
        "children": [{
          "parent": "updrs",
          "code": "updrstotal",
          "csvFile": "custom_file",
          "values": "0-172",
          "name": "UPDRS - Unified Parkinson Disease Rating Scale",
          "description": "The unified Parkinson s disease rating scale (UPDRS) is used to follow the longitudinal course of Parkinson s disease. The UPD rating scale is the most commonly used scale in the clinical study of Parkinson s disease.",
          "type": "integer",
          "conceptPath": "\/root\/neuropsychology\/updrs\/updrstotal"
        }, {
          "parent": "updrs",
          "code": "updrshy",
          "csvFile": "custom_file",
          "values": "0-5",
          "name": "UPDRS HY - Hoehn and Yahr scale",
          "description": "The Hoehn and Yahr scale (HY) is a widely used clinical rating scale  which defines broad categories of motor function in Parkinson\\u2019s disease (PD). It captures typical patterns of progressive motor impairment.",
          "type": "integer",
          "conceptPath": "\/root\/neuropsychology\/updrs\/updrshy"
        }],
        "name": "UPDRS",
        "conceptPath": "\/root\/neuropsychology\/updrs\/"
      }],
      "name": "Neuropsychology",
      "conceptPath": "\/root\/neuropsychology\/"
    }, {
      "parent": "root",
      "code": "pet",
      "comments": "Variables category",
      "csvFile": "custom_file",
      "children": [{
        "parent": "pet",
        "code": "pib",
        "csvFile": "custom_file",
        "name": "PIB",
        "description": "Average PIB SUVR of frontal cortex  anterior cingulate  precuneus cortex  and parietal cortex.",
        "type": "real",
        "conceptPath": "\/root\/pet\/pib"
      }, {
        "parent": "pet",
        "code": "av45",
        "csvFile": "custom_file",
        "name": "AV45",
        "description": "AV45 Average AV45 SUVR of frontal  anterior cingulate  precuneus  and parietal cortex\\nrelative to the cerebellum",
        "type": "real",
        "conceptPath": "\/root\/pet\/av45"
      }, {
        "parent": "pet",
        "code": "fdg",
        "csvFile": "custom_file",
        "name": "FDG-PET",
        "description": "Average FDG-PET of angular  temporal  and posterior cingulate. Most important hypometabolic regions that are indicative of pathological metabolic change in MCI and AD.",
        "type": "real",
        "conceptPath": "\/root\/pet\/fdg"
      }],
      "name": "PET - Positron Emission Tomography",
      "conceptPath": "\/root\/pet\/"
    }, {
      "parent": "root",
      "code": "diagnosis",
      "comments": "Variables category",
      "csvFile": "custom_file",
      "children": [{
        "parent": "diagnosis",
        "code": "neurogenerativescategories",
        "csvFile": "custom_file",
        "values": "{“PD”,”Parkinson’s disease”},{”AD”,”Alzheimer’s disease”},{”HD”,”Huntington’s disease\"”},{”ALS”,”Amyotrophic lateral sclerosis”},{”BD”,”Batten disease”},{”MCI”,”MCI”},{”LBD”,”Lewy body dementia”},{”CJD”,”Creutzfeldt Jakob disease”},{”FTD”,\"Frontotemporal dementia\"},{”MS”,”Multiple sclerosis”},{”CN”,”Cognitively normal”}",
        "name": "Neurodegeneratives categories",
        "description": "There will be two broad categories taken into account. Parkinson s disease without disability or light disability: Without fluctuation of the effect. Dementia in Parkinson s disease",
        "type": "polynominal",
        "conceptPath": "\/root\/diagnosis\/neurogenerativescategories"
      }, {
        "parent": "diagnosis",
        "code": "parkinsonbroadcategory",
        "csvFile": "custom_file",
        "values": "{“PD”,”Dementia in Parkinson''s disease”},{”CN”,”Healthy control”},{”Other”,”Parkinson''s disease without disability or light disability: Without fluctuation of the effect”}",
        "name": "Parkinson Broad Category",
        "description": "There will be two broad categories taken into account. Parkinson s disease without disability or light disability: Without fluctuation of the effect. Dementia in Parkinson s disease",
        "type": "polynominal",
        "conceptPath": "\/root\/diagnosis\/parkinsonbroadcategory"
      }, {
        "parent": "diagnosis",
        "code": "dataset_specific_diagnosis",
        "comments": "Variables category",
        "csvFile": "custom_file",
        "children": [{
          "parent": "dataset_specific_diagnosis",
          "code": "edsdcategory",
          "csvFile": "custom_file",
          "values": "{“AD”,”Alzheimer’s Disease”},{”MCI”,”Mild Cognitive Impairment”},{”CN”,”Cognitively Normal”}",
          "name": "EDSD category",
          "description": "Terms aggregating illnesses into classes. Note that the diagnosis in this categories are given only for the EDSD data set.",
          "type": "polynominal",
          "conceptPath": "\/root\/diagnosis\/dataset_specific_diagnosis\/edsdcategory"
        }, {
          "parent": "dataset_specific_diagnosis",
          "code": "adnicategory",
          "csvFile": "custom_file",
          "values": "{“AD”,”Alzheimer’s Disease”},{”MCI”,”Mild Cognitive Impairment”},{”CN”,”Cognitively Normal”}",
          "name": "ADNI category",
          "description": "Terms aggregating illnesses into classes. Note that the diagnosis in this categories are given only for the ADNI data set.",
          "type": "polynominal",
          "conceptPath": "\/root\/diagnosis\/dataset_specific_diagnosis\/adnicategory"
        }, {
          "parent": "dataset_specific_diagnosis",
          "code": "ppmicategory",
          "csvFile": "custom_file",
          "values": "{“PD”,”Parkinson disease”},{”HC”,”Healthy controls”},{”PRODROMA”,”Prodromal”},{”GENPD”,”Genetic PD patients with a mutation (LRRK2, GBA or SNCA)”},{”REGUN”,”Genetic Unaffected patients with a mutation (LRRK2, GBA or SNCA)”},{”REGPD”,”Genetic registry PD subjects with a mutation (LRRK2, GBA, or SNCA)”},{”REGUN”,”Genetic registry unaffected subjects with a mutation (LRRK2, GBA, or SNCA)”}",
          "name": "PPMI category",
          "description": "Terms aggregating the Parkinson s diseases into classes. For this instance the diagnosis given at enrollment is taken as the clinical diagnosis. Note that the diagnosis in this categories are given only for the PPMI data set.",
          "type": "polynominal",
          "conceptPath": "\/root\/diagnosis\/dataset_specific_diagnosis\/ppmicategory"
        }],
        "name": "Dataset Specific Diagnosis",
        "conceptPath": "\/root\/diagnosis\/dataset_specific_diagnosis\/"
      }, {
        "parent": "diagnosis",
        "code": "alzheimerbroadcategory",
        "csvFile": "custom_file",
        "values": "{“AD”,”Alzheimer’s disease”},{”CN”,”Cognitively Normal”},{”Other”,”Other”},{“MCI”,”Mild cognitive impairment”}",
        "name": "Alzheimer Broad Category",
        "description": "There will be two broad categories taken into account. Alzheimer s disease (AD) in which the diagnostic is 100% certain and <Other> comprising the rest of Alzheimer s related categories. The <Other> category refers to Alzheime s related diagnosis which origin can be traced to other pathology eg. vascular. In this category MCI diagnosis can also be found. In summary  all Alzheimer s related diagnosis that are not pure.",
        "type": "polynominal",
        "conceptPath": "\/root\/diagnosis\/alzheimerbroadcategory"
      }],
      "name": "Diagnosis",
      "conceptPath": "\/root\/diagnosis\/"
    }, {
      "parent": "root",
      "code": "dataset",
      "csvFile": "custom_file",
      "values": "{“edsd”,”EDSD”},{”adni”,”ADNI”},{”ppmi”,”PPMI”}",
      "name": "Dataset",
      "description": "Variable used to differentiate datasets",
      "type": "polynominal",
      "conceptPath": "\/root\/dataset"
    }]
  };


  nodes: Node[] = [];
  links: Link[] = [];
  constructor(private hospitalService: HospitalService) {



      const N = APP_CONFIG.N,
        getIndex = number => number - 1;

      /** constructing the nodes array */
      for (let i = 1; i <= N; i++) {
        this.nodes.push(new Node(i));
      }

      for (let i = 1; i <= N; i++) {
        for (let m = 2; i * m <= N; m++) {
          /** increasing connections toll on connecting nodes */
          this.nodes[getIndex(i)].linkCount++;
          this.nodes[getIndex(i * m)].linkCount++;

          /** connecting the nodes before starting the simulation */
          this.links.push(new Link(i, i * m));
        }
      }

  }

  ngOnInit() {
    this.hospitalService.getAllHospitalsAndVariables().subscribe(data => {this.hospitals = data;});
    this.hospitalService.getAllVersionsPerHospital().subscribe(allVersions => {this.allVersionsPerHospital = allVersions});


  }

  setHierarchical(){
    if(this.hierarchical == false){
      this.hierarchical = true;
    }else{
      this.hierarchical = false;
    }
  }

}
