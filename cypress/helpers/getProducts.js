const selectRandom = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const products = [
    {
        category: 'Phones',
        title: 'Samsung galaxy s6',
        price: '$360'
    },
    {
        category: 'Phones',
        title: 'Nokia lumia 1520',
        price: '$820'
    },
    {
        category: 'Phones',
        title: 'HTC One M9',
        price: '$700'
    },
    {
        category: 'Laptops',
        title: 'MacBook Pro',
        price: '$1100'
    },
    {
        category: 'Laptops',
        title: 'Sony vaio i7',
        price: '$790'
    },
    {
        category: 'Laptops',
        title: '2017 Dell 15.6 Inch',
        price: '$700'
    },
    {
        category: 'Monitors',
        title: 'Apple monitor 24',
        price: '$400'
    },
    {
        category: 'Monitors',
        title: 'ASUS Full HD',
        price: '$230'
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

    return [selectedPhone, selectedLaptop, selectedMonitor];
};
