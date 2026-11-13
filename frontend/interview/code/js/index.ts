interface Product {
    name: string | number;
    price: number;
    productDate: Date;
    category?: string;
}

let product = {
    name: 'apple',
    price: 1.5,
    productDate: new Date(),
    category: 'fruit',
} as any satisfies Product;

console.log(typeof product);
