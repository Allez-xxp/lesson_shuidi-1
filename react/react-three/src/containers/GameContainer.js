import React, { Component } from 'react'
import * as THREE from 'three' //引入three，作为组件来用
import React3 from 'react-three-renderer' //THREE.js的组件化//react的一个渲染器
// 会帮我们把三维世界中的很多抽象概念作为组件提供给我们//注意

// three.js 更简单
// GameContainer是个容器组件，用它来做3d的页面渲染
export default class GameContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.cameraPositon = new THREE.Vector3(0, 0, 5) //三维空间//作为一个实例挂载在这//把镜头放在一个矢量空间去
    // 是个3d的，添加了一个三维空间z轴，眼睛离屏幕有5倍的大小
    this.state = {//一般都会在constructor中声明全局状态
    }
  }
  render() {
    // 拿到画布整个的空间
    const width = window.innerWidth,
      height = window.innerHeight

    return (
      // 用React3做3d
      <React3
        mainCamera="camera" //相机
        width={width}
        height={height}> 
        {/* 场景 拍第几个景，第几幕 */}
        <scene>
          <perspectiveCamera 
              name="camera"
              fov={75}
              aspect={width/height}
              near={0.1}
              far={1000}
              position={this.cameraPositon}
            />
            {/* mesh 放到一起 */}
            <mesh>
              {/* 立方体 一个盒子 */}
              <boxGeometry
              width={1}
              height={1}
              depth={1}></boxGeometry>
              {/* 给立方体涂什么颜色，用什么材质 16进制的*/}
              <meshBasicMaterial color={0x00ff00} />
            </mesh>
        </scene>
      </React3>
    )
  }
}
