import turtle
import time
import random
delay = 0.1

# screen setup  
window = turtle.Screen()
window.title("Snake Game") 
window.bgcolor("blue")
window.setup(width=600, height=600)
window.tracer(0)

#Snake head (The turtle)
head = turtle.Turtle()
head.speed(0)
head.shape("square")
head.color("white")
head.penup()
head.goto(0,0)
head.direction = "stop"

#Snake food
food = turtle.Turtle()
food.speed(0)
food.shape("circle")
food.color("green")
food.penup()
food.goto(0,100)

segments = []

# Functions
def go_up():
    head.direction="up"
def go_down():
    head.direction="down"
def go_right():
    head.direction="right"
def go_left():
    head.direction="left"
def move():
    if head.direction == "up":
        y = head.ycor()
        head.sety(y + 20)
    if head.direction == "down":
        y = head.ycor()
        head.sety(y - 20)
    if head.direction == "right":
        x = head.xcor()
        head.setx(x + 20)
    if head.direction == "left":
        x = head.xcor()
        head.setx(x - 20)
#keyboard bindings
window.listen()
window.onkeypress(go_up, "w")
window.onkeypress(go_down, "s")
window.onkeypress(go_right, "d")
window.onkeypress(go_left, "a")
# Main game loop
while True:
    window.update()
    # check for collision with food
    if head.distance(food)<20:
        # Randomize foor position
        food.goto(random.randint(-290,290),random.randint(-290,290))

        # add a segment
        new_segment = turtle.Turtle()
        new_segment.speed(0)
        new_segment.shape("square")
        new_segment.color("grey")
        new_segment.penup()
        segments.append(new_segment)
    move()

    time.sleep(delay)


window.mainloop()