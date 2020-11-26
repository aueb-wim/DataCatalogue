 PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/user",
      "/logout",
      "/hospital/readExcel",
      "/CDE/readExcel",
      "/hospital/allVariables",
      "/hospital/allUniqueVariables",
      "/versions/allVersionsPerHospital",
      "/CDE/allCdeVersions",
      "/hospitals/hosp",
      "/hospitals/allWithUniqueVariables",
      "/hospitals/newHospital",
      "/hospitals/deleteHospital",
      "/versions/allVersionsPerHospital",
      "/versions/latestVersionIdByHospId",
      "/versions/getLatestVersionByHospitalId",
      "/versions/allVersions",
      "/versions/allVersions",
      "/versions/jsonStringByVersionId",
      "/versions/jsonStringVisualizableByVersionId",
      "/versions/newVersion",
      "versions/newVersionCde",
      "/versions/latestCDEVersion",
      "/versions/deleteVariableVersion",
      "/versions/deleteCDEVersion",
      "/hospitals/hosp",
      "/hospitals/name",
      "/mapping/functions/",
      "/mapping/randomFunction",
      "/mapping/functionsByVersionId",
      "/mapping/postCDE",
      "/mapping/postVariable",
      "/mapping/getallfiles",
      "/mapping/getsample",
      "/mapping/down",
      "/report/getBatchReport/",
      "/report/getVariableReport/",
      "/report/uploadAllReports",
      "/pathology/allPathologies",
      "/pathology/allPathologies//latest_cde_version",
      "/pathology/allPathologies/",
      "/pathology/allPathologies//name",
      "/pathology/newPathology",
      "/pathology/deletePathology"

    ],
    target: "http://192.168.1.8:8086",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
