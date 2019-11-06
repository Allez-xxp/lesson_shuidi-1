const fs=require('fs');
const image=fs.readFileSync('./chepai.jpg').toString("base64");
const AipOcrClient=require('baidu-aip-sdk').ocr;
const client=new AipOcrClient('17712427','4GnKAS3fS8tCPHSWURSbV7tQ','mnkKjogk6gYieWjo8jNco5ITc8pLB5Hm ');
const options={};
options["multi_detect"]="true";
client.licensePlate(image,options)//车牌号
.then(function(result){
    console.log(result);
})//本地到百度云端要花时间