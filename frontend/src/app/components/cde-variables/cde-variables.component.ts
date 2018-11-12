import { Component, OnInit } from '@angular/core';
import {HospitalService} from "../../shared/hospital.service";

@Component({
  selector: 'app-cde-variables',
  templateUrl: './cde-variables.component.html',
  styleUrls: ['./cde-variables.component.css']
})

export class CdeVariablesComponent implements OnInit {
data =
  {
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
  allCdeVersions: Array<any>;
  searchTermVar: String;
  searchTermVer: String;
  hierarchical = false;
  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.hospitalService.getAllCdeVersions().subscribe(allVersions => {this.allCdeVersions = allVersions});
  }

  setHierarchical(){
    if(this.hierarchical == false){
      this.hierarchical = true;
    }else{
      this.hierarchical = false;
    }
  }

}
