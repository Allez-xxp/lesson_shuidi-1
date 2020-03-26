// Go 定义tree
//树的遍历
// 树(tree)由结点(treeNode)构成，树用递归的概念来定义的

package main

import "fmt"

//声明树节点，用递归，退出条件就是到叶子节点，有了三个就能递归生成树了
// type 关键字与struct的组合，后面不需要,逗号
type Node struct {
	value int   //节点中的数值
	left  *Node //左侧的指针,指针声明用*
	right *Node
}

//方法，找到结点 指针 因为形成了一个树，所以查找的时间开销从O(N) -> O(logN)每次大概减少一半时间
//用递归寻找
func (node *Node) FindNode(n *Node, x int) *Node { //返回结点
	// 在一棵树中找节点这件大事，分成很多的小事情，在每3个结点里
	if n == nil { //第一次找根节点
		return nil
	} else if n.value == x { //退出条件
		return n
	} else { //递归，找左子树
		p := node.FindNode(n.left, x) //递归 沿着左子树一直走
		if p != nil {                 //找到了
			return p
		}
		return node.FindNode(n.right, x) //再走向右子树
	}
}

// 找树的深度
func (node *Node) GetTreeHeight(n *Node) int {
	//满二叉树 完全二叉树
	if n == nil {
		return 0
	} else {
		//当前结点的高度？就是 Math.max（左子树的高度 + 1或者右子树高度+1）
		lHeight := node.GetTreeHeight(n.left)
		rHeight := node.GetTreeHeight(n.right)
		if lHeight > rHeight {
			return lHeight + 1
		} else {
			return rHeight + 1
		}
	}
}

//获得叶子节点，叶子不止一个，在的地方也不一样
// 当前结点的叶子节点，就是左右节点为空时，每个节点都去判断左右节点
//退出条件，到叶子了就退出
func (node *Node) GetLeafNode(n *Node) {
	if n != nil {
		if n.left == nil && n.right == nil {
			fmt.Printf("%d", n.value)
		}
		node.GetLeafNode(n.left)
		node.GetLeafNode(n.right)
	}
}

//先序遍历
func (node *Node) GetRootErgodic(n *Node) {
	if n == nil {
		return
	} else {
		fmt.Printf("%d", n.value)
		node.GetRootErgodic(n.left)
		node.GetRootErgodic(n.right)
	}
}

//中序遍历
func (node *Node) GetLeftErgodic(n *Node) {
	if n == nil {
		return
	} else {
		node.GetLeftErgodic(n.left)
		fmt.Printf("%d", n.value)
		node.GetLeftErgodic(n.right)
	}
}

//后序遍历
func (node *Node) GetRightErgodic(n *Node) {
	if n == nil {
		return
	} else {
		node.GetRightErgodic(n.left)
		node.GetRightErgodic(n.right)
		fmt.Printf("%d", n.value)
	}
}

//方法，用来创建节点，未来这个节点还能挂到其他节点上去(*Node)
func CreateNode(value int) *Node { //返回一个新的节点，返回的类型是*，指针
	//按结构体的声明顺序传值
	return &Node{value, nil, nil} //左右指针为空 要返回的是一个指针，加一个&，用它取地址，就可以指向
	// 结果是指针，就能指向地址，就能链向
}

func main() {
	root := CreateNode(5)     //root根节点。CreateNode方法怎么定义？这是个不同方法，不是隶属于树的
	root.left = CreateNode(2) //为什么返回的结果是*Node,CreateNode生成的结点可以作为其他节点的左子树
	root.right = CreateNode(4)
	root.left.right = CreateNode(7)
	root.left.right.left = CreateNode(6)
	root.right.left = CreateNode(8)
	root.right.right = CreateNode(9)

	fmt.Printf("%d\n", root.FindNode(root, 4).value) //找有没有值是4的结点
	fmt.Printf("%d\n", root.GetTreeHeight(root))     //得到树的高度
	root.GetLeafNode(root)                           //得到所有的叶子节点
	fmt.Println("\n先序遍历：")
	root.GetRootErgodic(root)
	fmt.Println("\n中序遍历：")
	root.GetLeftErgodic(root)
	fmt.Println("\n后序遍历：")
	root.GetRightErgodic(root)

	//用数组方式看的话，存储的顺序是什么？
	//不是一棵完全二叉树
	// 	5
	// 2		4
	// 	7	8	9
	// 6
}
