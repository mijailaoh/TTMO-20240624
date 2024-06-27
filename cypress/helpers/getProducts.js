// Function to select a random element from an array
const selectRandom = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

// Array of products
const products = [
    {
        id: 1,
        href: 'prod.html?idp_=1',
        category: 'Phones',
        title: 'Samsung galaxy s6',
        price: 360
    },
    {
        id: 2,
        href: 'prod.html?idp_=2',
        category: 'Phones',
        title: 'Nokia lumia 1520',
        price: 820
    },
    {
        id: 7,
        href: 'prod.html?idp_=7',
        category: 'Phones',
        title: 'HTC One M9',
        price: 700
    },
    {
        id: 9,
        href: 'prod.html?idp_=9',
        category: 'Laptops',
        title: 'Sony vaio i7',
        price: 790
    },
    {
        id: 15,
        href: 'prod.html?idp_=15',
        category: 'Laptops',
        title: 'MacBook Pro',
        price: 1100
    },
    {
        id: 12,
        href: 'prod.html?idp_=12',
        category: 'Laptops',
        title: 'Dell i7 8gb',
        price: 700
    },
    {
        id: 10,
        href: 'prod.html?idp_=10',
        category: 'Monitors',
        title: 'Apple monitor 24',
        price: 400
    },
    {
        id: 14,
        href: 'prod.html?idp_=14',
        category: 'Monitors',
        title: 'ASUS Full HD',
        price: 230
    }
];

// Function to get one random product from each category
export const getProducts = () => {
    const phones = products.filter(product => product.category === 'Phones');
    const laptops = products.filter(product => product.category === 'Laptops');
    const monitors = products.filter(product => product.category === 'Monitors');

    const selectedPhone = selectRandom(phones);
    const selectedLaptop = selectRandom(laptops);
    const selectedMonitor = selectRandom(monitors);

    let result = [selectedPhone, selectedLaptop, selectedMonitor];

    // Sort result by price in descending order
    result.sort((a, b) => b.price - a.price);

    return result;
};
