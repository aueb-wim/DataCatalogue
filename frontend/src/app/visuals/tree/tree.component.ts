import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import * as d3 from 'd3';
import {HospitalService} from "../../shared/hospital.service";
import {D3Service} from "../../d3";



@Component({
  selector: 'app-tree',
  template:`
    <svg #svg [attr.width]="this.width" [attr.height]="this.height">
      <g>
       
      </g>
    </svg>
  `,
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  constructor(){
    this.setData();
  }



  ngOnInit(){
  }

  @Input('dataList') dataList;///change to dataList
  margin: any;
  width: number;
  height: number;
  svg: any;
  duration: number;
  root: any;
  tree: any;
  treeData: any;
  nodes: any;
  links: any;

  dataList4  = {
      "name": "Top Level",
      "parent": "null",
      "children": [
        {
          "name": "Level 2: A",
          "parent": "Top Level",
          "children": [
            {
              "name": "Son of A",
              "parent": "Level 2: A"
            },
            {
              "name": "Daughter of A",
              "parent": "Level 2: A"
            }
          ]
        },
        {
          "name": "Level 2: B",
          "parent": "Top Level"
        }
      ]
    };
  dataList3 = {
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
        },
        {
          "code": "proteome",
          "description": "Protein biology as detected using routine lab chemistries in blood and cerebrospinal fluid specimens as well as in biopsy, measurement of protein-protein interactions, level of antibodies, auto-antibodies, etc.",
          "groups": [
            {
              "code": "csf_proteome",
              "description": "Protein content of the cerebrospinal fluid",
              "label": "Cerebrospinal fluid",
              "groups": [
                {
                  "code": "ab1_42",
                  "description": "A\u03b2 is the main component of amyloid plaques (extracellular deposits found in the brains of patients with Alzheimer''s disease). Similar plaques appear in some variants of Lewy body dementia and in inclusion body myositis (a muscle disease), while A\u03b2 can also form the aggregates that coat cerebral blood vessels in cerebral amyloid angiopathy. The plaques are composed of a tangle of regularly ordered fibrillar aggregates called amyloid fibers, a protein fold shared by other peptides such as the prions associated with protein misfolding diseases.",
                  "label": "Level of amyloid beta 1-42 peptides in cerebrospinal fluid",
                  "methodology": "mip-cde",
                  "type": "real",
                  "units": ""
                },
                {
                  "code": "ab1_40",
                  "description": "A\u03b2 is the main component of amyloid plaques (extracellular deposits found in the brains of patients with Alzheimer''s disease). Similar plaques appear in some variants of Lewy body dementia and in inclusion body myositis (a muscle disease), while A\u03b2 can also form the aggregates that coat cerebral blood vessels in cerebral amyloid angiopathy. The plaques are composed of a tangle of regularly ordered fibrillar aggregates called amyloid fibers, a protein fold shared by other peptides such as the prions associated with protein misfolding diseases.",
                  "label": "Level od amyloid beta 1-40 peptides ion cerebrospinal fluid",
                  "methodology": "mip-cde",
                  "type": "real",
                  "units": ""
                },
                {
                  "code": "t_tau",
                  "description": "Tau proteins (or \u03c4 proteins) are proteins that stabilize microtubules. They are abundant in neurons of the central nervous system and are less common elsewhere, but are also expressed at very low levels in CNS astrocytes and oligodendrocytes. Pathologies and dementias of the nervous system such as Alzheimer''s disease and Parkinson''s disease are associated with tau proteins that have become defective and no longer stabilize microtubules properly.",
                  "label": "Total level of tau proteins in cerebrospinal fluid",
                  "methodology": "mip-cde",
                  "type": "real",
                  "units": ""
                },
                {
                  "code": "p_tau",
                  "description": "Hyperphosphorylation of the tau protein (tau inclusions, pTau) can result in the self-assembly of tangles of paired helical filaments and straight filaments, which are involved in the pathogenesis of Alzheimer''s disease, frontotemporal dementia, and other tauopathies.",
                  "label": "Level of phosphorylated tau proteins in cerebrospinal fluid ",
                  "methodology": "mip-cde",
                  "type": "real",
                  "units": ""
                }
              ]
            }
          ],
          "label": "Entire set of proteins expressed by the patient''s organism at the time of the medical workup"
        },
        {
          "code": "brain_anatomy",
          "groups": [
            {
              "code": "csf_volume",
              "label": "CSF volume",
              "groups": [
                {
                  "code": "rightinflatvent",
                  "description": "",
                  "label": "Right inferior lateral ventricle",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "leftinflatvent",
                  "description": "",
                  "label": "Left inferior lateral ventricle",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "rightlateralventricle",
                  "description": "",
                  "label": "Right lateral ventricle",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "leftlateralventricle",
                  "description": "",
                  "label": "Left lateral ventricle",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "_3rdventricle",
                  "description": "",
                  "label": "3rd Ventricle",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "_4thventricle",
                  "description": "",
                  "label": "4th Ventricle",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "csfglobal",
                  "description": "",
                  "label": "CSF global",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                }
              ]
            },
            {
              "code": "white_matter_volume",
              "label": "White matter volume",
              "groups": [
                {
                  "code": "rightcerebellumwhitematter",
                  "description": "",
                  "label": "Right Cerebellum White Matter",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "leftcerebellumwhitematter",
                  "description": "",
                  "label": "Left Cerebellum White Matter",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "rightcerebralwhitematter",
                  "description": "",
                  "label": "Right Cerebral White Matter",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "leftcerebralwhitematter",
                  "description": "",
                  "label": "Left Cerebral White Matter",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                },
                {
                  "code": "opticchiasm",
                  "description": "",
                  "label": "Optic chiasm",
                  "methodology": "lren-nmm-volumes",
                  "type": "real",
                  "units": "cm3"
                }
              ]
            },
            {
              "code": "grey_matter_volume",
              "groups": [
                {
                  "code": "cerebellum",
                  "label": "Cerebellum",
                  "groups": [
                    {
                      "code": "cerebellarvermallobulesviiix",
                      "description": "",
                      "label": "Cerebellar Vermal Lobules VIII-X",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "cerebellarvermallobulesvivii",
                      "description": "",
                      "label": "Cerebellar Vermal Lobules VI-VII",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "cerebellarvermallobulesiv",
                      "description": "",
                      "label": "Cerebellar Vermal Lobules I-V",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftcerebellumexterior",
                      "description": "",
                      "label": "Left Cerebellum Exterior",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightcerebellumexterior",
                      "description": "",
                      "label": "Right Cerebellum Exterior",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                },
                {
                  "code": "cerebral_nuclei",
                  "groups": [
                    {
                      "code": "basal_ganglia",
                      "label": "Basal Ganglia",
                      "groups": [
                        {
                          "code": "rightbasalforebrain",
                          "description": "",
                          "label": "Right Basal Forebrain",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "leftbasalforebrain",
                          "description": "",
                          "label": "Left Basal Forebrain",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "rightaccumbensarea",
                          "description": "",
                          "label": "Right Accumbens Area",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "leftaccumbensarea",
                          "description": "",
                          "label": "Left Accumbens Area",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "rightcaudate",
                          "description": "",
                          "label": "Right Caudate",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "leftcaudate",
                          "description": "",
                          "label": "Left Caudate",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "rightpallidum",
                          "description": "",
                          "label": "Right Pallidum",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "leftpallidum",
                          "description": "",
                          "label": "Left Pallidum",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "rightputamen",
                          "description": "",
                          "label": "Right Putamen",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "leftputamen",
                          "description": "",
                          "label": "Left Putamen",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        }
                      ]
                    },
                    {
                      "code": "amygdala",
                      "label": "Amygdala",
                      "groups": [
                        {
                          "code": "rightamygdala",
                          "description": "",
                          "label": "Right Amygdala",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        },
                        {
                          "code": "leftamygdala",
                          "description": "",
                          "label": "Left Amygdala",
                          "methodology": "lren-nmm-volumes",
                          "type": "real",
                          "units": "cm3"
                        }
                      ]
                    }
                  ],
                  "label": "Cerebral nuclei"
                },
                {
                  "code": "limbic",
                  "label": "Limbic",
                  "groups": [
                    {
                      "code": "righthippocampus",
                      "description": "",
                      "label": "Right Hippocampus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "lefthippocampus",
                      "description": "",
                      "label": "Left Hippocampus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightthalamusproper",
                      "description": "",
                      "label": "Right Thalamus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftthalamusproper",
                      "description": "",
                      "label": "Left Thalamus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightacgganteriorcingulategyrus",
                      "description": "",
                      "label": "Right anterior cingulate gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftacgganteriorcingulategyrus",
                      "description": "",
                      "label": "Left anterior cingulate gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightententorhinalarea",
                      "description": "",
                      "label": "Right entorhinal area",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftententorhinalarea",
                      "description": "",
                      "label": "Left entorhinal area",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmcggmiddlecingulategyrus",
                      "description": "",
                      "label": "Right middle cingulate gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmcggmiddlecingulategyrus",
                      "description": "",
                      "label": "Left middle cingulate gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightpcggposteriorcingulategyrus",
                      "description": "",
                      "label": "Right posterior cingulate gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftpcggposteriorcingulategyrus",
                      "description": "",
                      "label": "Left posterior cingulate gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightphgparahippocampalgyrus",
                      "description": "",
                      "label": "Right parahippocampal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftphgparahippocampalgyrus",
                      "description": "",
                      "label": "Left parahippocampal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                },
                {
                  "code": "temporal",
                  "label": "Temporal",
                  "groups": [
                    {
                      "code": "rightfugfusiformgyrus",
                      "description": "",
                      "label": "Right fusiform gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftfugfusiformgyrus",
                      "description": "",
                      "label": "Left fusiform gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightitginferiortemporalgyrus",
                      "description": "",
                      "label": "Right inferior temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftitginferiortemporalgyrus",
                      "description": "",
                      "label": "Left inferior temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmtgmiddletemporalgyrus",
                      "description": "",
                      "label": "Right middle temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmtgmiddletemporalgyrus",
                      "description": "",
                      "label": "Left middle temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightppplanumpolare",
                      "description": "",
                      "label": "Right planum polare",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftppplanumpolare",
                      "description": "",
                      "label": "Left planum polare",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightptplanumtemporale",
                      "description": "",
                      "label": "Right planum temporale",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftptplanumtemporale",
                      "description": "",
                      "label": "Left planum temporale",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightstgsuperiortemporalgyrus",
                      "description": "",
                      "label": "Right superior temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftstgsuperiortemporalgyrus",
                      "description": "",
                      "label": "Left superior temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "righttmptemporalpole",
                      "description": "",
                      "label": "Right temporal pole",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "lefttmptemporalpole",
                      "description": "",
                      "label": "Left temporal pole",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightttgtransversetemporalgyrus",
                      "description": "",
                      "label": "Right transverse temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftttgtransversetemporalgyrus",
                      "description": "",
                      "label": "Left transverse temporal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                },
                {
                  "code": "occipital",
                  "label": "Occipital",
                  "groups": [
                    {
                      "code": "rightcalccalcarinecortex",
                      "description": "",
                      "label": "Right calcarine cortex",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftcalccalcarinecortex",
                      "description": "",
                      "label": "Left calcarine cortex",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightcuncuneus",
                      "description": "",
                      "label": "Right cuneus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftcuncuneus",
                      "description": "",
                      "label": "Left cuneus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightioginferioroccipitalgyrus",
                      "description": "",
                      "label": "Right inferior occipital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftioginferioroccipitalgyrus",
                      "description": "",
                      "label": "Left inferior occipital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightliglingualgyrus",
                      "description": "",
                      "label": "Right lingual gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftliglingualgyrus",
                      "description": "",
                      "label": "Left lingual gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmogmiddleoccipitalgyrus",
                      "description": "",
                      "label": "Right middle occipital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmogmiddleoccipitalgyrus",
                      "description": "",
                      "label": "Left middle occipital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightocpoccipitalpole",
                      "description": "",
                      "label": "Right occipital pole",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftocpoccipitalpole",
                      "description": "",
                      "label": "Left occipital pole",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightofugoccipitalfusiformgyrus",
                      "description": "",
                      "label": "Right occipital fusiform gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftofugoccipitalfusiformgyrus",
                      "description": "",
                      "label": "Left occipital fusiform gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightsogsuperioroccipitalgyrus",
                      "description": "",
                      "label": "Right superior occipital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftsogsuperioroccipitalgyrus",
                      "description": "",
                      "label": "Left superior occipital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                },
                {
                  "code": "parietal",
                  "label": "Parietal",
                  "groups": [
                    {
                      "code": "rightangangulargyrus",
                      "description": "",
                      "label": "Right angular gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftangangulargyrus",
                      "description": "",
                      "label": "Left angular gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmpogpostcentralgyrusmedialsegment",
                      "description": "",
                      "label": "Right postcentral gyrus medial segment",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmpogpostcentralgyrusmedialsegment",
                      "description": "",
                      "label": "Left postcentral gyrus medial segment",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightpcuprecuneus",
                      "description": "",
                      "label": "Right precuneus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftpcuprecuneus",
                      "description": "",
                      "label": "Left precuneus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightpogpostcentralgyrus",
                      "description": "",
                      "label": "Right postcentral gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftpogpostcentralgyrus",
                      "description": "",
                      "label": "Left postcentral gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightsmgsupramarginalgyrus",
                      "description": "",
                      "label": "Right supramarginal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftsmgsupramarginalgyrus",
                      "description": "",
                      "label": "Left supramarginal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightsplsuperiorparietallobule",
                      "description": "",
                      "label": "Right superior parietal lobule",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftsplsuperiorparietallobule",
                      "description": "",
                      "label": "Left superior parietal lobule",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                },
                {
                  "code": "frontal",
                  "label": "Frontal",
                  "groups": [
                    {
                      "code": "rightaorganteriororbitalgyrus",
                      "description": "",
                      "label": "Right anterior orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftaorganteriororbitalgyrus",
                      "description": "",
                      "label": "Left anterior orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightcocentraloperculum",
                      "description": "",
                      "label": "Right central operculum",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftcocentraloperculum",
                      "description": "",
                      "label": "Left central operculum",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightfofrontaloperculum",
                      "description": "",
                      "label": "Right frontal operculum",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftfofrontaloperculum",
                      "description": "",
                      "label": "Left frontal operculum",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightfrpfrontalpole",
                      "description": "",
                      "label": "Right frontal pole",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftfrpfrontalpole",
                      "description": "",
                      "label": "Left frontal pole",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightgregyrusrectus",
                      "description": "",
                      "label": "Right gyrus rectus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftgregyrusrectus",
                      "description": "",
                      "label": "Left gyrus rectus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightlorglateralorbitalgyrus",
                      "description": "",
                      "label": "Right lateral orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftlorglateralorbitalgyrus",
                      "description": "",
                      "label": "Left lateral orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmfcmedialfrontalcortex",
                      "description": "",
                      "label": "Right medial frontal cortex",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmfcmedialfrontalcortex",
                      "description": "",
                      "label": "Left medial frontal cortex",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmfgmiddlefrontalgyrus",
                      "description": "",
                      "label": "Right middle frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmfgmiddlefrontalgyrus",
                      "description": "",
                      "label": "Left middle frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmorgmedialorbitalgyrus",
                      "description": "",
                      "label": "Right medial orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmorgmedialorbitalgyrus",
                      "description": "",
                      "label": "Left medial orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmprgprecentralgyrusmedialsegment",
                      "description": "",
                      "label": "Right precentral gyrus medial segment",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmprgprecentralgyrusmedialsegment",
                      "description": "",
                      "label": "Left precentral gyrus medial segment",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightmsfgsuperiorfrontalgyrusmedialsegment",
                      "description": "",
                      "label": "Right superior frontal gyrus medial segment",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftmsfgsuperiorfrontalgyrusmedialsegment",
                      "description": "",
                      "label": "Left superior frontal gyrus medial segment",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightopifgopercularpartoftheinferiorfrontalgyrus",
                      "description": "",
                      "label": "Right opercular part of the inferior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftopifgopercularpartoftheinferiorfrontalgyrus",
                      "description": "",
                      "label": "Left opercular part of the inferior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightorifgorbitalpartoftheinferiorfrontalgyrus",
                      "description": "",
                      "label": "Right orbital part of the inferior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftorifgorbitalpartoftheinferiorfrontalgyrus",
                      "description": "",
                      "label": "Left orbital part of the inferior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightpoparietaloperculum",
                      "description": "",
                      "label": "Right parietal operculum",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftpoparietaloperculum",
                      "description": "",
                      "label": "Left parietal operculum",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightporgposteriororbitalgyrus",
                      "description": "",
                      "label": "Right posterior orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftporgposteriororbitalgyrus",
                      "description": "",
                      "label": "Left posterior orbital gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightprgprecentralgyrus",
                      "description": "",
                      "label": "Right precentral gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftprgprecentralgyrus",
                      "description": "",
                      "label": "Left precentral gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightscasubcallosalarea",
                      "description": "",
                      "label": "Right subcallosal area",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftscasubcallosalarea",
                      "description": "",
                      "label": "Left subcallosal area",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightsfgsuperiorfrontalgyrus",
                      "description": "",
                      "label": "Right superior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftsfgsuperiorfrontalgyrus",
                      "description": "",
                      "label": "Left superior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightsmcsupplementarymotorcortex",
                      "description": "",
                      "label": "Right supplementary motor cortex",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftsmcsupplementarymotorcortex",
                      "description": "",
                      "label": "Left supplementary motor cortex",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "righttrifgtriangularpartoftheinferiorfrontalgyrus",
                      "description": "",
                      "label": "Right triangular part of the inferior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "lefttrifgtriangularpartoftheinferiorfrontalgyrus",
                      "description": "",
                      "label": "Left triangular part of the inferior frontal gyrus",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                },
                {
                  "code": "insula",
                  "label": "Insula",
                  "groups": [
                    {
                      "code": "rightainsanteriorinsula",
                      "description": "",
                      "label": "Right anterior insula",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftainsanteriorinsula",
                      "description": "",
                      "label": "Left anterior insula",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "rightpinsposteriorinsula",
                      "description": "",
                      "label": "Right posterior insula",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftpinsposteriorinsula",
                      "description": "",
                      "label": "Left posterior insula",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                },
                {
                  "code": "diencephalon",
                  "label": "Diencephalon",
                  "groups": [
                    {
                      "code": "rightventraldc",
                      "description": "",
                      "label": "Right Ventral DC",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    },
                    {
                      "code": "leftventraldc",
                      "description": "",
                      "label": "Left Ventral DC",
                      "methodology": "lren-nmm-volumes",
                      "type": "real",
                      "units": "cm3"
                    }
                  ]
                }
              ],
              "label": "Grey matter volume"
            }
          ],
          "label": "Brain Anatomy",
          "variables": [
            {
              "code": "tiv",
              "description": "Total intra-cranial volume",
              "label": "TIV",
              "methodology": "lren-nmm-volumes",
              "type": "real",
              "units": "cm3"
            },
            {
              "code": "brainstem",
              "description": "Brainstem volume",
              "label": "Brainstem",
              "methodology": "lren-nmm-volumes",
              "type": "real",
              "units": "cm3"
            }
          ]
        },
        {
          "code": "demographics",
          "label": "Demographics",
          "variables": [
            {
              "code": "subjectageyears",
              "description": "Subject age in years.",
              "label": "Age Years",
              "length": 3,
              "maxValue": 130,
              "methodology": "mip-cde",
              "minValue": 0,
              "type": "integer",
              "units": "years"
            },
            {
              "code": "subjectage",
              "description": "Exact age of the subject, for datasets that allow such precision.",
              "label": "Exact age",
              "length": 2,
              "maxValue": 11,
              "methodology": "mip-cde",
              "minValue": 0,
              "type": "real",
              "units": "months"
            },
            {
              "code": "agegroup",
              "description": "Age Group",
              "enumerations": [
                {
                  "code": "-50y",
                  "label": "-50y"
                },
                {
                  "code": "50-59y",
                  "label": "50-59y"
                },
                {
                  "code": "60-69y",
                  "label": "60-69y"
                },
                {
                  "code": "70-79y",
                  "label": "70-79y"
                },
                {
                  "code": "+80y",
                  "label": "+80y"
                }
              ],
              "label": "Age Group",
              "methodology": "mip-cde",
              "type": "polynominal"
            },
            {
              "code": "gender",
              "description": "Gender of the patient - Sex assigned at birth",
              "enumerations": [
                {
                  "code": "M",
                  "label": "Male"
                },
                {
                  "code": "F",
                  "label": "Female"
                }
              ],
              "label": "Gender",
              "length": 1,
              "methodology": "mip-cde",
              "type": "binominal"
            },
            {
              "code": "handedness",
              "description": "Describes the tendency of the patient to use either the right or the left hand more naturally than the other.",
              "enumerations": [
                {
                  "code": "R",
                  "label": "Right"
                },
                {
                  "code": "L",
                  "label": "Left"
                },
                {
                  "code": "A",
                  "label": "Ambidextrous"
                }
              ],
              "label": "Handedness",
              "length": 1,
              "methodology": "mip-cde",
              "type": "polynominal"
            }
          ]
        },
        {
          "code": "neuropsychology",
          "groups": [
            {
              "code": "updrs",
              "label": "UPDRS",
              "groups": [
                {
                  "code": "updrstotal",
                  "description": "The unified Parkinson''s disease rating scale (UPDRS) is used to follow the longitudinal course of Parkinson''s disease. The UPD rating scale is the most commonly used scale in the clinical study of Parkinson''s disease.",
                  "label": "UPDRS - Unified Parkinson Disease Rating Scale",
                  "maxValue": 172,
                  "methodology": "mip-cde",
                  "minValue": 0,
                  "type": "integer"
                },
                {
                  "code": "updrshy",
                  "description": "The Hoehn and Yahr scale (HY) is a widely used clinical rating scale, which defines broad categories of motor function in Parkinson''s disease (PD). It captures typical patterns of progressive motor impairment.",
                  "label": "UPDRS HY - Hoehn and Yahr scale",
                  "maxValue": 5,
                  "methodology": "mip-cde",
                  "minValue": 0,
                  "type": "integer"
                }
              ]
            },


                {
                  "code": "minimentalstate",
                  "description": "The Mini-Mental State Examination (MMSE) or Folstein test is a 30-point questionnaire that is used extensively in clinical and research settings to measure cognitive impairment. It is commonly used to screen for dementia.",
                  "label": "MMSE - Mini Mental State Examination",
                  "maxValue": 30,
                  "methodology": "mip-cde",
                  "minValue": 0,
                  "type": "integer"
                },
                {
                  "code": "montrealcognitiveassessment",
                  "description": "The Montreal Cognitive Assessment (MoCA) was designed as a rapid screening instrument for mild cognitive dysfunction. It assesses different cognitive domains: attention and concentration, executive functions, memory, language, visuoconstructional skills, conceptual thinking, calculations, and orientation. MoCA Total Scores refer to the final count obtained by patients after the complete test is performed.",
                  "label": "MoCA - Montreal Cognitive Assessment",
                  "maxValue": 30,
                  "methodology": "mip-cde",
                  "minValue": 0,
                  "type": "integer"
                }


          ],
          "label": "Neuropsychology",

        },
        {
          "code": "diagnosis",
          "groups": [
            {
              "code": "dataset_specific_diagnosis",
              "label": "Dataset Specific Diagnosis",
              "variables": [
                {
                  "code": "adnicategory",
                  "description": "Terms aggregating illnesses into classes. Note that the diagnosis in this categories are given only for the ADNI data set.",
                  "enumerations": [
                    {
                      "code": "AD",
                      "label": "Alzheimer''s Disease"
                    },
                    {
                      "code": "MCI",
                      "label": "Mild Cognitive Impairment"
                    },
                    {
                      "code": "CN",
                      "label": "Cognitively Normal"
                    }
                  ],
                  "label": "ADNI category",
                  "methodology": "mip-cde",
                  "type": "polynominal"
                },
                {
                  "code": "edsdcategory",
                  "description": "Terms aggregating illnesses into classes. Note that the diagnosis in this categories are given only for the EDSD data set.",
                  "enumerations": [
                    {
                      "code": "AD",
                      "label": "Alzheimer''s Disease"
                    },
                    {
                      "code": "MCI",
                      "label": "Mild Cognitive Impairment"
                    },
                    {
                      "code": "CN",
                      "label": "Cognitively Normal"
                    }
                  ],
                  "label": "EDSD category",
                  "methodology": "mip-cde",
                  "type": "polynominal"
                },
                {
                  "code": "ppmicategory",
                  "description": "Terms aggregating the Parkinson''s diseases into classes. For this instance the diagnosis given at enrollment is taken as the clinical diagnosis. Note that the diagnosis in this categories are given only for the PPMI data set.",
                  "enumerations": [
                    {
                      "code": "PD",
                      "label": "Parkinson disease"
                    },
                    {
                      "code": "HC",
                      "label": "Healthy controls"
                    },
                    {
                      "code": "PRODROMA",
                      "label": "Prodromal"
                    },
                    {
                      "code": "GENPD",
                      "label": "Genetic PD patients with a mutation (LRRK2, GBA or SNCA)"
                    },
                    {
                      "code": "REGUN",
                      "label": "Genetic Unaffected patients with a mutation (LRRK2, GBA or SNCA)"
                    },
                    {
                      "code": "REGPD",
                      "label": "Genetic registry PD subjects with a mutation (LRRK2, GBA, or SNCA)"
                    },
                    {
                      "code": "REGUN",
                      "label": "Genetic registry unaffected subjects with a mutation (LRRK2, GBA, or SNCA)"
                    }
                  ],
                  "label": "PPMI category",
                  "methodology": "mip-cde",
                  "type": "polynominal"
                }
              ]
            }
          ],
          "label": "Diagnosis",
          "variables": [
            {
              "code": "alzheimerbroadcategory",
              "description": "There will be two broad categories taken into account. Alzheimer''s disease (AD) in which the diagnostic is 100% certain and \"Other\" comprising the rest of Alzheimer''s related categories. The \"Other\" category refers to Alzheimer''s related diagnosis which origin can be traced to other pathology eg. vascular. In this category MCI diagnosis can also be found. In summary, all Alzheimer''s related diagnosis that are not pure.",
              "enumerations": [
                {
                  "code": "AD",
                  "label": "Alzheimer''s disease"
                },
                {
                  "code": "CN",
                  "label": "Cognitively Normal"
                },
                {
                  "code": "Other",
                  "label": "Other"
                },
                {
                  "code": "MCI",
                  "label": "Mild cognitive impairment"
                }
              ],
              "label": "Alzheimer Broad Category",
              "methodology": "mip-cde",
              "type": "polynominal"
            },
            {
              "code": "parkinsonbroadcategory",
              "description": "There will be two broad categories taken into account. Parkinson''s disease without disability or light disability: Without fluctuation of the effect. Dementia in Parkinson''s disease",
              "enumerations": [
                {
                  "code": "PD",
                  "label": "Dementia in Parkinson''s disease"
                },
                {
                  "code": "CN",
                  "label": "Healthy control"
                },
                {
                  "code": "Other",
                  "label": "Parkinson''s disease without disability or light disability: Without fluctuation of the effect"
                }
              ],
              "label": "Parkinson Broad Category",
              "methodology": "mip-cde",
              "type": "polynominal"
            },
            {
              "code": "neurodegenerativescategories",
              "description": "There will be two broad categories taken into account. Parkinson''s disease without disability or light disability: Without fluctuation of the effect. Dementia in Parkinson''s disease",
              "enumerations": [
                {
                  "code": "PD",
                  "label": "Parkinson''s disease"
                },
                {
                  "code": "AD",
                  "label": "Alzheimer''s disease"
                },
                {
                  "code": "HD",
                  "label": "Huntington''s disease"
                },
                {
                  "code": "ALS",
                  "label": "Amyotrophic lateral sclerosis"
                },
                {
                  "code": "BD",
                  "label": "Batten disease"
                },
                {
                  "code": "MCI",
                  "label": "MCI"
                },
                {
                  "code": "LBD",
                  "label": "Lewy body dementia"
                },
                {
                  "code": "CJD",
                  "label": "Creutzfeldt\u2013Jakob disease"
                },
                {
                  "code": "FTD",
                  "label": "Frontotemporal dementia"
                },
                {
                  "code": "MS",
                  "label": "Multiple sclerosis"
                },
                {
                  "code": "CN",
                  "label": "Cognitively normal"
                }
              ],
              "label": "Neurodegeneratives categories",
              "methodology": "mip-cde",
              "type": "polynominal"
            }
          ]
        }
      ],
    };
  dataList2 = {
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

  setData() {
    this.margin = { top: 20, right: 90, bottom: 30, left: 90 };
    this.width = 1400 - this.margin.left - this.margin.right;
    this.height = 1800 - this.margin.top - this.margin.bottom;



    this.svg = d3.select('g').append('svg')///////////////////////////////////////////tbody
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.duration = 750;

    // declares a tree layout and assigns the size
    this.tree = d3.tree()
      .size([this.height, this.width]);

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.dataList, (d:any) => { return d["children"]});/////changed from children to groups
    this.root.x0 = this.height / 2;
    this.root.y0 = 10;

    // Collapse after the second level
     //this.root.children.forEach(collapse);

    this.updateChart(this.root);

     function collapse(d) {
       if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
          }

     }

  click = (d) => {
    console.log('click');
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateChart(d);
  };


  updateChart(source) {

    let i = 0;
    console.log(source);
    this.treeData = this.tree(this.root);
    this.nodes = this.treeData.descendants();
    this.links = this.treeData.descendants().slice(1);
    this.nodes.forEach((d) => { d.y = d.depth * 180 });

    let node = this.svg.selectAll('g.node')
      .data(this.nodes, (d) => { return d.id || (d.id = ++i); });


    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', this.click)

    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', (d) => {
        return d._children ? 'lightsteelblue' : '#f5e4ff';
      });

    // Define the div for the tooltip
    var div = d3.select("g").append("div")//////////////////////tbody
      .attr("class", "tooltip")
      .style("opacity", 0);

    nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', (d) => {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', (d) => {
        return d.children || d._children ? 'end' : 'start';
      })
      .style('font', '12px sans-serif')
      .text((d) => { return d.data.code; });//changed from 'd.data.name' to d.data.code



    nodeEnter
      .on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div	.html(d.data.description)
          .style("left", d3.select(this).attr("cx") + "px")
          .style("top", d3.select(this).attr("cy") + "px");
          //.style("left", (d3.event.pageX) + "px")
         // .style("top", (d3.event.pageY) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
/*
    nodeEnter.on("mouseover", function(d) {
      let g = d3.select(this); // The node
      // The class is used to remove the additional text later
      let info = g.append('text')
        .classed('info', true)
        .attr('x', 20)
        .attr('y', 10)
        .text(d.data.name);
    })
      .on("mouseout", function() {
        // Remove the info text on mouse out.
        d3.select(this).select('text.info').remove()
      });

*/
    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(this.duration)
      .attr('transform', (d) => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style('stroke-width', '3px')
      .style('stroke', 'steelblue')
      .style('fill', (d) => {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .attr('cursor', 'pointer');

    let nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr('transform', (d) => {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    let link = this.svg.selectAll('path.link')
      .data(this.links, (d) => { return d.id; });

    let linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px')
      .attr('d', function (d) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', (d) => { return diagonal(d, d.parent); });

    let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function (d) {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    this.nodes.forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    function diagonal(s, d) {
      let path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`;
      return path;
    }
  }


}
