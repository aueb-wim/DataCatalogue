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
      "/mapping/down",
      "/hospitals/hosp",
      "/hospitals/name",
      "/mapping/functions/",
      "/mapping/randomFunction",
      "/mapping/functionsByVersionId",
      "/versions/newVersion",
      "//mapping/post",
      "//mapping/getallfiles",
      "//mapping/getsample"
    ],
    target: "http://195.251.252.222:2443",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
