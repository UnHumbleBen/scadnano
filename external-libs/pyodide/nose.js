var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="nose.data";var REMOTE_PACKAGE_BASE="nose.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","man",true,true);Module["FS_createPath"]("/man","man1",true,true);Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","nose",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/nose","plugins",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/nose","ext",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/nose","tools",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/nose","sphinx",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","nose-1.3.7-py3.7.egg-info",true,true);Module["FS_createPath"]("/","bin",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:297022,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1284,2682,4106,5394,6620,7836,8924,10256,11682,12785,13971,15142,16226,17535,18729,20016,21082,22125,23314,24507,25696,26907,27955,29079,30129,31337,32564,33579,34501,35635,36675,37718,38976,39955,41095,42117,43373,44284,45398,46567,47524,48641,49630,50850,52154,53299,54400,55673,56852,58027,59289,60299,61327,62338,63618,64750,65989,67044,68240,69767,71224,72418,73705,74842,75973,77176,78583,79957,81224,82083,83210,84203,85406,86641,87849,89100,90253,91467,92819,93879,95266,96625,97768,99129,100432,101744,102991,104264,105505,106659,108079,109318,110408,111766,113165,114109,115352,116802,118058,119299,120300,121321,122341,123598,124884,125837,126963,128348,129773,130905,132307,133637,134819,136115,137563,139033,140456,141605,142677,143801,144877,146074,147323,148327,149566,150812,152135,153314,154606,155498,156605,157811,158691,159871,160925,162217,163305,164306,165137,166510,167761,168712,169872,171064,172477,173771,174960,175875,176670,177653,178495,179530,180796,182020,183263,184368,185494,186794,188172,189405,190324,191751,193223,194551,195721,197055,198279,199353,200312,201587,202897,203999,205177,206344,207218,208270,209571,211063,212568,213884,214813,215846,216931,218077,219066,220034,220959,222069,223295,224519,225647,226678,227769,228801,230205,231705,232830,234098,235452,236831,238144,239381,240580,241862,243183,244471,245786,247017,248216,249539,250759,251907,252791,253909,255065,256066,257304,258463,259441,260734,261901,263018,264265,265540,266559,267731,269157,270507,271829,273199,274457,275457,276562,277869,279149,280418,281667,283105,284364,285579,287009,288018,289175,290642,291831,292505,293025,293573,294145,294690,295506,296267],sizes:[1284,1398,1424,1288,1226,1216,1088,1332,1426,1103,1186,1171,1084,1309,1194,1287,1066,1043,1189,1193,1189,1211,1048,1124,1050,1208,1227,1015,922,1134,1040,1043,1258,979,1140,1022,1256,911,1114,1169,957,1117,989,1220,1304,1145,1101,1273,1179,1175,1262,1010,1028,1011,1280,1132,1239,1055,1196,1527,1457,1194,1287,1137,1131,1203,1407,1374,1267,859,1127,993,1203,1235,1208,1251,1153,1214,1352,1060,1387,1359,1143,1361,1303,1312,1247,1273,1241,1154,1420,1239,1090,1358,1399,944,1243,1450,1256,1241,1001,1021,1020,1257,1286,953,1126,1385,1425,1132,1402,1330,1182,1296,1448,1470,1423,1149,1072,1124,1076,1197,1249,1004,1239,1246,1323,1179,1292,892,1107,1206,880,1180,1054,1292,1088,1001,831,1373,1251,951,1160,1192,1413,1294,1189,915,795,983,842,1035,1266,1224,1243,1105,1126,1300,1378,1233,919,1427,1472,1328,1170,1334,1224,1074,959,1275,1310,1102,1178,1167,874,1052,1301,1492,1505,1316,929,1033,1085,1146,989,968,925,1110,1226,1224,1128,1031,1091,1032,1404,1500,1125,1268,1354,1379,1313,1237,1199,1282,1321,1288,1315,1231,1199,1323,1220,1148,884,1118,1156,1001,1238,1159,978,1293,1167,1117,1247,1275,1019,1172,1426,1350,1322,1370,1258,1e3,1105,1307,1280,1269,1249,1438,1259,1215,1430,1009,1157,1467,1189,674,520,548,572,545,816,761,755],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_nose.data")}Module["addRunDependency"]("datafile_nose.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/man/man1/nosetests.1",start:0,end:17679,audio:0},{filename:"/lib/python3.7/site-packages/nose/case.py",start:17679,end:30860,audio:0},{filename:"/lib/python3.7/site-packages/nose/__main__.py",start:30860,end:31004,audio:0},{filename:"/lib/python3.7/site-packages/nose/selector.py",start:31004,end:39989,audio:0},{filename:"/lib/python3.7/site-packages/nose/loader.py",start:39989,end:65476,audio:0},{filename:"/lib/python3.7/site-packages/nose/config.py",start:65476,end:90758,audio:0},{filename:"/lib/python3.7/site-packages/nose/result.py",start:90758,end:97499,audio:0},{filename:"/lib/python3.7/site-packages/nose/suite.py",start:97499,end:119813,audio:0},{filename:"/lib/python3.7/site-packages/nose/usage.txt",start:119813,end:124238,audio:0},{filename:"/lib/python3.7/site-packages/nose/core.py",start:124238,end:137309,audio:0},{filename:"/lib/python3.7/site-packages/nose/exc.py",start:137309,end:137685,audio:0},{filename:"/lib/python3.7/site-packages/nose/proxy.py",start:137685,end:144564,audio:0},{filename:"/lib/python3.7/site-packages/nose/util.py",start:144564,end:164898,audio:0},{filename:"/lib/python3.7/site-packages/nose/twistedtools.py",start:164898,end:170438,audio:0},{filename:"/lib/python3.7/site-packages/nose/inspector.py",start:170438,end:177413,audio:0},{filename:"/lib/python3.7/site-packages/nose/pyversion.py",start:177413,end:184867,audio:0},{filename:"/lib/python3.7/site-packages/nose/__init__.py",start:184867,end:185271,audio:0},{filename:"/lib/python3.7/site-packages/nose/importer.py",start:185271,end:191249,audio:0},{filename:"/lib/python3.7/site-packages/nose/commands.py",start:191249,end:197565,audio:0},{filename:"/lib/python3.7/site-packages/nose/failure.py",start:197565,end:198838,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/xunit.py",start:198838,end:210483,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/capture.py",start:210483,end:213847,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/prof.py",start:213847,end:219204,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/failuredetail.py",start:219204,end:220839,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/allmodules.py",start:220839,end:222559,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/plugintest.py",start:222559,end:236092,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/doctests.py",start:236092,end:253570,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/collect.py",start:253570,end:256683,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/skip.py",start:256683,end:258825,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/base.py",start:258825,end:284883,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/logcapture.py",start:284883,end:294241,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/isolate.py",start:294241,end:297997,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/debug.py",start:297997,end:300269,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/cover.py",start:300269,end:311946,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/builtin.py",start:311946,end:312967,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/testid.py",start:312967,end:322884,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/errorclass.py",start:322884,end:330159,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/__init__.py",start:330159,end:336450,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/attrib.py",start:336450,end:346116,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/manager.py",start:346116,end:361693,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/multiprocess.py",start:361693,end:396979,audio:0},{filename:"/lib/python3.7/site-packages/nose/plugins/deprecated.py",start:396979,end:398530,audio:0},{filename:"/lib/python3.7/site-packages/nose/ext/dtcompat.py",start:398530,end:486637,audio:0},{filename:"/lib/python3.7/site-packages/nose/ext/__init__.py",start:486637,end:486670,audio:0},{filename:"/lib/python3.7/site-packages/nose/tools/nontrivial.py",start:486670,end:490840,audio:0},{filename:"/lib/python3.7/site-packages/nose/tools/trivial.py",start:490840,end:492024,audio:0},{filename:"/lib/python3.7/site-packages/nose/tools/__init__.py",start:492024,end:492460,audio:0},{filename:"/lib/python3.7/site-packages/nose/sphinx/pluginopts.py",start:492460,end:498098,audio:0},{filename:"/lib/python3.7/site-packages/nose/sphinx/__init__.py",start:498098,end:498103,audio:0},{filename:"/lib/python3.7/site-packages/nose-1.3.7-py3.7.egg-info/entry_points.txt",start:498103,end:498236,audio:0},{filename:"/lib/python3.7/site-packages/nose-1.3.7-py3.7.egg-info/PKG-INFO",start:498236,end:500211,audio:0},{filename:"/lib/python3.7/site-packages/nose-1.3.7-py3.7.egg-info/not-zip-safe",start:500211,end:500212,audio:0},{filename:"/lib/python3.7/site-packages/nose-1.3.7-py3.7.egg-info/SOURCES.txt",start:500212,end:517225,audio:0},{filename:"/lib/python3.7/site-packages/nose-1.3.7-py3.7.egg-info/dependency_links.txt",start:517225,end:517226,audio:0},{filename:"/lib/python3.7/site-packages/nose-1.3.7-py3.7.egg-info/top_level.txt",start:517226,end:517231,audio:0},{filename:"/bin/nosetests-3.7",start:517231,end:517656,audio:0},{filename:"/bin/nosetests",start:517656,end:518073,audio:0}],remote_package_size:301118,package_uuid:"ae22d460-3c1c-4a2f-afa5-c5c5250d9e2b"})})();