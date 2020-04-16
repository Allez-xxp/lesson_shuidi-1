import './styles/main.css';  //依赖关系 打包的过程
import './styles/main.styl';
// 字体
import './styles/font.css';
console.log('aaa')
// 字体
let $body = document.querySelector('body')
$body.append(document.createElement('br'))
let $fontTitle = document.createElement('h1')
$fontTitle.innerHTML = 'linan'
$body.append($fontTitle)

let $fontWrapper = document.createElement('div')

// let $font = document.createElement('i')
// $font.className = 'iconfont'
// $font.innerHTML = '&#xe609;'

// $fontWrapper.append($font)
$body.append($fontWrapper)