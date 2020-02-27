package main //包
//安装node中的 node_mail go中是email（不是内置的，要另外安装）
import (
	"log"
	"net/smtp"

	"github.com/jordan-wright/email"
)

func main() { //入口函数
	e := email.NewEmail() // := 定义并且附值,NewEmail()方法会返回对象，由此生成email实例，NewEmail有一下能力：
	e.From = "huhuilin <1919412022@qq.com>"
	// [] ? Array? 多个用户发邮件 { }集合
	e.To = []string{"2879755027@qq.com", "1480500461@qq.com"}
	e.Subject = "你今天洗澡吗？"              //标题
	e.Text = []byte("洗不洗呢？洗不洗呢？洗不洗呢？") //内容，字节型的，用（）
	// smtpAuth是邮件代理，本地并没有搭建邮件服务器  由腾讯服务器转发，所以要拥有权限，域名：smtp.qq.com是

	// 链接  多行字符
	e.HTML = []byte(`
	<ul>
		<li><a href="https://juejin.im/post/5e575e02f265da573b0dad5f">掘金1</a></li>
		<li><a href="https://juejin.im/post/5e57048b6fb9a07cc845a9ef">掘金2</a></li>
	</ul>
	`)
	// 再发一个附件吧
	e.AttachFile("yb.jpeg") // 附件
	err := e.Send("smtp.qq.com:25", smtp.PlainAuth("", "1919412022@qq.com", "phwjtkxxtdatddgb", "smtp.qq.com"))
	//.Plain25是smtp服务器默认的端口号。
	// 通过账号和密码，登录到邮件服务器然后把邮件对象交给它发送出去。

	if err != nil {
		log.Fatal(err)
		// 要添加log模块
		// 想到于js的console.log()
		// console.error()
		//有错误就打印错误 而且信息的类型是Fatal致命的
	}

}
