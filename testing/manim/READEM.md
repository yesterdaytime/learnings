1. Geometry
        TipableVMobject
        Arc
        ArcBetweenPoints
        CurvedArrow
        CurvedDoubleArrow
        Circle
        Dot
        SmallDot
        Ellipse
        AnnularSector
        Sector
        Annulus
        Line
        DashedLine
        TangentLine
        Elbow
        Arrow
        FillArrow
        Vector
        CubicBezier
        Polygon
        Polyline
        RegularPolygon
        Triangle
        ArrowTip
        Rectangle
        Square
        RoundedRectangle
2. Position
    ORIGIN = np.array((0., 0., 0.))
    UP = np.array((0., 1., 0.))
    DOWN = np.array((0., -1., 0.))
    RIGHT = np.array((1., 0., 0.))
    LEFT = np.array((-1., 0., 0.))
    IN = np.array((0., 0., -1.))
    OUT = np.array((0., 0., 1.))
    X_AXIS = np.array((1., 0., 0.))
    Y_AXIS = np.array((0., 1., 0.))
    Z_AXIS = np.array((0., 0., 1.))

    Object.shift(UP|DOWN|RIGHT|LEFT)

    Group.arrange(UP|DOWN|RIGHT|LEFT, buff=1)
3. Change
    Transform
    TransformMatchingTex
    ...

4. Image or Video
    Image: add
    Video: play