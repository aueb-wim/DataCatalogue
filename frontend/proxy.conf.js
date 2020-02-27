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
      "/hospitals/hosp",
      "/hospitals/name",
      "/mapping/functions/",
      "/mapping/randomFunction",
      "/mapping/functionsByVersionId",
      "/mapping/post",
      "/mapping/getallfiles",
      "/mapping/getsample",
      "/mapping/down",
      "/report/getBatchReport/",
      "/report/getVariableReport/",
      "/report/uploadAllReports",
      "/pathology/allPathologies",
      "/pathology/allPathologies//latest_cde_version",
      "/pathology/allPathologies/",
      "/pathology/allPathologies//name"
    ],
    target: "http://195.251.252.222:2447",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
