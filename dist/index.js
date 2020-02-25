module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t){e.exports=require("jsonpath-plus")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("errno")},function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const o=r(1),i={jsENOENT:r(2).code.ENOENT.code,jsonPathNotFound:"JsonPathNotFound",errorAndErrorsMutuallyExclusive:"ErrorErrorsMutuallyExclusive",validation:"Validation"};class s{static create(e){const t=e.code,r=e.message,n=e.path,a=e.cause,c=t||e.type||i.validation,l={message:r};return i.validation===c||i.errorAndErrorsMutuallyExclusive===c?o.merge(l,e):(n&&o.merge(l,{params:{path:n}}),a&&o.merge(l,a)),new s(c,l)}constructor(e,t={}){Object.assign(this,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({type:e},t))}}e.exports={ApplicationError:s,ErrorType:i}},function(e,t,r){const n=r(1),a=r(5),o=r(6),i=r(7),s=r(8),c=r(0).JSONPath,l=r(2).custom.createError,u=r(9),p=r(10),m=p.getValidatorFactory,f=p.compileValidate,d=r(16),h=r(3),x=h.ApplicationError,y=h.ErrorType,g=r(19).createValidationResponse,b=["yaml","yml"],O=l(y.jsonPathNotFound);function v(e){const t=d.getImplementation(e);e=t.prepare(e);let r=t.getJsonPathsToExamples().reduce((t,r)=>t.concat(function(e,t){return c({json:e,path:t,resultType:u.path})}(e,r)),[]);return function({impl:e},t,r){const n=j(),a={valid:!0,statistics:n,errors:[]},o=S(r);let i;try{i=e.buildValidationMap(t)}catch(e){if(!(e instanceof x))throw e;return a.valid=!1,a.errors.push(e),a}const s=Object.keys(i);return a.statistics.schemasWithExamples=s.length,s.forEach(e=>{!function({openapiSpec:e,createValidator:t,pathSchema:r,validationMap:n,statistics:a,validationResult:o}){const i=o.errors;n[r].forEach(n=>{const s=w(n,e),l=M(r,e,!0),u=T({createValidator:t,schema:l,example:s,statistics:a}).map(e=>(e.examplePath=c.toPointer(c.toPathArray(n)),e));u.length&&(o.valid=!1,i.splice(i.length-1,0,...u))})}({openapiSpec:r,createValidator:o,pathSchema:e,validationMap:i,statistics:n,validationResult:a})}),a}({impl:t},r,e)}function E(e){return function(e){const t=e.split(".").pop();return b.includes(t)}(e)?s.parse(a.readFileSync(e,"utf-8")):JSON.parse(a.readFileSync(e,"utf-8"))}function P(e,t){const r=j({schemaPaths:e}),n=t(r);return g({errors:n,statistics:r})}function j({schemaPaths:e=[]}={}){return{schemasWithExamples:e.length,examplesTotal:0,examplesWithoutSchema:0}}function w(e,t){return c({json:t,path:e,flatten:!0,wrap:!1,resultType:u.value})}function T({createValidator:e,schema:t,example:r,statistics:n,filePathExample:a}){const o=[];if(n.examplesTotal++,!t)return n.schemasWithExamples--,n.examplesWithoutSchema++,o;const i=f(e(),t);return i(r)?o:o.concat(...i.errors.map(x.create)).map(e=>a?(e.exampleFilePath=a,e):e)}function S(e){return m(e,{allErrors:!0,nullable:!0})}function M(e,t,r=!1){const n=w(e,t);if(!r&&!n)throw new O(`Path to schema can't be found: '${e}'`,{params:{path:e}});return n}e.exports={default:v,validateFile:function(e){let t=null;try{t=E(e)}catch(e){return g({errors:[x.create(e)]})}return v(t)},validateExample:function(e,t,r){let n=null,o=null,i=null;try{n=JSON.parse(a.readFileSync(r,"utf-8")),i=E(e),i=d.getImplementation(i).prepare(i),o=M(t,i)}catch(e){return g({errors:[x.create(e)]})}return P([t],e=>T({createValidator:S(i),schema:o,example:n,statistics:e,filePathExample:r}))},validateExamplesByMap:function(e,t,{cwdToMappingFile:r}={}){let s=0;const c=i.sync(t,{nonull:!0}).map(t=>{let i=null,c=null;try{i=JSON.parse(a.readFileSync(t,"utf-8")),c=E(e),c=d.getImplementation(c).prepare(c)}catch(e){return g({errors:[x.create(e)]})}return s++,P(Object.keys(i),e=>function(e,t,r,{cwdToMappingFile:i=!1,dirPathMapExternalExamples:s}){return n(t).entries().flatMap(([t,c])=>{let l=null;try{l=M(t,e)}catch(e){return x.create(e)}return n([c]).flatten().flatMap(t=>{let n=null;try{const e=i?o.join(s,t):t;n=JSON.parse(a.readFileSync(e,"utf-8"))}catch(e){return x.create(e)}return T({createValidator:S(e),schema:l,example:n,statistics:r,filePathExample:t})}).value()}).value()}(c,i,e,{cwdToMappingFile:r,dirPathMapExternalExamples:o.dirname(t)}).map(e=>Object.assign(e,{mapFilePath:t})))});return n.merge(c.reduce((e,t)=>{return e?(a=t,g({errors:(r=e).errors.concat(a.errors),statistics:n.entries(r.statistics).reduce((e,[t,r])=>(e[t]=r+a.statistics[t],e),j())})):t;var r,a},null),{statistics:{matchingFilePathsMapping:s}})}}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("glob")},function(e,t){e.exports=require("yaml")},function(e,t){e.exports={parent:"parent",parentProperty:"parentProperty",path:"path",pointer:"pointer",value:"value"}},function(e,t,r){const n=r(0).JSONPath,a=r(11),o=r(12),i=r(13),s="https://www.npmjs.com/package/openapi-examples-validator/defs.json";function c(e){n({path:"$..$ref",json:e,callback(e,t,r){e.startsWith("#")&&(r.parent[r.parentProperty]=`${s}${e}`)}})}e.exports={getValidatorFactory:function(e,t){const r=function(e){const t={$id:s};return n({path:"$..$ref",json:e,callback(r){if(!r.startsWith("#"))return;const n=r.substring(1),o=a.get(e,n);a.set(t,n,o)}}),t}(e);return()=>{const e=new o(t);return e.addSchema(r),function(e){e.addFormat("int32",{type:"number",validate:i.int32}),e.addFormat("int64",{type:"string",validate:i.int64}),e.addFormat("float",{type:"number",validate:i.float}),e.addFormat("double",{type:"number",validate:i.double}),e.addFormat("byte",{type:"string",validate:i.byte})}(e),e}},compileValidate:function(e,t){const r=function(e,t){const r=Object.assign({},e);return r.$id=t,r}(t,"https://www.npmjs.com/package/openapi-examples-validator/schema.json");return c(r),e.compile(r)}}},function(e,t){e.exports=require("json-pointer")},function(e,t){e.exports=require("ajv")},function(e,t,r){const n=r(14);e.exports={int32:function(e){return Number.isInteger(+e)&&n.int32.max.greaterThanOrEqualTo(e)&&n.int32.min.lessThanOrEqualTo(e)},int64:function(e){return Number.isInteger(+e)&&n.int64.max.greaterThanOrEqualTo(e)&&n.int64.min.lessThanOrEqualTo(e)},float:function(e){return n.float.max.greaterThanOrEqualTo(e)&&n.float.min.lessThanOrEqualTo(e)},double:function(e){return n.double.max.greaterThanOrEqualTo(e)&&n.double.min.lessThanOrEqualTo(e)},byte:function(e){const t=e.length;if(!t||t%4!=0||/[^A-Z0-9+\/=]/i.test(e))return!1;const r=e.indexOf("=");return-1===r||r===t-1||r===t-2&&"="===e[t-1]}}},function(e,t,r){const n=r(15),a={byte:{min:new n("-128"),max:new n("127")},int32:{min:new n("-2147483648"),max:new n("2147483647")},int64:{min:new n("-9223372036854775808"),max:new n("9223372036854775807")},float:{min:new n(2).pow(128).negated(),max:new n(2).pow(128)},double:{min:new n(2).pow(1024).negated(),max:new n(2).pow(1024)}};e.exports=a},function(e,t){e.exports=require("decimal.js")},function(e,t,r){const n=r(17),a=r(18),o=/^3\./;e.exports={getImplementation:function(e){if("string"==typeof e.swagger)return n;if(e.openapi&&e.openapi.match(o))return a;return null}}},function(e,t,r){const n=r(0).JSONPath;e.exports={buildValidationMap:function(e){return e.reduce((e,t)=>{const r=function(e){const t=n.toPathArray(e).slice(),r=t.lastIndexOf("examples");return t.splice(r,t.length-r,"schema"),n.toPathString(t)}(t);return e[r]=(e[r]||new Set).add(t),e},{})},getJsonPathsToExamples:function(){return["$..examples.application/json"]},prepare:function(e){return e}}},function(e,t,r){const n=r(0).JSONPath,a=r(3),o=a.ApplicationError,i=a.ErrorType,s="single",c="multi";e.exports={buildValidationMap:function(e){const t=new Map;return e.reduce((e,r)=>{const a=function(e){const t=n.toPathArray(e).slice(),r=t.lastIndexOf("example"),a=r>-1?s:c,o=a===s?r:t.lastIndexOf("examples");return t.splice(o,t.length-o,"schema"),{exampleType:a,pathSchemaAsArray:t}}(r),l=a.pathSchemaAsArray,u=a.exampleType,p=n.toPathString(l),m=t.get(p);return m&&m!==u&&function(e){const t=e.slice(0,e.length-1);throw o.create({type:i.errorAndErrorsMutuallyExclusive,message:'Properties "error" and "errors" are mutually exclusive',params:{pathContext:n.toPointer(t)}})}(l),t.set(p,u),e[p]=(e[p]||new Set).add(r),e},{})},getJsonPathsToExamples:function(){return["$..responses..content.application/json.example","$..responses..content.application/json.examples..value","$..parameters..example","$..parameters..examples..value","$..requestBody.content.application/json.example","$..requestBody.content.application/json.examples..value"]},prepare:function(e){return e}}},function(e,t){e.exports={createValidationResponse:function({errors:e,statistics:t={}}){return{valid:!e.length,statistics:t,errors:e}}}}]);
//# sourceMappingURL=index.js.map