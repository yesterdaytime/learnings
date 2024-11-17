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
     public void bfs(int i) {
        int u;    //表示队列头结点对应的下标
        int w;    //邻接节点w
        //队列,记录结点访问的顺序
        LinkedList<Integer> queue = new LinkedList<>();
        System.out.print(getValueByIndex(i) + "-->");
        //标记为已访问
        isVisted[i] = true;
        queue.offer(i);
        while (!queue.isEmpty()) {
            //取出队列的头结点下标
            u = queue.poll();
            w = getFirstNeighbor(u);
            while (w != -1) {//找到存在的
                //是否访问过
                if (!isVisted[w]) {
                    System.out.print(getValueByIndex(w) + "-->");
                    //标记访问过
                    isVisted[w] = true;
                    queue.add(w);
                }
                //以u为前驱节点找w后面的下一个邻接点
                w = getNextNeighbor(u, w);//体现出广度优先
            }
        }
    }
}