import React, { Component } from 'react'
import * as THREE from 'three' //引入three，作为组件来用
import React3 from 'react-three-renderer' //THREE.js的组件化//react的一个渲染器
// 会帮我们把三维世界中的很多抽象概念作为组件提供给我们//注意

// three.js 更简单
// GameContainer是个容器组件，用它来做3d的页面渲染
export default class GameContainer extends Component {
  constructor(props, context) {
    super(props, context)
    // 相机往哪走，比如(1,0,5),会往左移 ； (0,0,1)会在眼前，因为盒子就是1，1，1大小 然后眼睛离盒子又是1 所以会很近
    // 第三个越大越远 就是相机往后移（最中心到右边的距离）
    this.cameraPositon = new THREE.Vector3(0, 0, 5) //三维空间//作为一个实例挂载在这//把镜头放在一个矢量空间去
    // 是个3d的，添加了一个三维空间z轴，眼睛离屏幕有5倍的大小
    this.state = {//一般都会在constructor中声明全局状态
      // 表示运动，几何体通过这个完成x y z轴旋转
      cubeRotation: new THREE.Euler() //可以MVVM
    }
    // 表示他要运动了
    this._onAnimate = () => {
      this.setState({
        cubeRotation: new THREE.Euler( //Euler会围绕x y z轴简单运动的
          this.state.cubeRotation.x + 0.1, //上一次的x加0.1
          this.state.cubeRotation.y + 0.1,
        )
      })
    }
  }
  render() {
    // 拿到画布整个的空间
    const width = window.innerWidth,
      height = window.innerHeight

    return (
      // 用React3做3d
      // 3d渲染组件
      // 绘制的场景
      <React3
      // 摄像头仿照拍摄的过程来写的，相机
        mainCamera="camera" //相机//添加一个主摄像头
        // 相机拍摄的范围，画布的宽高
        width={width}
        height={height}
        onAnimate={this._onAnimate}> 
        {/* 不停的刷新，onAnimate */}
        {/* 场景 拍第几个景，第几幕 */}
        <scene>
          {/* 相机，透视的，对着材质拍，然后我们就能看到场景中的东西 */}
          <perspectiveCamera 
              name="camera" //主相机
              fov={75} //拍摄角度75度
              aspect={width/height} //拍摄比例 横拿，竖着拿是h/w
              near={0.1} //近景
              far={1000} //远景
              position={this.cameraPositon} //摄像头放在3d的那个适量位置上
            />
            {/* mesh 皮肤纹理 放到一起 合并起来就能把颜色 和盒子组在一起 */}
            <mesh
              rotation={this.state.cubeRotation}>
              {/* 放一个立方体 一个盒子 不管是什么，都是由一个形状构成的 */}
              <boxGeometry
              width={1}
              height={1}
              depth={1}></boxGeometry>
              {/*  给立方体外面涂什么颜色，用什么材质 16进制的 红色的*/}
              {/* <meshBasicMaterial color={0x00ff00} /> */}
              <meshBasicMaterial color={0xffff00} />
            </mesh>
        </scene>
      </React3>
    )
  }
}
