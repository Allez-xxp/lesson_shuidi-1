# 数组乱序
洗牌算法
数组乱序也叫洗牌算法
抽奖，打乱顺序再抽
# 文件上传
经典的formidable

讲编码enctype ="multipart/form-data"
https://www.ietf.org/rfc/rfc1867 文件上传的multipart这个编码
表单的编码有几种
1. application/x-www-form-urlencoded
这个编码不好，这个默认的编码，当点击提交的时候，浏览器会使用这个编码，对于发送大量的二进制数据，或者是文本(包含非ASCII码文本（那128个字符)的编码值)，是无效的。低效的。

2. multipart/form-data
相反。适合用来处理二进制数据，或者包含非ASCII码的数据。

每个编码有各自的规则，就像application json就是以json的方式传输，像form-urlencoded，以urlencoded编码的方式来传输，multipart/form-data是以什么编码来传输？
用content-type标明这次内容的类型是multipart/form-data，然后还有一个boundary边界，这个就是一个分隔符，我的整个内容都以分隔符隔开了，这个就是编码的一个规则。解析也是按照这个格式解析，内容是在分隔符中间

记住，一定！！
<!-- 文件上传的规则，用分隔符分开的 -->
  <FORM ACTION="http://server.dom/cgi/handle" 
  ENCTYPE="multipart/form-data" METHOD=POST>
    What is your name? <INPUT TYPE=TEXT NAME=submitter>
    What files are you sending? <INPUT TYPE=FILE NAME=pics>
  </FORM>
  <!-- 只要使用http,他就是这样传输的 -->
        The client might send back the following data:
        <!-- 1. -->
        Content-type: multipart/form-data, boundary=AaB03x 
        <!-- 2. -->
        --AaB03x
        <!-- 第一个input -->
        content-disposition: form-data; name="field1"

        Joe Blow
        --AaB03x
        <!-- 第二个input -->
        content-disposition: form-data; name="pics"; filename="file1.txt"
        Content-Type: text/plain

         ... contents of file1.txt ...
        --AaB03x--
非Ascii码浏览器解析会为乱码
