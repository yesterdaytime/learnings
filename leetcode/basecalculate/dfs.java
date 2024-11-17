 public class Graph {   
    public ArrayList<String> vertexList;//存储顶点的集合
    public int[][] edges;    //存储图对应的邻接矩阵
    public int numOfEdges;    //表示边的数目
    public boolean[] isVisted;  //记录某个节点是否被访问
    //初始化
    public Graph(int n) {
        edges = new int[n][n];
        vertexList = new ArrayList<>(n);
        isVisted = new boolean[n];
    }
    //得到第一个邻接节点的下标w
    //如果存在就返回对应的下标,否则就返回-1
    public int getFirstNeighbor(int index) {
        for (int i = 0; i < getNumOfVertex(); i++) {
            if (edges[index][i] > 0) {
                return i;
            }
        }
        return -1;
    }
    //根据前一个邻接节点的下标来获取下一个邻接节点
    public int getNextNeighbor(int v1, int v2) {
        for (int i = v2 + 1; i < getNumOfVertex(); i++) {
            if (edges[v1][i] > 0) {
                return i;
            }
        }
        return -1;
    }
    //返回结点i对应的数据
    public String getValueByIndex(int i) {
        return vertexList.get(i);
    }
    //深度优先遍历算法
    //对dfs进行重载,遍历所有的结点,并进行dfs
    //避免不连通的情况出现
    public void dfs() {
        isVisted = new boolean[getNumOfVertex()];
        //遍历所有的结点
        for (int i = 0; i < getNumOfVertex(); i++) {
            if (!isVisted[i]) {
                dfs(i);
            }
        }
    }
    public void dfs(int i) {
        //首先访问此结点,输出
        System.out.print(getValueByIndex(i) + "-->");
        //将该结点设置成已经访问过
        isVisted[i] = true;
        //查找i结点的第一个邻接节点
        int w = getFirstNeighbor(i);
        while (w != -1) {//存在
            if (!isVisted[w]) {
                dfs(w);
            }
            //如果w结点已经被访问过了
            w = getNextNeighbor(i, w);
        }
    }
}