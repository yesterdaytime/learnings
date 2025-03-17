#[derive(Clone)]
struct Circle {
    x: u32;
    y: u32;
    radius: u32;
}

fn CloneCircle () {
    let circle = Circle {
        x: 10, y: 10, radius: 10
    };

    let circle1 = circle.clone();

    
}