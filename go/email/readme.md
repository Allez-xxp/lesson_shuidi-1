node email  node_mailer

mail  苹果 营销手段 
技术里， 高效的向用户发送邮件
from 
to 
万， 十万 百万， 千万怎么把邮件发送出去，这是个复杂的问题

 go get github.com/jordan-wright/email 安装email

 来到邮箱设置的账户，pop那里，，要拿到密码，就在POP3/SMTP密码服务，生成授权码。phwjtkxxtdatddgb

 要添加log模块
 const (
    Ldate         = 1 << iota     //日期示例： 2009/01/23
    Ltime                         //时间示例: 01:23:23
    Lmicroseconds                 //毫秒示例: 01:23:23.123123.
    Llongfile                     //绝对路径和行号: /a/b/c/d.go:23
    Lshortfile                    //文件和行号: d.go:23.
    LUTC                          //日期时间转为0时区的
    LstdFlags     = Ldate | Ltime //Go提供的标准抬头信息
)
log.Fatal(err) 致命的错误