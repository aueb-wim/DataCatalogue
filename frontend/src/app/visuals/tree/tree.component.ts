import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  ngOnInit() {
this.setData();
  }
  @Input('dataList') dataList;
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

  dataList2  = {
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

  setData() {
    //////////////////////////
    this.margin = { top: 20, right: 90, bottom: 30, left: 90 };
    this.width = 1200 - this.margin.left - this.margin.right;
    this.height = 1700 - this.margin.top - this.margin.bottom;

    this.svg = d3.select('tbody').append('svg')
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.duration = 750;

    // declares a tree layout and assigns the size
    this.tree = d3.tree()
      .size([this.height, this.width]);

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.dataList3, (d:any) => { return d["groups"]});/////changed from children to groups
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
      .on('click', this.click);

    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', (d) => {
        return d._children ? 'lightsteelblue' : '#f5e4ff';
      });

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
