# Product Management System

This project allows you to manage and categorize products using a `products.json` file. The products are automatically grouped into their respective categories, and each product contains detailed information such as its description, image, and category.

## Features

- **Product Addition**: Easily add new products by appending to the `products.json` file.
- **Category Management**: Automatically sort products into categories based on the `category` field in the JSON.
- **Dynamic Product Display**: Products belonging to a specific category will be displayed under that category.
- **Product Details**: Each product includes essential details such as `id`, `name`, `description`, and `image`.

## JSON File (`products.json`)

The products are stored in a JSON file with the following structure:

```json
[
    {
        "id": 1,
        "name": "HYDRAULIC OIL CLEANING MACHINE",
        "description": "Designed to remove particulate contamination, water, and other impurities from hydraulic oil, this machine ensures smooth operation of hydraulic systems, extending the life of machinery and minimizing breakdowns. <ul><li><strong>Extended Oil Life:</strong> By removing contaminants, hydraulic oil can be reused, reducing the frequency of oil replacement.</li><li><strong>Reduced Maintenance Costs:</strong> Clean oil prevents wear and tear on hydraulic components like pumps, cylinders, and valves, thereby reducing maintenance costs.</li><li><strong>Minimized Downtime:</strong> Contamination-related breakdowns are significantly reduced, leading to uninterrupted production.</li><li><strong>Environmental Benefits:</strong> Reducing the disposal of used oil helps lower waste and supports eco-friendly operations.</li><li><strong>Improved System Efficiency:</strong> Cleaner oil ensures better performance, reducing energy consumption and improving overall system efficiency.</li><li><strong>Cost Savings:</strong> Reducing the need for fresh hydraulic oil cuts down on procurement and disposal costs.</li><li><strong>Increased Equipment Lifespan:</strong> Proper lubrication with clean oil increases the lifespan of hydraulic systems and critical components.</li></ul>",
        "image": "./assets/img/products/hydraulic_oil_cleaning_machine.jpg",
        "category": "Special Purpose"
    }
]
