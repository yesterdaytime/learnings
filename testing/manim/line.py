from manim import *

class Coordinate(Scene):
    def construct(self):
        self.add(NumberPlane())


class Line(Scene):
    def construct(self):
        a1 = Dot(0, 0)
        a2 = Dot(LEFT * 2, UP * 3)
        l = Line(a1, a2)
        self.add(l)


# alpha * 2PI = TangentPoint included angle
class TangentLineExample(Scene):
    def construct(self):
        circle = Circle(radius=2)
        line_1 = TangentLine(circle, alpha=0.0, length=4, color=BLUE_D) # right
        line_2 = TangentLine(circle, alpha=0.4, length=4, color=GREEN) # top left
        self.add(circle, line_1, line_2)