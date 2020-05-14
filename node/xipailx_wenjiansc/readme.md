# 数组乱序
洗牌算法
数组乱序也叫洗牌算法
抽奖，打乱顺序再抽
# 文件上传
经典的formidable

讲编码enctype ="multipart/form-data"
https://www.ietf.org/rfc/rfc1867 文件上传的multipart这个编码
表单的编码有几种

<!-- 文件上传的规则，用分隔符分开的 -->
  <FORM ACTION="http://server.dom/cgi/handle" 
  ENCTYPE="multipart/form-data" METHOD=POST>
    What is your name? <INPUT TYPE=TEXT NAME=submitter>
    What files are you sending? <INPUT TYPE=FILE NAME=pics>
  </FORM>
        The client might send back the following data:
        Content-type: multipart/form-data, boundary=AaB03x

        --AaB03x
        content-disposition: form-data; name="field1"

        Joe Blow
        --AaB03x
        content-disposition: form-data; name="pics"; filename="file1.txt"
        Content-Type: text/plain

         ... contents of file1.txt ...
        --AaB03x--
非Ascii码浏览器解析会为乱码
