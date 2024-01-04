from manim import *
from numpy import *

class CircleExample(Scene):
    def construct(self):
        circle_1 = Circle(radius=1.0)
        circle_2 = Circle(radius=1.5, color=GREEN)
        circle_3 = Circle(radius=1.0, color=BLUE_B, fill_opacity=1)

        circle_group = Group(circle_1, circle_2, circle_3).arrange(buff=1)
        self.add(circle_group)


# NumberPlane is coordinate system
class CircleFromPointsExample(Scene):
    def construct(self):
        circle = Circle.from_three_points(LEFT, LEFT + UP, UP * 2, color=RED)
        dots = VGroup(
            Dot(LEFT),
            Dot(LEFT + UP),
            Dot(UP * 2),
        )
        self.add(NumberPlane(), circle, dots)


class CircleSurround(Scene):
    def construct(self):
        triangle1 = Triangle()
        circle1 = Circle().surround(triangle1)
        group1 = Group(triangle1,circle1) # treat the two mobjects as one

        line2 = Line()
        circle2 = Circle().surround(line2, buffer_factor=2.0)
        group2 = Group(line2,circle2)

        # buffer_factor < 1, so the circle is smaller than the square
        square3 = Square()
        circle3 = Circle().surround(square3, buffer_factor=0.5)
        group3 = Group(square3, circle3)

        group = Group(group1, group2, group3).arrange(buff=1)
        self.add(group)

class DifferentRotations(Scene):
    def construct(self):
        left_square = Square(color=BLUE, fill_opacity=0.7).shift(2 * LEFT)
        right_square = Square(color=GREEN, fill_opacity=0.7).shift(2 * RIGHT)
        self.play(
            left_square.animate.rotate(PI), Rotate(right_square, angle=PI, run_time=2)
        )
        self.wait()
        